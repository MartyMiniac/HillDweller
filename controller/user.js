const userModel = require('../models/user')

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

/**
 * deletes the user data of the provided user id
 * @param {_id of the user} uid 
 * @returns deleted info about the user
 */
exports.delUser = (uid) => {
    return new Promise((resolve, refuse) => {

    })
}

/**
 * fetches all of tje user data from the database
 * @returns list of user data
 */
exports.getAllUser = () => {
    return new Promise((resolve, refuse) => {

    })
}
/**
 * updates data of the user
 * @param {_id of the user whose data needs to updated} uid 
 * @param {updated values for the user} data 
 * @returns 
 */
exports.updateUser = (uid, data) => {
    return new Promise((resolve, refuse) => {

    })
}