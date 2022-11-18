const {db, DataTypes} = require('../db');


// TODO - define the Movie model
let Pokemon = db.define('Pokemon', {
    Name: {
        type: DataTypes.STRING
    },
    Type: {
        type: DataTypes.STRING
    },
    Weight: {
        type: DataTypes.INTEGER
    }
})

module.exports = Pokemon