module.exports = (sequelize, Sequelize) => {
    return sequelize.define('mute_alert', {
        guild_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        notify_user_id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    }, {
        schema: 'bot'
    });
};