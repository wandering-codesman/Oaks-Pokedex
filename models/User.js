const {db, DataTypes} = require('../db');


// TODO - define the Movie model
let User = db.define('User', {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
})

module.exports = User