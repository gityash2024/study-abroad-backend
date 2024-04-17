const express = require('express');
const router = express.Router();




/* Controllers */
const applications = require('../controllers/applications');
const authenticator = require('../middlewares/authenticator');


const routeCallback = function (res) {
    return (err, response) => {
        let status = 0;
        if (err) {
            status = err.status;
            return res.status(status).send(err);
        }
        status = response.status;
        return res.status(status).send(response);
    }
}



router.get('/list/pagination', [authenticator(['ADMIN'])], function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    applications.applicationListingPagination(data, routeCallback(res));
});





module.exports = router;
