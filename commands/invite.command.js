const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite this bot to your server.'),
    async execute(interaction) {
        const messageEmbed = {
            color: 0x007bff,
            title: 'Invite this bot to your server.',
        }

        const messageActionRow = {
            type: 'ACTION_ROW',
            components: [
                {
                    type: 'BUTTON',
                    style: 'LINK',
                    label: 'Invite',
                    url: process.env.INVITE_URL
                }
            ]
        }

        return interaction.reply({ embeds: [messageEmbed], components: [messageActionRow] });
    }
};
