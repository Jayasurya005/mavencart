"use strict";
const bcrypt = require('bcrypt');

const users = (sequelize, type) => {
    return sequelize.define('users', {
        user_id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: type.STRING,
            allowNull: false
        },
        user_email: {
            type: type.STRING,
            allowNull: false,
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        is_verified: {
            type: type.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
}

module.exports = {
    users
}