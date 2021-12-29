const { SlashCommandBuilder, bold, inlineCode } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays an overview of the commands and functions.'),
    async execute(interaction) {
        const messageEmbed = {
            color: 0x007bff,
            author: {
                name: interaction.client.user.username,
                icon_url: interaction.client.user.avatarURL(),
                url: process.env.INVITE_URL,
            },
            description: `
            ${bold('mute-alert')}:
            ㅤ${inlineCode('/mute-alert list')} - Shows the users on your notification list.
            ㅤ${inlineCode('/mute-alert add')} - Add a user to the notification list.
            ㅤ${inlineCode('/mute-alert remove')} - Removes a user from the notification list.
            
            ${bold('info')}:
            ㅤ${inlineCode('/help')} - Displays an overview of the commands and functions.
            ㅤ${inlineCode('/ping')} - Displays the latency of the bot.
            ㅤ${inlineCode('/invite')} - Invite this bot to your server.
            `,
        }

        return interaction.reply({ embeds: [messageEmbed] });
    }
};
