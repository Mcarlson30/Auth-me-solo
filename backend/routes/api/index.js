// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const photoRouter = require('./photo.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/photo', photoRouter)

module.exports = router;




