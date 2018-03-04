const express = require('express');
const User = require('../Models/User');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await User.all;
  res.render('users/index', { title: 'Users', users });
});

router.get('/:id', async (req, res, next) => {
  const user = await User.find(req.params.id);
  res.render('users/show', { title: user.name, user });
});

module.exports = router;
