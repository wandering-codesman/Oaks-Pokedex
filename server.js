require('dotenv').config('.env');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { auth, requiresAuth } = require('express-openid-connect');
const jwt = require('jsonwebtoken')
const { PORT = 3000, AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_BASE_URL, AUTH0_CLIENT_ID, JWT_SECRET } = process.env;
const { userRoute } = require('./routes')


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
app.get('/', (req,res) => {
    res.send('Welcome');
})


app.listen(PORT, () => {
    console.log(`Open Pokedex here: http://localhost:${PORT}`)
})

// auth router attaches /login, /logout, and /callback routes to the baseURL
//app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

