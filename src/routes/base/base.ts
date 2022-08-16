import { Router, Request, Response } from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';
import jwtUtils from '../../utils/jwt-utils';
import { DBError } from '../../errors/dbError/DbError';
import { logger } from '../../logs/winston/winston.config';

dotenv.config()


// Chat router
const router = Router();

// Paths
export const p = {
    schedule: '/get-schedule',
} as const;


router.get(p.schedule, async (req: Request, res: Response) => {
    try {
        console.log(req)

        let jwt = req.headers.authorization.split(' ')[1];
        let decodedJwt : any = await jwtUtils.decode(jwt);
        console.log(decodedJwt.UserId);
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(process.env.DB_STRING)
        const result = await sql.query`EXEC [Base].[GetSchedule]  @PersonId = ${decodedJwt?.UserId}`
        if (!result.recordset) {
            throw DBError;
        }

        return res.status(200).json({
            schedule: result.recordset
        })

    } catch (err) {
        // ... error checks
        return res.status(err?.statusCode).json({
            message: err?.message
        })
    }
});




// Export router
export default router;
