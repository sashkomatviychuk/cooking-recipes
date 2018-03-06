const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
const passport = require('passport');
const router = express.Router();

const generateToken = require('./../services/auth/token');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local');

class AuthController {

    async postRegister(req, res, next) {
        const data = req.body;

        try {
            const user = new User(data);
            const result = await user.save();

            if (result) {
                return res.json({ result: 1 });
            }

            return res.json({ result: 0 });
        } catch (err) {
            return res.json({ result: 0 });
        }
    }

    async postLogin(req, res, next) {
        if (!req.user) {
            return res.json({});
        }

        const data = _.pick(req.user, ['_id', 'first_name', 'last_name', 'email']);
        const token = generateToken(req.user);

        res.json({
            data,
            token,
        });
    }
}

const ctrl = new AuthController();

router.post('/login', requireSignin, ctrl.postLogin);
router.post('/register', ctrl.postRegister);

module.exports = router;
