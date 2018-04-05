const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt-nodejs');

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

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        bcrypt.hash(this.password, salt, null, (err, hash) => {
          if (err) { return next(err); }

          this.password = hash;

          next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return callback(err); }

      callback(null, isMatch);
    });
  };

const User = mongoose.model('User', UserSchema);

global.User = User;

module.exports = User;
