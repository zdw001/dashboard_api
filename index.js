const express = require('express');
var { expressjwt: jwt } = require("express-jwt");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const salt = 10;

const port = process.env.PORT || 8080;
const app = express();

require('dotenv').config();

app.use(bodyparser.urlencoded({extended:true}));
app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.set('trust proxy', 1);

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port,() => {
    console.log(`Command Center running on port ${port}`);
})

///////// ROUTES //////////////
const signUp = require('./auth/signUp');
const signIn = require('./auth/signIn');
const getSession = require('./auth/getSession');

////////// MIDDLEWARE ////////////
const { verifyProtectedRoute } = require('./utils/middleware');

app.get('/', verifyProtectedRoute, (req, res) => res.send('Hello World!'));
app.post('/sign-up', signUp.main);
app.post('/sign-in', signIn.main);
app.get('/get-session', getSession.main);

const httpServer = require('http').createServer(app);






