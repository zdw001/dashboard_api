const bcrypt = require("bcrypt");
const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

// user login function
const verifyUserLogin = async (username, password) => {
  console.log('username: ', username)
  console.log('password: ', password)
  try {
      const user = await User.findOne({username}).lean();

      if (!user) {
          return {err: true, msg: 'User not found.'}
      }

      if(await bcrypt.compare(password, user.password)){
          // creating a JWT token
          let token = jsonwebtoken.sign({
            id: user._id,
            username: user.email,
            type:'user'
          }, 
          process.env.JWT_SECRET,
          { 
            expiresIn: '24h'
          });

          return {token: token, user: user}
      }

      return {err: true, msg: 'Invalid password.'}
  } catch (error) {
      console.log(error);

      return {err: true,  msg: 'Timed out.'}
  }
};

exports.main = async (req, res) => {
  console.log('---------- signIn ---------')
  const {
    username,
    password
  } = req.body;

  // we made a function to verify our user login
  const response = await verifyUserLogin(username, password);

  console.log('response:')
  console.log(response);

  if (response.err) {
    res.status(400).json(response);
  } else {
    // storing our JWT web token as a cookie in our browser
    res.status(200).json({'user': response.user, 'token': response.token });
  }
};
