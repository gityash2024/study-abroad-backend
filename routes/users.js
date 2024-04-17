const express = require('express');
const router = express.Router();




/* Controllers */
const users = require('../controllers/user');

const authenticateRoles = require('../middlewares/authenticateRoles');


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

/* POST user registry. */
router.post('/phone/register', function (req, res, next) {
    let data = req.body;
    data.req = req.data;
    users.addNewUserWithPhoneNumber(data, routeCallback(res));
});





module.exports = router;
