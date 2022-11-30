const {db, DataTypes} = require('./index');
const User = require('../models/User');
const Pokemon = require('../models/Pokemon');
const {users, pokemon} = require('./seedData');

const seed = async () => {
  try {
    await db.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdPokemon = await Pokemon.bulkCreate(pokemon);

  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
