const express = require('express');
const router = express.Router();

const FeedbackService = require('./../services/feedback/feedbackService');

class PagesController {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async postContact(req, res) {
        const service = new FeedbackService();

        try {
            await service.addFeedback(req.body);
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0, error: err.toString() });
        }
    }
}

const ctrl = new PagesController();

router.post('/contact', ctrl.postContact);

module.exports = router;
