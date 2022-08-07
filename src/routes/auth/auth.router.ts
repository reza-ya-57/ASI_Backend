import { Request, Response, Router } from 'express';
import authService from '../../services/auth-service/auth-service';
// validate
import { LoginSchema } from '../../models/auth/authSchema';
// error
import { DBError } from '../../errors/DbError/dberror';
import sql from 'mssql';
import fs from 'fs';
import domain from 'domain'
import path from 'path';


// Constants
const router = Router();

// Paths
export const p = {
    login: '/login',
    logout: '/logout',
} as const;

const config = {
    server: 'rezayari.ir',
    user: 'sa',
    password: 'reza@1618033988',
    database: 'SI_Dashboard',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}




// Login a user.
router.
post(p.login, async (req: Request, res: Response) => {

    try {
        const { error , value } = LoginSchema.validate({ ...req.body });
        if (error) {
            Object.assign(error , { statusCode: 400 });
            throw error;
        };
        const { username, password } = value;
        
        await sql.connect(config)
        const result = await sql.query`EXEC [Auth].[LogIn] @UserName = ${username} , @password = ${password}`
        if (result.recordset) {
            const jwt = await authService.login(result.recordset[0]);
            return res.status(200).json({
                ...result.recordset[0],
                token: jwt
            });
        } else {
            throw new DBError('نام کاربری یا پسورد اشتباه است')
        }
    }
    catch (err) {
        // console.log(err)
        // fs.writeFile('../../logs/log.txt' , err.message , err => {
        //     console.log(err)
        // })
        return res.status(err?.statusCode).json({
            message: err?.message
        })
    }

});



// Export router
export default router;
