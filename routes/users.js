const express = require('express');
const {User} = require('../models/User')
const router = express.Router();

// get all users
router.get('/', async (req, res)=> {
    const users = await User.findAll();
    res.send(users)
});

