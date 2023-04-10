const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const salt = 10;

const port = process.env.PORT || 8080;
const app = express();

require('dotenv').config();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.set('trust proxy', 1);

const JWT_SECRET=process.env.JWT_SECRET;
const DB_CONNECT=process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port,() => {
    console.log(`Command Center running on port ${port}`);
})

///////// ROUTES //////////////
const signUp = require('./auth/signUp');
const signIn = require('./auth/signIn');


////////// MIDDLEWARE ////////////
const { verifyProtectedRoute } = require('./utils/middleware');

app.get('/', verifyProtectedRoute, (req, res) => res.send('Hello World!'));
app.post('/sign-up', signUp.main);
app.post('/sign-in', signIn.main);

const httpServer = require('http').createServer(app);






