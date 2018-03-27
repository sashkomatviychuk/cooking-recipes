const express = require('express');
const router = express.Router();

class PagesController {

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    postContact(req, res) {
        try {
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    }
}

const ctrl = new PagesController();

router.post('/contact', ctrl.postContact);

module.exports = router;
