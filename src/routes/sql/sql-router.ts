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
    // config for your database
    var config = {
      server: 'localhost',
      user: 'sa',
      password: 'reza9045235360',
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

    try {
      // make sure that any items are correctly URL encoded in the connection string
      await sql.connect(config)
      const result = await sql.query`SELECT *FROM [SI_Dashboard].[Auth].[User]`
      console.dir(result)
      res.json(result.recordset[0])
     } catch (err) {
      // ... error checks
     }
});




// Export router
export default router;
