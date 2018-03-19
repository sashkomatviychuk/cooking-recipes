const _ = require('lodash');
const express = require('express');

const generateToken = require('./../services/auth/token');
const { requireSignin, auth } = require('./../services/auth/middlewares');
const UserService = require('./../services/user/userService');

const router = express.Router();

class AuthController {

    async postRegister(req, res, next) {
        try {
            const service = new UserService();
            await service.create(req.data);

            res.json({ result: 1 });
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

    async postLogout(req, res) {
        try {
            req.logout();
            return res.json({ result: 1 });
        } catch (err) {
            return res.json({ result: 0 });
        }
    }
}

const ctrl = new AuthController();

router.post('/login', requireSignin, ctrl.postLogin);
router.post('/register', ctrl.postRegister);
router.post('/logout', auth, ctrl.postLogout);

module.exports = router;
