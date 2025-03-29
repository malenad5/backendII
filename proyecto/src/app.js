import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan'
import { conectDB, configObject } from './config/index.js'
import { sessionsRouter } from './router/sessions.router.js'
import {viewsRouter} from './router/views.router.js'
import usersRouter from './router/users.router.js';
import productsRouter from './router/products.router.js'
import cartRouter from "./router/cart.router.js";
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import { initializePassport } from './config/passport.config.js'
import passport from 'passport'


const app  = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = configObject.port
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(cookieParser('CoderPalab@S3cret@'))


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'hbs');

// extención de las plantillas
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')));

initializePassport()
app.use(passport.initialize())


// app.use()

conectDB()

//app.get('/', (req, res)=>{
  //  res.send('bienvenidos al proyecto final')
//})

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use("/api/carts", cartRouter);


app.listen(PORT, ()=>{
    console.log(`escuchando server en puerto ${PORT}`)    
})