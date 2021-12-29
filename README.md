# simple-discord-bot

A simple Discord bot with some useful features.

## Commands

**mute-alert**: Notifies you when a certain user mutes himself.
- `/mute-alert list` - Shows the users on your notification list.
- `/mute-alert add` - Add a user to the notification list.
- `/mute-alert remove` - Removes a user from the notification list.

**info**:
- `/help` - Displays an overview of the commands and functions.
- `/ping` - Displays the latency of the bot.
- `/invite` - Invite this bot to your server.

## Requirements

- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
- [pm2](https://pm2.keymetrics.io/) to run the application in a production environment
- [nodemon](https://nodemon.io/) to run the application in a development environment

## Setup

1. Create and configure the `.env` file in the root directory.
2. Run `npm install` to download the dependencies.
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