import { Request, Response, Router } from 'express';
import authService from '../../services/auth-service/auth-service';


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
    const { email, password } = req.body;
    if (!(email && password)) {
        throw new Error('invalid');
    }
    // Get jwt
    const jwt = await authService.login(email, password);

    return res.status(200).json({
        token: jwt
    });
});



// Export router
export default router;
