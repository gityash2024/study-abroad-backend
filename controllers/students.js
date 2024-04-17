
const async = require('async');

const Students = require('../models/students');


const sendResponse = require('../helpers/sendResponse');
const { findDocumentsWithPagination } = require('../helpers/utils');



const addNewStudent = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    let createPayload = {
        "fullName": data.fullName,
        "gender": data.gender,
        "contactNumber": data.contactNumber,
        "email": data.email,
        "dob": data.dob,
        "maritalStatus": data.maritalStatus,
        "mailingAddress": data.mailingAddress,
        "permanentAddress": data.permanentAddress,
        "passportInformation": data.passportInformation,
        "academicProfile": data.academicProfile,
        "workExperience": data.workExperience,
        "tests": data.tests,
        "documents": data.documents
    }
    Students.create(createPayload)
        .then(res => {
            return cb(null, sendResponse(200, 'Success', null))
        })
        .catch(err => {
            console.log(err);
            return cb(sendResponse(500, "something went wrong", null))
        })
}
exports.addNewStudent = addNewStudent;

const editStudent = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    // if (!data.studentsId) {
    //     return cb(sendResponse(400, "Missing Params", null))
    // }
    // let payload = {
    //     _id: data.studentsId,
    // }
    // let update = {
    //     latestQualification: data.latestQualification,
    //     specialization: data.specialization,
    //     coursesName: data.coursesName,
    // }
    // Students.findOneAndUpdate(payload, update)
    //     .then(res => {
    //         console.log(res)
    //         if (!res) {
    //             return cb(sendResponse(400, "Invalid Details", null))
    //         };
    //         return cb(null, sendResponse(200, "Updated !!", null))
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return cb(sendResponse(500, "", null));
    //     })
}
exports.editStudent = editStudent;

const studentsListingPagination = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    let matchCondition = {};

    let sortCondition = {
        createdAt: -1
    };

    let limit = parseInt(process.env.pageLimit);

    if (data.limit && !Number.isNaN(parseInt(data.limit))) {
        limit = parseInt(data.limit)
    }
    let skip = 0;
    let currentPage = 1;

    if (data.currentPage && !Number.isNaN(parseInt(data.currentPage))) {
        currentPage = parseInt(data.currentPage);
        skip = currentPage > 0 ? (currentPage - 1) * limit : 0;
    };

    let payload = {
        skip,
        limit,
        matchCondition,
        sortCondition,
        collection: Students
    };

    findDocumentsWithPagination(payload, (err, res) => {
        if (err) {
            console.log(err);
            return cb(sendResponse(500, "something went wrong", null))
        };
        let dataToSend = {
            totalCount: res?.data?.[0] || 0,
            limit,
            currentPage,
            list: res?.data?.[1] || [],
        }
        return cb(null, sendResponse(200, "Success", dataToSend))
    })
}
exports.studentsListingPagination = studentsListingPagination;