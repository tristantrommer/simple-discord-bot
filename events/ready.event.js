const db = require('../model');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        db.sequelize.sync().then(() => {
            console.log('Database connection established and synchronized.')
        });
    },
};