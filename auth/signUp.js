const bcrypt = require("bcrypt");
const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

exports.main = async (req, res) => {
    console.log('---------- signUp ---------')
   // geting our data from frontend
   const {
        username, 
        password,
    } = req.body;

    const salt = 10;

    // encrypting our password to store in database
    const hashedPass = await bcrypt.hash(password, salt);

    try {
        // storing our user data into database
        const user = await User.create({
            username,
            password: hashedPass,
            profile: {},
            settings: {},
            websites: []
        });

        console.log(user)

        user.save();

        let token = jsonwebtoken.sign({
            id: user._id,
            username: user.username,
            type:'user'
        }, 
        process.env.JWT_SECRET,
        { 
            expiresIn: '24h'
        });

        res.status(200).json({'msg': 'User successfully created.', user: user, token: token})
    } catch (error) {
        console.log(JSON.stringify(error));

        res.status(400).json({'msg': 'Bad Request'});
    }
};
