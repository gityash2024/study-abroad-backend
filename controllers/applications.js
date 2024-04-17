

const async = require('async');

const Applications = require('../models/applications');


const sendResponse = require('../helpers/sendResponse');
const { findDocumentsWithPagination } = require('../helpers/utils');



const applicationListingPagination = function (data, response, cb) {
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
        collection: Applications
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
exports.applicationListingPagination = applicationListingPagination;