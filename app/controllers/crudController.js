class CrudController {

    /**
     * Main service instance
     */
    getDefaultService() {
        throw new Error(`Class ${this.constructor.name} mus override method getDefaultService`);
    }

    /**
     * Post create action
     * @param {Request} req 
     * @param {Response} res 
     */
    async postCreate(req, res) {
        const service = this.getDefaultService();

        try {
            await service.create(req.body);
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    }

    /**
     * Post update action
     * @param {Request} req 
     * @param {Response} res
     */
    async postUpdate(req, res) {
        const service = this.getDefaultService();

        try {
            await service.update(req.body, req.params.id);
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    }

    /**
     * Post remove action
     * @param {Request} req 
     * @param {Response} res 
     */
    async postRemove(req, res) {
        const service = this.getDefaultService();

        try {
            await service.remove(req.params.id);
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    }
}

module.exports = CrudController;
