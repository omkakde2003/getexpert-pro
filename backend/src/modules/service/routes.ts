import { Router } from 'express';
import ServiceController from './controller';

export const serviceRouter = Router();

serviceRouter.get('/', ServiceController.getServices);
serviceRouter.get('/categories', ServiceController.getCategories);
serviceRouter.get('/:id', ServiceController.getService);

export default serviceRouter;
