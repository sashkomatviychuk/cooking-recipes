const path = require('path');

module.exports = {
    publicPath: path.join(__dirname, './../public'),
    viewsPath: path.join(__dirname, './../app/views'),
    connection: 'mongodb://localhost:27017/cooking_recipes',
};