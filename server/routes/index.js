const express = require('express');
require('../config/passport');

const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const planRouter = require('./plan');
const v1Router = require('./v1');

const authMiddleware = require('../middlewares/auth');

const { jwtAuth } = authMiddleware;

router.get('/', (req, res) => {
    return res.json({
        message: 'This is API interface',
    });
});

router.use('/auth', authRouter);
router.use('/users', jwtAuth, userRouter);
router.use('/plans', jwtAuth, planRouter);
router.use('/v1', jwtAuth, v1Router);

module.exports = router;
