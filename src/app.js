import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';
import usersRouter from "./routes/users.router.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());

mongoose.connect("mongodb+srv://coderuser:coder1234@cluster0.94j5za2.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));


initializePassport();
app.use(passport.initialize());


app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');




app.use('/', viewsRouter);


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Start server in PORT ${PORT}`);
});


const io = new Server(httpServer);

websocket(io);
