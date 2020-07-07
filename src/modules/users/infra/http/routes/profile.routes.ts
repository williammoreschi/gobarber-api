import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileContoller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileContoller.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confimation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileContoller.update,
);

export default profileRouter;
