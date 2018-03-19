const CrudService = require('./../crudService');

class UserService extends CrudService {

    /**
     * @returns {Schema} 
     */
    getModel() {
        return Recipe;
    }
}

module.exports = UserService;