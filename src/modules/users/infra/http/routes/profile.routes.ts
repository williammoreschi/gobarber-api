import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileContoller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileContoller.show);

profileRouter.put('/', profileContoller.update);

export default profileRouter;
