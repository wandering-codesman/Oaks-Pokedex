require('dotenv').config('.env');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { auth, requiresAuth } = require('express-openid-connect');
const jwt = require('jsonwebtoken')
const { PORT = 3000, AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_BASE_URL, AUTH0_CLIENT_ID, JWT_SECRET } = process.env;
const { users } = require('./routes');
const { pokemon } = require('./db/seedData');
const Pokemon = require('./models/Pokemon');
const User = require('./models/User');

const config = {
    authRequired: false, // this is different from the documentation
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_AUDIENCE,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_BASE_URL,
  };

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(auth(config))

// Routes
app.get('/', requiresAuth(), (req,res) => {
    res.send('Welcome to your Pokedex API!');
});

// Find all users
app.get('/users', requiresAuth(), async (req,res) => {
  const users = await User.findAll()
  res.send(users)
});

// Find all pokemon
app.get('/pokemons', requiresAuth(), async (req,res) => {
  const pokemon = await Pokemon.findAll();
  res.send(pokemon);
});

// Find one user by ID
app.get("/users/:id", requiresAuth(), async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
      });
      if(!user) {
        res.status(404).send(`This user ${req.params.id} doesn't exist`);
        next();
      } else {
        res.send(user);
      }
    } catch (error) {
      next(error);
    }
  });

  // Find one pokemon by ID
  app.get("/pokemons/:id", requiresAuth(), async (req, res, next) => {
    try {
      const pokemon = await Pokemon.findByPk(req.params.id, {
      });
      if(!pokemon) {
        res.status(404).send(`This Pokemon ${req.params.id} doesn't exist`);
        next();
      } else {
        res.send(pokemon);
      }
    } catch (error) {
      next(error);
    }
  });

// Add pokemon
app.post('/pokemons', async (req,res) => {
try {
    const pokemon = await Pokemon.create({
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight
    }).then((result) => res.send(result));
  }catch (error) {
    console.log(error)
  }
});

// Update pokemons
app.put('/pokemons/:id', async (req, res) => {
  const updatePokemons = await Pokemon.findByPk(req.params.id);

  if (!updatePokemons) {
      res.sendStatus(404);
      return;
  }
  try {
      await updatePokemons.update(req.body);
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.status(400).send(error.errors);
  }
});

// Delete pokemon by ID
app.delete('/pokemons/:id', async (req, res) => {
  const deletePokemon = await Pokemon.destroy({
    where: {
        id: req.params.id
    }
});
if (!deletePokemon) {
    res.status(404).send(
        `There isn't a Pokemon with this id: ${req.params.id}.`
    );
    return;
}
res.status(202).send(`Pokemon with this id: ${req.params.id} has been deleted.`);
});


app.listen(PORT, () => {
    console.log(`Open Pokedex here: http://localhost:${PORT}`)
})

// auth router attaches /login, /logout, and /callback routes to the baseURL
//app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

 