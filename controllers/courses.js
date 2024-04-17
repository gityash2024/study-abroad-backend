
const async = require('async');

const Courses = require('../models/courses');


const sendResponse = require('../helpers/sendResponse');
const { findDocumentsWithPagination } = require('../helpers/utils');



const addNewCourse = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }

    let createPayload = {
        courseName: data.courseName,
        universityName: data.universityName,
        courseLogo: data.courseLogo,
        bannerImage: data.bannerImage,
        level: data.level,
        overview: data.overview,
        modules: data.modules,
        requirements: data.requirements,
        uniqueCourseInfo: data.uniqueCourseInfo,
    };
    Courses.create(createPayload)
        .then(res => {
            return cb(null, sendResponse(200, 'Success', null))
        })
        .catch(err => {
            console.log(err);
            return cb(sendResponse(500, "something went wrong", null))
        })
}
exports.addNewCourse = addNewCourse;

const coursesListingPagination = function (data, response, cb) {
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
        collection: Courses
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
exports.coursesListingPagination = coursesListingPagination;

const editCourse = function (data, response, cb) {
    if (!cb) {
        cb = response;
    }
    if (!data.courseId) {
        return cb(sendResponse(400, "Missing Params", null))
    }
    let payload = {
        _id: data.courseId,
    }
    let update = {
        courseName: data.courseName,
        universityName: data.universityName,
        courseLogo: data.courseLogo,
        bannerImage: data.bannerImage,
        level: data.level,
        overview: data.overview,
        modules: data.modules,
        requirements: data.requirements,
        uniqueCourseInfo: data.uniqueCourseInfo,
    }
    Courses.findOneAndUpdate(payload, update)
        .then(res => {
            console.log(res)
            if (!res) {
                return cb(sendResponse(400, "Invalid Details", null))
            };
            return cb(null, sendResponse(200, "Updated !!", null))
        })
        .catch(err => {
            console.log(err);
            return cb(sendResponse(500, "", null));
        })
}
exports.editCourse = editCourse;