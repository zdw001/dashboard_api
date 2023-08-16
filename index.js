const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const salt = 10;

const port = process.env.PORT || 8085;
const app = express();

require('dotenv').config();

app.use(bodyparser.urlencoded({extended:true}));
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
const addWebsite = require('./core/addWebsite');
const deleteWebsite = require('./core/deleteWebsite');
const editWebsite = require('./core/editWebsite');

////////// MIDDLEWARE ////////////
const { verifyProtectedRoute } = require('./utils/middleware');

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/sign-up', signUp.main);
app.post('/sign-in', signIn.main);
app.get('/get-session', verifyProtectedRoute, getSession.main);
app.post('/add-website', verifyProtectedRoute, addWebsite.main);
app.post('/delete-website', verifyProtectedRoute, deleteWebsite.main);
app.post('/edit-website', verifyProtectedRoute, editWebsite.main);

const httpServer = require('http').createServer(app);






