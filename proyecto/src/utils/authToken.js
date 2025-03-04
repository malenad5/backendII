import jwt from 'jsonwebtoken';

export const PRIVATE_KEY = 'askdfaskfdas.--%$klaskdfj';

export const generateToken = (userData) => jwt.sign(userData, PRIVATE_KEY, { expiresIn: '1d' });

export const authToken = (token) => {
    // Lógica para manejar el token
    // Por ejemplo, verificar el token
    try {
        return jwt.verify(token, PRIVATE_KEY);
    } catch (error) {
        return null;
    }
};