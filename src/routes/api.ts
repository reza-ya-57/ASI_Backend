import { Router } from 'express';
import { authMw } from '../middleware/authMw';
import authRouter from '../routes/auth/auth.router';
import sqlRouter from './questions/quesitons-router';
import baseRouter from './base/base';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/base' , baseRouter);
apiRouter.use('/question' , authMw , sqlRouter);

// Export default
export default apiRouter;
