"use strict";

const userDbService = require('../services/authService');
const requestResponse = require('../utils/requestResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const response = await emailValidation(data.email);
        if (response.validEmail) {
            if (!response.emailExist) {
                const password = await bcrypt.hash(data.password, await bcrypt.genSalt(10));
                const userData = {
                    user_name: data.username,
                    user_email: data.email,
                    password: password,
                    is_verified: false
                }
                await userDbService.insertUserDetails(userData);
                return requestResponse.getSuccessResponse('Users registered Successfully');
            } else {
                return requestResponse.getErrorReponseBadData('Error occurred while registering user: Email Already Exists');
            }
        } else {
            return requestResponse.getErrorReponseBadData('Error occurred while registering user: Email is not valid');
        }
    } catch (e) {
        return requestResponse.getErrorResponseServerError(e.message);
    }
}

const signin = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const { message: response } = await userDbService.getUserDetails(data.email);
        let result = "";
        if (response[0] && response[0].password) {
            result = await bcrypt.compare(data.password, response[0].password);
        }

        if (result) {
            let token = jwt.sign(response[0].dataValues, process.env.JWT_SECRET_KEY);
            return requestResponse.getSuccessResponse(token);
        }
    } catch (e) {
        console.error(e);
        return requestResponse.getErrorResponseServerError(e);
    }
}

const emailValidation = async (email) => {

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === true) {

        let { message: response } = await userDbService.getUserDetails(email);
        console.log(response);
        if (response.length) {
            console.error('Email Address Exists');
            return { validEmail: true, emailExist: true };
        } else {
            return { validEmail: true, emailExist: false };
        }
    }
    else {
        console.error('Email Address is not Vaild');
        return { validEmail: false };
    }
}


module.exports = {
    signup,
    signin
}