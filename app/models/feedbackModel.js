const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const FeedbackSchema = mongoose.Schema({
    name: {
        type: String,
        max: 255,
    },
    email: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
    collection: 'feedback',
});

FeedbackSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

global.Feedback = Feedback;

module.exports = Feedback;