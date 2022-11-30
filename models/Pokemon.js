const {db, DataTypes} = require('../db');


// TODO - define the Movie model
let Pokemon = db.define('Pokemon', {
    name: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.INTEGER
    }
})

module.exports = Pokemon