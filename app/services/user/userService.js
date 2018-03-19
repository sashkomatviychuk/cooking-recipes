const CrudService = require('./../crudService');

class UserService extends CrudService {

    /**
     * @returns {Schema} 
     */
    getModel() {
        return User;
    }
}

module.exports = UserService;