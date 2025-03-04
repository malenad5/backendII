import { Router } from 'express';
import { userModel } from '../models/users.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/authToken.js';
import { passportCall } from '../middlewares/passportCall.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

// register y login sin passport solo con jwt
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);

    // validación si llegan los campos importantes
    if (!email || !password) return res.status(400).send({ status: 'error', error: 'email y password son obligatorios' });

    // validar usuario único - control de error 
    const userFound = await userModel.findOne({ email });
    if (userFound) return res.status(401).send({ status: 'error', error: 'El usuario ya existe' });

    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password) // encriptar
    };

    const result = await userModel.create(newUser);
    res.send({ status: 'success', payload: result });
});

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // validación si llegan los campos importantes
    if (!email || !password) return res.status(400).send({ status: 'error', error: 'email y password son obligatorios' });

    // fue a la base de datos y volvio
    const userFound = await userModel.findOne({ email });
    if (!userFound) return res.status(401).send({ status: 'error', error: 'El usuario no existe' });

    
    if (!isValidPassword(password, userFound.password)) return res.status(401).send({ status: 'error', error: 'El email o la contraseña no coinciden' });

    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        role: userFound.role
    });

    res
        .cookie('coderCookieToken', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })
        .send({ status: 'success', message: 'Inicio de sesión exitoso' });
});

// current
router.get('/current', passportCall('jwt'), authorization('admin'), (req, res) => {
    console.log(req.user);
    res.send({ status: 'success', payload: req.user });
});

export const sessionsRouter = router;