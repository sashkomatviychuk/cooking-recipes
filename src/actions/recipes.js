import axios from 'axios'

export const BEFORE_RECIPES_LOADED = 'BEFORE_RECIPES_LOADED';
export const RECIPES_LOADED_SUCCESS = 'RECIPES_LOADED_SUCCESS';
export const RECIPES_LOADED_ERRORED = 'RECIPES_LOADED_ERRORED';
export const INCREASE_RECIPS_PAGE = 'INCREASE_RECIPS_PAGE';

function beforeRecipesLoaded() {
    return {
        type: BEFORE_RECIPES_LOADED,
        loading: true,
    };
}

function recipesLoadedWithError(error) {
    return {
        type: RECIPES_LOADED_ERRORED,
        error: error.toString(),
        loading: false,
    };
}

function recipesWasLoaded(response) {
    const { result, data } = response;
    let actionData = {
        loading: false,
    };

    if (result == 1) {
        actionData = Object.assign({}, actionData, {
            type: RECIPES_LOADED_SUCCESS,
            recipes: data,
        });
    } else {
        actionData = Object.assign({}, actionData, {
            type: RECIPES_LOADED_ERRORED,
            error: 'Unable to fetch data',
        });
    }

    return actionData;
}

function increasePage(newPageNum) {
    return {
        type: INCREASE_RECIPS_PAGE,
        page: newPageNum,
    };
}

export const fetchRecipes = () => (dispatch, getState) => {
    const state = getState();
    let page = state.recipes.page || 1;

    dispatch(beforeRecipesLoaded());

    return axios.get('/api/recipes', { page })
        .then(response => {
            const data = response.data || [];

            dispatch(recipesWasLoaded(response));
    
            if (data.length) {
                dispatch(increasePage(page++));
            } 

            return response;
        })
        .catch(err => dispatch(recipesLoadedWithError(err)));
};