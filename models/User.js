const {db, DataTypes} = require('../db');


// TODO - define the Movie model
let User = db.define('User', {
    FirstName: {
        type: DataTypes.STRING
    },
    LastName: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    },
    Password: {
        type: DataTypes.STRING
    },
})

module.exports = User