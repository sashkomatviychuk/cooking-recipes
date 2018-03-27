const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

const RecipesService = require('./../services/recipes/recipesService');
const CrudController = require('./crudController');

class RecipesController extends CrudController {

    /**
     * Main service instance
     */
    getDefaultService() {
        return new RecipesService();
    }
}

const ctrl = new RecipesController();

router.get('/recipes', ctrl.getEntitiesList);
router.get('/recipe/:id', ctrl.getEntity);

module.exports = router;
