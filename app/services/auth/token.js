const jwt = require('jwt-simple');

// get token when user signIn
module.exports = (user) => {
    const timestamp = new Date().getTime();
    // todo: change secret
    return jwt.encode({ sub: user._id, iat: timestamp }, 'secret');
}