# Yanshuf.ai

I built this back when OpenAI assistants were in beta and GPT-3 was still the big thing. Basically, you upload a PDF and then chat with an AI assistant about it. Pretty straightforward.

## What it does

Upload PDFs, create AI assistants, and ask them questions about your documents. You can have multiple conversations going, switch between different assistants, and all that jazz. There's also a subscription system with Stripe because why not.

## Tech Stack

Built with Next.js 14, TypeScript, and Prisma. Uses OpenAI's API for the AI stuff, NextAuth for Google login, and UploadThing for file uploads. tRPC handles the API layer, Tailwind for styling. Testing with Jest and Playwright.

## Getting Started

You'll need Node.js 18+, Yarn, and a database (I use PostgreSQL).

```bash
git clone https://github.com/yourusername/yanshuf-ai.git
cd yanshuf-ai
yarn install
npx prisma generate
npx prisma db push
```

## Environment Variables

Create a `.env` file with these:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

OPENAI_API_KEY=

DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

VERCEL_URL=
PORT=3000

USER_COOKIE=
```

## Running it

```bash
yarn dev
```

Goes to `http://localhost:3000`

For production:
```bash
yarn build
yarn start
```

## Testing

```bash
yarn test           # unit tests
yarn test:e2e       # e2e tests
yarn test:e2e:ui    # e2e with UI
```

## How to use

Sign in with Google, create an assistant, upload a PDF, and start asking questions. That's it.
