const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const timestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        max: 255,
    },
    last_name: {
        type: String,
        max: 255,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    collection: 'users',
});

UserSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

const User = mongoose.model('User', UserSchema);

global.User = User;

module.exports = User;
