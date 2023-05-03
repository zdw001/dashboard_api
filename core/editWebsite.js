const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

exports.main = async (req, res) => {
  console.log('---------- editWebsite ---------');
  const {
    website
  } = req.body;

  try {
    let decoded = jsonwebtoken.verify(req.header('authorization').split(' ')[1], process.env.JWT_SECRET);

    let user = await User.findOneAndUpdate(
      { _id: decoded.id, 'websites.id': website.id },
      { $set: { 
        'websites.$.name': website.name,
        'websites.$.link': website.link,
        'websites.$.username': website.username,
        'websites.$.password': website.password,
        'websites.$.notes': website.notes,
        'websites.$.img': website.img
      }},
      { lean: true }
    );

    res.status(200).json({'msg': 'Successfully added website.', user: user})
  } catch (error) {
    console.log(error)

    res.status(400).json({'msg': 'Invalid token.'});
  }
};
