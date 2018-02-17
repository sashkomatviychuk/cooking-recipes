const passport = require('passport');
const { Strategy } = require('passport-local');
const { Application } = require('express');


passport.use(new Strategy(
    async (username, password, cb) =>  {
        try {
            // const user = await User.findOne({ username });
            // todo: change it
            const user = {
                password: '1234',
                _id: 'abc',
            };

            if (!user || user.password != password) {
                return cb(null, false);
            }

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    })
);

passport.serializeUser((user, cb) => cb(null, user._id));
  
passport.deserializeUser(async (id, cb) => {
    try {
        // const user = await User.findById(id);
        const user = { _id: 'abc', password: '1234' };
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
});

module.exports = (app) => {
    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
}
