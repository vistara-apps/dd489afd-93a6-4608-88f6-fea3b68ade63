import redis from './redis';
import { User, Story, Customization } from './types';

const USER_PREFIX = 'user:';
const STORY_PREFIX = 'story:';
const CUSTOMIZATION_PREFIX = 'customization:';

// User functions
export async function getUser(userId: string): Promise<User | null> {
  const user = await redis.get(`${USER_PREFIX}${userId}`);
  return user as User | null;
}

export async function createUser(user: User): Promise<void> {
  await redis.set(`${USER_PREFIX}${user.userId}`, user);
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  const existingUser = await getUser(userId);
  if (!existingUser) {
    throw new Error('User not found');
  }

  const updatedUser = { ...existingUser, ...updates };
  await redis.set(`${USER_PREFIX}${userId}`, updatedUser);
}

// Story functions
export async function createStory(story: Story): Promise<void> {
  await redis.set(`${STORY_PREFIX}${story.storyId}`, story);

  // Add to user's story list
  const userStoriesKey = `user:${story.userId}:stories`;
  await redis.lpush(userStoriesKey, story.storyId);
}

export async function getStory(storyId: string): Promise<Story | null> {
  const story = await redis.get(`${STORY_PREFIX}${storyId}`);
  return story as Story | null;
}

export async function getUserStories(userId: string, limit: number = 10): Promise<Story[]> {
  const userStoriesKey = `user:${userId}:stories`;
  const storyIds = await redis.lrange(userStoriesKey, 0, limit - 1);

  const stories: Story[] = [];
  for (const storyId of storyIds) {
    const story = await getStory(storyId);
    if (story) {
      stories.push(story);
    }
  }

  return stories;
}

export async function updateStory(storyId: string, updates: Partial<Story>): Promise<void> {
  const existingStory = await getStory(storyId);
  if (!existingStory) {
    throw new Error('Story not found');
  }

  const updatedStory = { ...existingStory, ...updates };
  await redis.set(`${STORY_PREFIX}${storyId}`, updatedStory);
}

// Customization functions
export async function createCustomization(customization: Customization): Promise<void> {
  await redis.set(`${CUSTOMIZATION_PREFIX}${customization.customizationId}`, customization);

  // Add to user's customization list
  const userCustomizationsKey = `user:${customization.userId}:customizations`;
  await redis.lpush(userCustomizationsKey, customization.customizationId);
}

export async function getCustomization(customizationId: string): Promise<Customization | null> {
  const customization = await redis.get(`${CUSTOMIZATION_PREFIX}${customizationId}`);
  return customization as Customization | null;
}

export async function getUserCustomizations(userId: string, limit: number = 5): Promise<Customization[]> {
  const userCustomizationsKey = `user:${userId}:customizations`;
  const customizationIds = await redis.lrange(userCustomizationsKey, 0, limit - 1);

  const customizations: Customization[] = [];
  for (const customizationId of customizationIds) {
    const customization = await getCustomization(customizationId);
    if (customization) {
      customizations.push(customization);
    }
  }

  return customizations;
}

// Subscription functions
export async function getUserSubscriptionTier(userId: string): Promise<'free' | 'basic' | 'premium'> {
  const user = await getUser(userId);
  return user?.subscriptionTier || 'free';
}

export async function canGenerateStory(userId: string): Promise<boolean> {
  const tier = await getUserSubscriptionTier(userId);

  if (tier === 'premium') return true;
  if (tier === 'basic') return true;

  // For free tier, check monthly limit
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const usageKey = `usage:${userId}:${currentMonth}`;
  const currentUsage = await redis.get(usageKey) as number || 0;

  return currentUsage < 5; // 5 stories per month for free tier
}

export async function incrementStoryUsage(userId: string): Promise<void> {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const usageKey = `usage:${userId}:${currentMonth}`;

  await redis.incr(usageKey);
  // Set expiry for next month
  await redis.expire(usageKey, 60 * 60 * 24 * 31); // 31 days
}

