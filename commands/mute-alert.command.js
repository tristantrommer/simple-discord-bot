const { SlashCommandBuilder, userMention } = require('@discordjs/builders');

const db = require("../model");
const mute_alert = db.mute_alert;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute-alert')
        .setDescription('Notifies you when a certain user mutes himself.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Shows the users on your notification list.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a user to the notification list.')
                .addUserOption(option => option.setName('user').setDescription('User').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes a user from the notification list.')
                .addUserOption(option => option.setName('user').setDescription('User').setRequired(true))),
    async execute(interaction) {
        if (interaction.options.data.some(option => option.type === 'SUB_COMMAND')) {
            const subcommand = interaction.options.getSubcommand();

            const user_id = interaction.user.id;
            const notify_user_id = (subcommand === 'add' || subcommand === 'remove') ? interaction.options.getMember('user').id : '';

            let returnEmbed = {};

            if (subcommand === 'list') {
                return interaction.reply("mute-alert list");
            } else if (subcommand === 'add') {
                try {
                    if (user_id === notify_user_id) throw new Error('AddSelfError');
                    if (notify_user_id === process.env.CLIENT_ID) throw new Error('AddBotError');

                    await mute_alert.create({
                        user_id: user_id,
                        notify_user_id: notify_user_id
                    });

                    returnEmbed = {
                        color: 0x28a745,
                        title: 'User added',
                        description: `${userMention(notify_user_id)} was added to your notification list.`
                    };
                } catch (error) {
                    returnEmbed = {
                        color: 0xdc3545,
                        title: 'Error',
                        description: 'There was an error while executing this command.'
                    };

                    if (error.message === 'AddSelfError') returnEmbed.description = 'You cannot add yourself to your notification list.';
                    if (error.message === 'AddBotError') returnEmbed.description = 'You cannot add this bot to your notification list.';

                    if (error.name === 'SequelizeUniqueConstraintError') {
                        returnEmbed = {
                            color: 0xffc107,
                            title: 'Warning',
                            description: `${userMention(notify_user_id)} already exists on your notification list and therefore was not added.`
                        };
                    }
                }
            } else if (subcommand === 'remove') {
                const rowCount = await mute_alert.destroy({where: {
                    user_id: user_id,
                    notify_user_id: notify_user_id
                }});

                if (!rowCount) {
                    returnEmbed = {
                        color: 0xffc107,
                        title: 'Warning',
                        description: `${userMention(notify_user_id)} does not exist on your notification list and therefore was not removed.`
                    };
                } else {
                    returnEmbed = {
                        color: 0x28a745,
                        title: 'User removed',
                        description: `${userMention(notify_user_id)} was removed from your notification list.`
                    };
                }
            }

            return interaction.reply({ embeds: [returnEmbed], ephemeral: true });
        }
    }
};
