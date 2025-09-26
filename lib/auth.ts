import { MiniApp } from '@farcaster/miniapp-sdk';
import { User } from './types';
import { getUser, createUser, updateUser } from './database';

let miniApp: MiniApp | null = null;

export async function initializeFarcaster(): Promise<MiniApp> {
  if (miniApp) return miniApp;

  miniApp = new MiniApp({
    appId: process.env.FARCASTER_APP_FID || 'dream-weaver-tales',
  });

  await miniApp.init();
  return miniApp;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const miniAppInstance = await initializeFarcaster();
    const user = await miniAppInstance.getUser();

    if (!user) return null;

    // Check if user exists in our database
    let dbUser = await getUser(user.fid.toString());

    if (!dbUser) {
      // Create new user
      dbUser = {
        userId: user.fid.toString(),
        farcasterId: user.fid.toString(),
        subscriptionTier: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await createUser(dbUser);
    } else {
      // Update last login
      await updateUser(user.fid.toString(), {
        lastLogin: new Date().toISOString(),
      });
    }

    return dbUser;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function canAccessPremiumFeature(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  return user?.subscriptionTier === 'premium' || user?.subscriptionTier === 'basic';
}

export async function canAccessBasicFeature(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  return user?.subscriptionTier !== 'free';
}
