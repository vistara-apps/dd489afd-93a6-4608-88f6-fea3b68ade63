# Dream Weaver Tales

AI-powered bedtime stories, personalized for your child. A Base Mini App that generates custom audio stories using OpenAI's GPT-4 and TTS APIs.

## Features

- **AI Story Generation**: Create unique, personalized bedtime stories
- **Audio Playback**: High-quality text-to-speech with multiple voice options
- **Personalization**: Customize characters, themes, age groups, and moral lessons
- **Parental Controls**: Age-appropriate content filtering and usage monitoring
- **Subscription Tiers**: Free, Basic ($5/month), and Premium ($10/month) plans
- **Farcaster Integration**: Share stories and access via Farcaster frames
- **Base Mini App**: Native blockchain integration with Coinbase's OnchainKit

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4, OpenAI TTS
- **Database**: Upstash Redis
- **Blockchain**: Base (OP Stack), Coinbase OnchainKit
- **Social**: Farcaster Mini App SDK
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here

# Base Configuration
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org

# Farcaster Configuration
FARCASTER_APP_FID=your_farcaster_app_fid_here

# App URL (for production)
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Upstash Redis

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token to your `.env.local`

### 4. Set up OpenAI API

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key
3. Add it to your `.env.local`

### 5. Configure Farcaster

1. Register your app with Farcaster
2. Get your app FID
3. Add it to your `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

### 7. Deploy to Production

Deploy to Vercel or your preferred hosting platform. Make sure to set the environment variables in your deployment environment.

## API Documentation

### Story Generation

**POST** `/api/generate-story`

Request body:
```json
{
  "characterName": "Luna",
  "theme": "space",
  "ageGroup": "preschool",
  "moralLesson": "be kind",
  "customElements": "include a friendly dragon"
}
```

Response:
```json
{
  "title": "Luna's Star Adventure",
  "text": "Once upon a time...",
  "duration": "4:32"
}
```

### Audio Generation

**POST** `/api/generate-audio`

Request body:
```json
{
  "text": "Story text here...",
  "voice": "alloy"
}
```

Response:
```json
{
  "audioUrl": "data:audio/mp3;base64,..."
}
```

### Farcaster Frame

**GET/POST** `/api/frame`

Handles Farcaster frame interactions for story generation within the Farcaster ecosystem.

## Database Schema

### User
```typescript
{
  userId: string;
  farcasterId: string;
  subscriptionTier: 'free' | 'basic' | 'premium';
  createdAt: string;
  lastLogin: string;
}
```

### Story
```typescript
{
  storyId: string;
  userId: string;
  title: string;
  prompt: string;
  generatedText: string;
  audioUrl: string;
  duration: string;
  createdAt: string;
  isFavorite: boolean;
  ageGroup: string;
  theme: string;
}
```

### Customization
```typescript
{
  customizationId: string;
  userId: string;
  characterName: string;
  theme: string;
  ageGroup: string;
  voicePreference: string;
  createdAt: string;
}
```

## Subscription Plans

### Free Tier
- 5 stories per month
- Basic voices only
- Standard themes

### Basic Tier ($5/month)
- Unlimited stories
- Premium voices
- All themes
- Save favorites

### Premium Tier ($10/month)
- Everything in Basic
- Advanced customization
- Priority support
- Custom voice training
- Analytics dashboard
- API access

## Development Guidelines

### Code Quality
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write comprehensive error handling
- Add helpful comments for complex logic

### UI/UX Design
- Follow the established design system
- Ensure responsive design across devices
- Maintain accessibility standards
- Test on various screen sizes

### Security
- Validate all user inputs
- Implement proper authentication
- Use environment variables for secrets
- Follow OWASP security guidelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.

