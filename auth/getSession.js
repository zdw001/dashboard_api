const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

exports.main = async (req, res) => {
  console.log('---------- getSession ---------');

  try {
    let decoded = jsonwebtoken.verify(req.header('authorization').split(' ')[1], process.env.JWT_SECRET);

    let user = await User.findById(decoded.id).lean();

    res.status(200).json({'msg': 'Session valid.', user: user})
  } catch (error) {
    console.log(error)

    res.status(400).json({'msg': 'Invalid token.'});
  }
};
