const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const salt = 10;

const port = process.env.PORT || 8080;
const app = express();

require('dotenv').config();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET=process.env.JWT_SECRET;
const DB_CONNECT=process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port,() => {
    console.log(`Command Center running on port ${port}`);
})

//////// AUTH /////////////
const verifyToken = (token)=>{
    try {
        const verify = jwt.verify(token, JWT_SECRET);

        if (verify.type === 'user') return true;
        else return false;
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}

/////////// MIDDLEWARE ////////////
const verifyProtectedRoute = (req, res) => {
    console.log(req.cookies);
}

//////// SCHEMAS ///////////////
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection:'users'
});

const User = mongoose.model("User",userSchema);


///////// ROUTES //////////////
const signUp = require('./auth/signUp');
const signIn = require('./auth/signIn');

app.get('/', verifyProtectedRoute, (req, res) => res.send('Hello World!'));
app.post('/sign-up', signUp.main);
app.post('/sign-in', signIn.main);











const httpServer = require('http').createServer(app);

app.set('trust proxy', 1);






