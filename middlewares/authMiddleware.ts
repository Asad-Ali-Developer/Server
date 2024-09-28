import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import userModel from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();



interface DecodedToken {
    email?: string;
    // Add other fields if necessary
}


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, 'tenant-data-record') as DecodedToken;

        if (decoded.email) {
            // Fetch user based on decoded email
            const userLogged = await userModel
                .findOne({ email: decoded.email })
                .select('-password');

            if (userLogged) {
                req.user = userLogged; // Attach user to request object

            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Authorization error:', error);
        res.status(401).json({ error: 'Token verification failed' });
    }
};

export default authMiddleware;
