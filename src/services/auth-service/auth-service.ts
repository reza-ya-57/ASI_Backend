import jwtUtils from '../../utils/jwt-utils';
import sql from 'mssql';



/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async function login(email: string, password: string): Promise<string> {

    const user = {
        id: 1,
        email: 'rezaayaari@gamil.com',
        name: 'reza',
        role: 'admin',
    }

    // var config = {
    //     server: 'localhost',
    //     user: 'sa',
    //     password: 'reza9045235360',
    //     database: 'BikeStores',
    //     pool: {
    //       max: 10,
    //       min: 0,
    //       idleTimeoutMillis: 30000
    //     },
    //     options: {
    //       trustServerCertificate: true // change to true for local dev / self-signed certs
    //     }
    //   }
  
    //   try {
    //     // make sure that any items are correctly URL encoded in the connection string
    //     await sql.connect(config)
    //     const result = await sql.query`SELECT * FROM production.brands`
    //     console.dir(result)
    //    } catch (err) {
    //     // ... error checks
    //    }
    // Setup Admin Cookie
    return jwtUtils.sign({
        id: user.id,
        email: user.name,
        name: user.name,
        role: user.role,
    });
}


// Export default
export default {
    login,
} as const;
