# Dream Weaver Tales

AI-powered bedtime stories, personalized for your child.

## Features

- **AI Story Generation**: Creates unique, personalized bedtime stories
- **Voice Selection**: Multiple voice options for story narration
- **Sleep Timer**: Automatic story fade-out for peaceful sleep
- **Parental Controls**: Safe, age-appropriate content management
- **Base Mini App**: Integrated with Farcaster frames and Base blockchain
- **Theme Support**: Multiple visual themes including CELO, Solana, Base, and Coinbase

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Theme Support

The app supports multiple themes via URL parameter:
- Default: `http://localhost:3000` (magical bedtime theme)
- CELO: `http://localhost:3000?theme=celo`
- Solana: `http://localhost:3000?theme=solana`
- Base: `http://localhost:3000?theme=base`
- Coinbase: `http://localhost:3000?theme=coinbase`

Visit `/theme-preview` to see all themes in action.

## Architecture

- **Next.js 15** with App Router
- **React 19** for OnchainKit compatibility
- **OnchainKit** for Base blockchain integration
- **Tailwind CSS** with custom design system
- **TypeScript** for type safety
- **Farcaster Frames** integration

## API Integration

The app is designed to integrate with:
- OpenAI GPT-4 for story generation
- Text-to-Speech APIs for audio narration
- Base blockchain for potential token features
- Farcaster for social sharing

## Components

- `AppBar`: Navigation header with theme support
- `StoryCard`: Display generated stories
- `GenerateButton`: Main story generation trigger
- `VoiceSelector`: Choose narration voice
- `SleepTimer`: Auto-stop functionality
- `ParentalGate`: Age verification for settings
- `ThemeProvider`: Dynamic theme switching

## Development

Built with modern React patterns:
- Functional components with hooks
- TypeScript interfaces for type safety
- Responsive mobile-first design
- Accessible UI components
- Error boundaries and loading states

## Deployment

Ready for deployment on Vercel, Netlify, or any Next.js-compatible platform.
