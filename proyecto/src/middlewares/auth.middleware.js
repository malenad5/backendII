/*
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../utils/authToken.js'

export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] // Bearer añsdkflñaskdfñas(token)
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, userDataDecode) => {
        if(error) return res.send({status: 'success', error: 'no atuhorized'})
            console.log(userDataDecode)
        req.user = userDataDecode
        next()

    })
}
*/

import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../utils/authToken.js';

// Middleware para verificar el token JWT y agregar datos de usuario a la solicitud
export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Bearer <token>
    if (!authHeader) return res.status(401).send({ status: 'error', message: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, userDataDecode) => {
        if (error) return res.status(403).send({ status: 'error', message: 'Token inválido' });

        console.log('Datos del usuario:', userDataDecode);
        req.user = userDataDecode; // Adjunta la información decodificada al objeto req
        next();
    });
};

// Middleware para autorizar acceso según el rol del usuario
export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Verifica si el usuario tiene un rol
        if (userRole !== requiredRole) {
            return res.status(403).send({
                status: 'error',
                message: `Acceso denegado: Se requiere rol de ${requiredRole}`
            });
        }
        next();
    };
};
