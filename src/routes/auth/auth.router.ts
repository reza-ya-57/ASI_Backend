import { Request, Response, Router } from 'express';
import authService from '../../services/auth-service/auth-service';
// validate
import { LoginSchema } from '../../models/auth/authSchema';
// error
import { DBError } from '../../errors/DbError/DbError';
// logger
import { logger } from '../../logs/winston/winston.config';

import sql from 'mssql';



// Constants
const router = Router();

// Paths
export const p = {
    login: '/login',
} as const;


// Login a user.
router.post(p.login, async (req: Request, res: Response) => {
    try {
        // validate body
        const { error, value } = LoginSchema.validate({ ...req.body });
        if (error) {
            Object.assign(error, { statusCode: 400 });
            throw error;
        };
        // deconstruct body
        const { username, password } = value;

        // connect to db
        await sql.connect(process.env.DB_STRING)
        // const pool = new sql.ConnectionPool(process.env.DB_STRING)
        // excute store procedure
        const result = await sql.query`EXEC [Base].[LogIn] @UserName = ${username} , @password = ${password}`

        if (result.recordset) {
            const jwt = await authService.login(result.recordset[0]);
            return res.status(200).json({
                ...result.recordset[0],
                token: jwt
            });
        }
        else {
            throw new DBError('نام کاربری یا پسورد اشتباه است')
        }
    }
    catch (err) {
        logger.error(err.stack)
        return res.status(err?.statusCode).json({
            message: err?.message
        })
    }

});



// Export router
export default router;
