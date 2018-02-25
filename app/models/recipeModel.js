const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const timestamps = require('mongoose-timestamp');

const RecipeSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        max: 255,
    },
    teaser: {
        type: String,
    },
    text: {
        type: String,
    },
    is_active: {
        type: Boolean,
    },
}, {
    collection: 'recipes',
});

RecipeSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

global.Recipe = Recipe;

module.exports = Recipe;
