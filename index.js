const { Client, Intents } = require('discord.js');
require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
});

client.on('ready', () => {
    console.log('Bot is ready');
});

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong'
        });
    }
})

client.login(process.env.DISCORD_TOKEN);