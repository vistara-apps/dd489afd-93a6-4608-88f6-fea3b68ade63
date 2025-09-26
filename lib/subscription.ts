import { updateUser, getUserSubscriptionTier, canGenerateStory, incrementStoryUsage } from './database';

export interface SubscriptionPlan {
  id: 'free' | 'basic' | 'premium';
  name: string;
  price: number;
  features: string[];
  limits: {
    storiesPerMonth: number;
    premiumVoices: boolean;
    advancedFeatures: boolean;
  };
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '5 stories per month',
      'Basic voices',
      'Standard themes',
      'Community support'
    ],
    limits: {
      storiesPerMonth: 5,
      premiumVoices: false,
      advancedFeatures: false,
    },
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    features: [
      'Unlimited stories',
      'Premium voices',
      'All themes',
      'Email support',
      'Save favorites'
    ],
    limits: {
      storiesPerMonth: -1, // unlimited
      premiumVoices: true,
      advancedFeatures: false,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 10,
    features: [
      'Everything in Basic',
      'Advanced customization',
      'Priority support',
      'Custom voice training',
      'Analytics dashboard',
      'API access'
    ],
    limits: {
      storiesPerMonth: -1, // unlimited
      premiumVoices: true,
      advancedFeatures: true,
    },
  },
];

export async function upgradeSubscription(userId: string, newTier: 'basic' | 'premium'): Promise<void> {
  // In a real app, this would integrate with a payment processor
  // For now, we'll just update the user's tier
  await updateUser(userId, { subscriptionTier: newTier });
}

export async function checkSubscriptionLimits(userId: string): Promise<{
  canGenerate: boolean;
  currentUsage: number;
  limit: number;
  tier: string;
}> {
  const tier = await getUserSubscriptionTier(userId);
  const canGenerate = await canGenerateStory(userId);

  // Get current usage for free tier
  let currentUsage = 0;
  let limit = SUBSCRIPTION_PLANS.find(p => p.id === tier)?.limits.storiesPerMonth || 5;

  if (tier === 'free') {
    const currentMonth = new Date().toISOString().slice(0, 7);
    // This would need to be implemented in database.ts
    // For now, return mock data
    currentUsage = 0;
  }

  return {
    canGenerate,
    currentUsage,
    limit: limit === -1 ? Infinity : limit,
    tier,
  };
}

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

export function getAvailableUpgrades(currentTier: string): SubscriptionPlan[] {
  const currentIndex = SUBSCRIPTION_PLANS.findIndex(plan => plan.id === currentTier);
  return SUBSCRIPTION_PLANS.slice(currentIndex + 1);
}

