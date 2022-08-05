import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config()



// Errors
const errors = {
    validation: 'JSON-web-token validation failed.',
} as const;

// Constants
const secret = (process.env.PRIVATE_KEY || 'test'),
    options = {
        algorithm: 'RS256'
    };


// Types
type TDecoded = string | JwtPayload | undefined;



/**
 * Encrypt data and return jwt.
 *
 * @param data
 */
function sign(data: JwtPayload): Promise<string> {
    return new Promise((resolve, reject) => {

        jsonwebtoken.sign(data, process.env.PRIVATE_KEY , { algorithm: 'RS256' }, (err, token) => {
            err ? reject(err) : resolve(token || '');
        });

    });
}


/**
 * Decrypt JWT and extract client data.
 *
 * @param jwt
 */
function decode(jwt: string): Promise<TDecoded> {
    
    return new Promise((res, rej) => {

        jsonwebtoken.verify(jwt, process.env.PUBLIC_KEY , (err, decoded) => {
            return err ? rej(errors.validation) : res(decoded);
        });
    });
}



// Export default
export default {
    sign,
    decode,
}
