const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        // disable logging; default: console.log
        logging: false
    }
);

const Models = {};
const connection = {};

const sync = async () => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.');
        return sequelize;
    }

    await sequelize.authenticate();
    connection.isConnected = true;
    console.log('=> Created a new connection.');
    await sequelize.sync();
    return sequelize;
};

const models = async () => {
    if (!connection.isConnected) {
        await sequelize.authenticate();
        connection.isConnected = true;
        console.log('=> Created a new connection.');
    }
    return Models;
};

module.exports = {
    sync,
    models,
    sequelize
}