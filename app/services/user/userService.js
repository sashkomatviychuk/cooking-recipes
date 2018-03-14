class UserService {

    static async register(data) {
        // validation
        const user = new User(data);
        
        try {
            return await user.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;