const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

exports.main = async (req, res) => {
  console.log('---------- addWebsite ---------');
  const {
    website
  } = req.body;

  try {
    let decoded = jsonwebtoken.verify(req.header('authorization').split(' ')[1], process.env.JWT_SECRET);

    let user = await User.findById(decoded.id);
    user.websites.push(website);
    await user.save();

    res.status(200).json({'msg': 'Successfully added website.', user: user})
  } catch (error) {
    console.log(error)

    res.status(400).json({'msg': 'Invalid token.'});
  }
};
