import { Request, Response, Router } from 'express';
import authService from '../../services/auth-service/auth-service';
import sql from 'mssql';
import { LoginSchema } from '../../models/auth/authSchema';


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
router.post(p.login, async (req: Request, res: Response) => {
    // Check email and password present
    try {
        const { value } = LoginSchema.validate({ ...req.body })
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
            throw new Error('نام کاربری یا پسورد اشتباه است')
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err?.message
        })
    }




    // try {
    //     // make sure that any items are correctly URL encoded in the connection string

    //     }
    //     // res.json(result.recordset)
    // } catch (err) {
    //     // ... error checks
    //     return res.status(401).json({
    //         isSuccess: true,
    //         message: 'somthing went wrong'
    //     })
    // }



});



// Export router
export default router;
