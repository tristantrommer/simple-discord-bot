const { colors } = require('./../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = await interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);

                const errorEmbed = {
                    color: `0x${colors.error}`,
                    title: 'Error',
                    description: 'There was an error while executing this command!'
                }

                if (interaction.deferred || interaction.replied) {
                    return interaction.editReply({ embeds: [errorEmbed] });
                } else {
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }

        return;
    },
};