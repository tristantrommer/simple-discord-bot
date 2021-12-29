const { userMention, channelMention } = require('@discordjs/builders');

const db = require("../model");
const mute_alert = db.mute_alert;

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        if (!oldState.selfMute && newState.selfMute) {
            const notify_list = await mute_alert.findAll({ where: { guild_id: newState.guild.id, notify_user_id: newState.id }, attributes: ['user_id'] });

            if (notify_list.length === 0) return;

            const user_ids = Array.from(notify_list.map(u => u.user_id));

            user_ids.forEach((id) => {
                if (newState.channel.members.has(id)) {
                    const messageEmbed = {
                        color: 0x007bff,
                        title: 'Mute alert',
                        description: `${userMention(newState.id)} has just muted in ${channelMention(newState.channelId)}.`,
                        timestamp: new Date(),
                    };

                    if (newState.selfDeaf) messageEmbed.description = `${userMention(newState.id)} has just muted fully in ${channelMention(newState.channelId)}.`;

                    return newState.channel.members.get(id).user.send({ embeds: [messageEmbed] });
                }
            });
        }
    },
};