const bcrypt = require("bcrypt");
const User = require('../schema/user');

exports.main = async (req, res) => {
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
        const response = await User.create({
            username,
            password: hashedPass,
            profile: {},
            settings: {},
            websites: []
        })

        return  res.send({status: 200, message: 'User successfully created.'})
    } catch (error) {
        console.log(JSON.stringify(error));

        if(error.code === 11000){
            return res.send({status:'error',error:'username already exists'})
        }
        throw error
    }
};
