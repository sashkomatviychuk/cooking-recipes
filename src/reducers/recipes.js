import {
    BEFORE_RECIPES_LOADED,
    RECIPES_LOADED_SUCCESS,
    RECIPES_LOADED_ERRORED,
    INCREASE_RECIPS_PAGE
} from './../actions/recipes';

let initialState = {
    loading: false,
    recipes: [],
    page: 1,
    error: '',
    lastRecipesCount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BEFORE_RECIPES_LOADED:
            return {
                ...state,
                loading: action.loading,
            };

        case RECIPES_LOADED_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                recipes: action.recipes,
                lastRecipesCount: action.recipes.length,
            };
        
        case RECIPES_LOADED_ERRORED:
            return {
                ...state,
                loading: action.loading,
                error: action.error, // create own handling error action
                lastRecipesCount: 0,
            };
        
        case INCREASE_RECIPS_PAGE:
            return {
                ...state,
                page: action.page,
            };

        default:
            return state;
    }
};
