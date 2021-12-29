const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays the latency of the bot.'),
    async execute(interaction) {
        const pingingEmbed = {
            color: 0x007bff,
            title: 'Pinging...',
        }

        const sent = await interaction.reply({ embeds: [pingingEmbed], fetchReply: true });

        const finalEmbed = {
            color: 0x007bff,
            title: 'Pong!',
            fields: [
                {
                    name: 'Websocket heartbeat',
                    value: inlineCode(`${interaction.client.ws.ping}ms`),
                    inline: true
                },
                {
                    name: 'Roundtrip latency',
                    value: inlineCode(`${sent.createdTimestamp - interaction.createdTimestamp}ms`),
                    inline: true
                }
            ],
            timestamp: new Date(),
        }

        return interaction.editReply({ embeds: [finalEmbed] });
    }
};
