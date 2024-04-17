
const async = require('async');

const Users = require('../models/users');


const sendResponse = require('../helpers/sendResponse');
const { generateLoginToken } = require('./auth');


const addNewUserWithPhoneNumber = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    if (!data.fullName || !data.countryCode || !data.phoneNumber || !data.email) {
        return cb(sendResponse(400, "Missing Params", null));
    }

    let waterfallFunctions = []
    waterfallFunctions.push(async.apply(validateNewUserDetails, data));
    waterfallFunctions.push(async.apply(addNewUserWithPhoneNumberToDB, data));
    // waterfallFunctions.push(async.apply(generateLoginToken, data));

    async.waterfall(waterfallFunctions, cb);
}
exports.addNewUserWithPhoneNumber = addNewUserWithPhoneNumber;


const validateNewUserDetails = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    let findData = {
        $or: [
            { email: data.email },
            { phoneNumber: data.phoneNumber, countryCode: data.countryCode }
        ]
    }
    let projection = {
    }

    Users.findOne(findData, projection)
        .then((res) => {
            if (res) {
                return cb(sendResponse(400, 'Email/Phone Already Registered', null))
            }
            return cb(null, sendResponse(200, 'Success', null))
        })
        .catch((err) => {
            console.log(err);
            return cb(sendResponse(500, "something went wrong", null))
        })
}


const addNewUserWithPhoneNumberToDB = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    let createPayload = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        email: data.email,
        signupSource: 'PHONE_NUMBER'
    }

    Users.create(createPayload)
        .then((res) => {
            data.userDetails = res;
            return cb(null, sendResponse(200, 'Success', null))
        })
        .catch((err) => {
            console.log(err);
            return cb(sendResponse(500, "something went wrong", null))
        })
}
