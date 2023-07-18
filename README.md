# Text-GPT-AIGC

A text to content generative editor powered by GPT-3.5 ✨
1. takes plain text prompts 📝
2. makes an OpenAI GPT-3.5 call 🤖
3. converts them into text/image content 🌸


### Under the hood

A Next.js full-stack app (React, Next API routes).

Node module(s):
- react-codemirror
- cors
  
### Getting Started

To get started, clone the repository and install the necessary node modules.

`npm install`


### Environment Variables

Make a copy of the `.env.example` file, rename it as `.env`. Enter your OpenAI API key. Specific instructions 5 & 6 [here](https://github.com/openai/openai-quickstart-node).


The app also includes a `NEXT_PUBLIC_REMOTE_API_URL` and `WHITELISTED_DOMAINS`, in case we want to fetch from another server.

### Development, Build, Deploy

Next.js defaults. See `package.json` for commands.
Both dev and production are on port 3000.

To build project, run: 

`npx next build`

For dev mode, run:

`npx next dev`

To build browser extension, run:

`npm run build:extension`
`npm run dev:extension`


## Acknowledgments 🙏

- [openai/openai-quickstart-node](https://github.com/openai/openai-quickstart-node)
- [vercel/next.js/.../cors](https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts)
