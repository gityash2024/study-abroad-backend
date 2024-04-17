require('../config')
const Admins = require('../models/admin');

let admins = [
    {
        fullName: 'Admin',
        adminId: '123456',
        password: 'admin@123',
        role: 'ADMIN'
    }
]
const seedAdmin = () => {

    Admins.create(admins)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
seedAdmin();