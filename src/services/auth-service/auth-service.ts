import jwtUtils from '../../utils/jwt-utils';
import sql from 'mssql';



/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async function login(obj : any): Promise<string> {

    return jwtUtils.sign({
       ...obj
    });
}


// Export default
export default {
    login,
} as const;
