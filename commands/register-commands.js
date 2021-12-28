const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.command.js'));
for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

if (process.argv[2] === '--global') {
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
        .then(() => console.log('Successfully registered global application commands.'))
        .catch(console.error);
} else if (process.argv[2] === '--guild') {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
        .then(() => console.log('Successfully registered guild application commands.'))
        .catch(console.error);
} else {
    console.log('Error: Please specify if the commands should be registered global or guild.')
}