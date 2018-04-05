const validate = require('./validator');

class FeedbackService {

    /**
     * Add new feedback from user
     * @param {Object} data
     */
    async addFeedback(data) {
        const result = validate(data);

        if (result.error) {
            throw new Error(result.error);
        }

        const feedback = new Feedback(data);

        return await feedback.save();
    }
}

module.exports = FeedbackService;