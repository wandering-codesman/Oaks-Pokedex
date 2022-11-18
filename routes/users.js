const express = require('express');
const {User} = require('../models/User')
const router = express.Router();

// get all users
router.get('/', async (req, res)=> {
    const users = await User.findAll();
    res.send(users)
});

router.get("/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId, {
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
