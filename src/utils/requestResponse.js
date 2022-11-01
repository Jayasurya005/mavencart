const getSuccessResponse = (message) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ status: 'Success', 'message': message }),
    }
};

const getErrorResponseServerError = (message) => {
    return {
        statusCode: 500,
        body: JSON.stringify({ status: 'InternalServerError', 'message': message })
    }
};

const getErrorReponseBadData = (message) => {
    return {
        statusCode: 400,
        body: JSON.stringify({ status: 'BadRequest', 'message': message })
    }
};

module.exports = {
    getSuccessResponse,
    getErrorResponseServerError,
    getErrorReponseBadData
};
