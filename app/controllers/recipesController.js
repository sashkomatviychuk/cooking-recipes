const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

const RecpiesService = require('./../services/recipes/recipesService');

class RecipesController {

    async getRecipes(req, res, next) {
        const service = new RecpiesService();

        try {
            const recipes = await service.getPaginatedList(
                {},
                { page: req.query.page }
            ); 

            res.json({
                result: 1,
                data: recipes || [],
            });
        } catch (err) {
            res.json({ result: 0 });
        }
    }

    async getRecipe(req, res, next) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                error: 'Not found',
            });
        }

        try {
            const recipe = await Recipe
                .findOne({ _id: id, is_active: true }, { _id: 0 })
                .exec();

            if (!recipe) {
                return res.status(404).json({
                    error: 'Not found',
                });
            }

            res.json({
                result: 1,
                data: recipe,
            });
        } catch (err) {
            next(err);
        }
    }
}

const ctrl = new RecipesController();

router.get('/recipes', ctrl.getRecipes);
router.get('/recipe/:id', ctrl.getRecipe);

module.exports = router;
