import { Request, Response, Router } from 'express';
import authService from '../../services/auth-service/auth-service';
import sql from 'mssql';


// Constants
const router = Router();

// Paths
export const p = {
    login: '/login',
    logout: '/logout',
} as const;



// Login a user.
router.post(p.login, async (req: Request, res: Response) => {
    // Check email and password present

    const { userName, password } = req.body;

    if (!(userName && password)) {
        throw new Error('invalid');
    }

    var config = {
        server: '192.168.5.54',
        user: 'CCMSAdmin',
        password: '1213141516171819',
        database: 'ASI',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustServerCertificate: true, // change to true for local dev / self-signed certs
            encrypt: false,
        }
    }

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query`EXEC [Base].[LogIn] @UserName = ${userName} , @password = ${password}`
        console.dir(result)
        console.log(result.recordset)

        if (result) {
            // Get jwt
            const jwt = await authService.login(userName, password);

            return res.status(200).json({
                ...result.recordset[0],
                token: jwt
            });
        }
        // res.json(result.recordset)
    } catch (err) {
        // ... error checks
        return res.status(401).json({
            isSuccess: true,
            message: 'somthing went wrong'
        })
    }



});



// Export router
export default router;
