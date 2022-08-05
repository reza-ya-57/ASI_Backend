import { Router } from 'express';
import { authMw } from '../middleware/authMw';
import authRouter from '../routes/auth/auth.router';
import sqlRouter from '../routes/sql/sql-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/sql' , authMw , sqlRouter);

// Export default
export default apiRouter;
