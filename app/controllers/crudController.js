class CrudController {

    /**
     * 
     */
    constructor() {
        this.defaultService = this.getDefaultService();
    }

    /**
     * Main service instance
     */
    getDefaultService() {
        throw new Error(`Class ${this.constructor.name} must override method getDefaultService`);
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async getEntity(req, res) {
        const id = req.params.id;

        try {
            const entity = await this.defaultService.findById(id);

            if (!entity) {
                return res.status(404).json({
                    result: 0,
                    error: 'Not found',
                });
            }

            res.json({
                result: 1,
                data: entity,
            });
        } catch (err) {
            res.json({
                result: 0,
            });
        }
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async getEntitiesList(req, res) {
        try {
            const entities = await this.defaultService.getPaginatedList(
                {},
                { page: req.query.page }
            ); 

            res.json({
                result: 1,
                data: entities || [],
            });
        } catch (err) {
            res.json({ result: 0 });
        }
    }

    /**
     * Post create action
     * @param {Request} req 
     * @param {Response} res 
     */
    async postCreate(req, res) {
        try {
            await this.defaultService.create(req.body);
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
        try {
            await this.defaultService.update(req.body, req.params.id);
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
        try {
            await this.defaultService.remove(req.params.id);
            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    }
}

module.exports = CrudController;
