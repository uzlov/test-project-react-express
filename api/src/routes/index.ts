import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import MediaRoutes from './MediaRoutes';

// Init main router
const apiRouter = Router();

// ** Add MediaRouter ** //
// Init router
const mediaRouter = Router();
mediaRouter.get(Paths.Medias.Get, MediaRoutes.getAll);
mediaRouter.post(Paths.Medias.Add, MediaRoutes.addOne);

// Add to main router
apiRouter.use(Paths.Medias.Base, mediaRouter);

export default apiRouter;
