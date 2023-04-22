import { Router } from 'express';

export default class BaseRoutes {
    route: Router;

    constructor() {
        this.route = Router();
    }
}