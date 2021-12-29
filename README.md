# simple-discord-bot

A simple Discord bot with some useful features.

## Setup

Make sure that Node.js is installed on your system.

1. Run `npm install` to download the dependencies.
2. Create and adjust the `.env` file in the root directory. You can find more information in the next section.
3. Register commands:
    - `npm run register-commands` to register global commands
    - `npm run register-commands-dev` to register guild commands
4. Start the client:
    - `npm run start` (`pm2` required) to start the client in a production environment
    - `npm run start-dev` (`nodemon` required) to start the client in a development environment
## .env File

The `.env` file is the configuration file of your bot:

```
DB_HOST=[YOUR_DB_HOST]
DB_USER=[YOUR_DB_USER]
DB_PASS=[YOUR_DB_PASS]
DB_DATABASE=[YOUR_DB_DATABASE]

INVITE_URL=[YOUR_INVITE_URL]
DISCORD_TOKEN=[YOUR_DISCORD_TOKEN]
DISCORD_CLIENT_ID=[YOUR_CLIENT_ID]

GUILD_ID=[YOUR_GUILD_ID]
```

With `DB_HOST`, `DB_USER`, `DB_PASS` and `DB_DATABASE` you can configure your database connection. Note that currently only Postgres is supported.

At `INVITE_URL` you enter your OAuth2 URL, which you can generate in the Discord Developer Portal. Currently, the application requires the `bot` and `applications.commands` scopes and the `Administrator` permission.

At `DISCORD_TOKEN` you specify the token of your bot. For `DISCORD_CLIENT_ID` you specify the client ID. You can find both in the Discord Developer Portal.

As `GUILD_ID` you can specify the ID of any server on which you want to test the bot for development purposes. This will be used to register Guild commands.