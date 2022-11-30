const {db, DataTypes} = require('./index');
const seed = require('./seedFn');

seed()
  .then(() => {
    console.log('Seeding success. Initialising Pokedex...');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
  