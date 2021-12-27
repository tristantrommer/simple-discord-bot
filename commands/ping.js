const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

const { colors } = require('./../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the latency.'),
    async execute(interaction) {
        const pingingEmbed = {
            color: `0x${colors.default}`,
            title: 'Pinging...',
        }

        const sent = await interaction.reply({ embeds: [pingingEmbed], fetchReply: true });

        const finalEmbed = {
            color: `0x${colors.default}`,
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

        await interaction.editReply({ embeds: [finalEmbed] });
    }
};
