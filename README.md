# Nova Bot

A modular Discord bot starter built with Node.js, Discord.js v14 and SQLite.

## Requirements
- Node.js 22 or newer
- A Discord application and bot created in the Discord Developer Portal
- A test Discord server where you have permission to add the bot

## Setup
1. Download/clone this repository.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`.
4. Fill in `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, and `OWNER_ID`.
5. Register slash commands: `npm run deploy`
6. Start the bot: `npm start`

## Mobile workflow
You can create/edit the repository from GitHub in your mobile browser, upload these project files, then use a Node.js hosting provider's web dashboard to install dependencies and run `npm start`.

## Included commands
- `/ping`
- `/help`
- `/botinfo`
- `/serverinfo`
- `/userinfo`

## Security
- Never share your bot token or commit `.env`.
- Keep privileged intents disabled unless a later feature genuinely requires them.
- Moderation commands should be added with permission checks and audit logging.
- Use a private test server before inviting the bot elsewhere.

## Project structure
See the `src/` directory. Commands are separated by category and loaded automatically.
