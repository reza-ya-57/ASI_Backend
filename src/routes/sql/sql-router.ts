import { Router, Request, Response } from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config()


// Chat router
const router = Router();

// Paths
export const p = {
    fetch: '/fetch',
} as const;



/**
 * Connect to socket room.
 */
router.get(p.fetch, async (req: Request, res: Response) => {

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
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }

    try {
      // make sure that any items are correctly URL encoded in the connection string
      await sql.connect(config)
      const result = await sql.query`SELECT * FROM [ASI].[Base].[Province]`
      console.dir(result)
      res.json(result.recordset[0])
     } catch (err) {
      // ... error checks
     }
});




// Export router
export default router;
