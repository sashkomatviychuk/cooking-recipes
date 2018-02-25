const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

const RECIPES_LIMIT = 10;

class RecipesController {

    async getRecipes(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * RECIPES_LIMIT;

        try {
            const recipes = await Recipe
                .find()
                .sort({ _id: -1 })
                .limit(RECIPES_LIMIT)
                .skip(skip)
                .lean()
                .exec();
            
            if (!Array.isArray(recipes)) {
                return res.json({
                    result: 0,
                });
            }

            res.json({
                result: 1,
                data: recipes,
            });
        } catch (err) {
            next(err);
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
