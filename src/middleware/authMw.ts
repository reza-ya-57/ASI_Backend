import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwt-utils';


// Constants
const jwtNotPresentErr = 'JWT not present in signed cookie.';


/**
 * Middleware to verify if user is an admin.
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function authMw(req: Request, res: Response, next: NextFunction) {
    
    try {
        // Get json-web-token
        // const jwt = req.signedCookies[cookieProps.key];
        let jwt;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt = req.headers.authorization.split(' ')[1];
        } else {
            throw Error(jwtNotPresentErr)
        }
        
        // if (!jwt) {
        //     throw Error(jwtNotPresentErr);
        // }
        // Make sure user role is an admin
        
        const clientData = await jwtUtil.decode(jwt);
        console.log(clientData)
        if (!!clientData) {
            res.locals.sessionUser = clientData;
            next();
        } else {
            throw Error(jwtNotPresentErr);
        }
    } catch (err) {
        return res.status(401).json({
            error: err.message,
        });
    }
};
