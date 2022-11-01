"use strict";

const requestResponse = require('../utils/requestResponse');
const db = require('../config/db');
const connectToDatabase = db.models;

module.exports.healthCheck = async () => {
    try {
        await connectToDatabase();
        console.log('Connection successful');
        return requestResponse.getSuccessResponse('Connection Successful');
    } catch (err) {
        console.log('Error occurred during DB Health Check', err);
        return requestResponse.getErrorResponseServerError(`DB health check unsuccessful. ${err.message}`);
    }
}