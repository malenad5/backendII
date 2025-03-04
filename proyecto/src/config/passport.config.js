import passport from 'passport';
import { Strategy as JWTSrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { userModel } from '../models/users.model.js';
import { PRIVATE_KEY } from '../utils/authToken.js';



export const initializePassport = () => {
    // passport internamente no captura cookies
    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['coderCookieToken'];
        }
        return token;
    }

    // configuración de estrategia
    passport.use('jwt', new JWTSrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (dataFromToken, done) => {
        console.log('data from token: ', dataFromToken);
        try {
            return done(null, dataFromToken);
        } catch (error) {
            done(error);
        }
    }));
}