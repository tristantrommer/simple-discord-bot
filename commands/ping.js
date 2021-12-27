const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the latency.'),
    async execute(interaction) {
        const pingingEmbed = {
            color: 0x0066ff,
            title: 'Pinging...',
        }

        const sent = await interaction.reply({ embeds: [pingingEmbed], fetchReply: true });

        const finalEmbed = {
            color: 0x0066ff,
            title: 'Pong!',
            fields: [
                {
                    name: 'Websocket heartbeat',
                    value: `${interaction.client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: 'Roundtrip latency',
                    value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`,
                    inline: true
                }
            ],
            timestamp: new Date(),
        }

        await interaction.editReply({ embeds: [finalEmbed] });
    }
};
