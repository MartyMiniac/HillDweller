const userModel = require('../models/user')
const auth = require('./auth')
/**
 * adds new user data into user table of the database
 * @param {data that needs to be added to the database in users table} data 
 * @returns success or failure of addition
 */
exports.addUser = (data) => {
    return new Promise((resolve, refuse) => {
        const usr = new userModel(data)
        usr.save()
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.getUser = (username) => {
    return new Promise((resolve, refuse) => {
        userModel.findOne({
            username: username
        }).then(data => {
            data.password=undefined
            resolve(data)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

/**
 * deletes the user data of the provided user id
 * @param {_id of the user} uid 
 * @returns deleted info about the user
 */
exports.delUser = (uid) => {
    return new Promise((resolve, refuse) => {
        userModel.findByIdAndDelete(uid)
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

/**
 * fetches all of tje user data from the database
 * @returns list of user data
 */
exports.getAllUser = () => {
    return new Promise((resolve, refuse) => {
        userModel.find({})
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            refuse(err)
        })
    })
}
/**
 * updates data of the user
 * @param {_id of the user whose data needs to updated} uid 
 * @param {updated values for the user} data 
 * @returns 
 */
exports.updateUser = (data) => {
    return new Promise((resolve, refuse) => {
        const uid = data.uid
        delete data.uid
        userModel.findByIdAndUpdate(uid, data)
        .then(resdata => {
            resolve(resdata)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

/**
 * checks if the login credentials are valid or not
 * @param {username of the user trying to login} username 
 * @param {unhashed password of the user trying to login} password 
 * @returns all the userinfo about the user stored in users table
 */
exports.checkLogin = (username, password) => {
    return new Promise((resolve, refuse) => {
        userModel.findOne({
            username: username,
            password: password
        })
        .then(data => {
            if(data===null) {
                resolve({
                    success: false,
                    data: data
                })
            }
            else {
                resolve({
                    success: true,
                    jwt: auth.createToken(username)
                })
            }
        })
        .catch(err => {
            refuse(err)
        })
    })
}