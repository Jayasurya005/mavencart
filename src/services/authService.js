"use strict";

const userRepository = require('../repository/userRepository');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
const sequelize = dbConfig.sequelize;
const UserRepository = userRepository.users(sequelize, Sequelize);
const models = { "users": UserRepository };

const insertUserDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await models.users.create(data);
            resolve({ status: true, message: null });
         } catch (e) {
             console.error('Error in inserting users details ', e.message);
             reject({ status: false, message: `Error in inserting users details ${e.message}` });
        }
    });
}

const getUserDetails = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await models.users.findAll({
                where: { user_email: email },
            });
            resolve({ status: true, message: response });
         } catch (e) {
             console.error('Error in inserting users details ', e.message);
             reject({ status: false, message: `Error in inserting users details ${e.message}` });
        }
    });
}

module.exports = {
    insertUserDetails,
    getUserDetails
}
