const User = require('../schema/user');
const jsonwebtoken = require('jsonwebtoken');

exports.main = async (req, res) => {
  console.log('---------- deleteWebsite ---------');
  const {
    website_id
  } = req.body;

  try {
    let decoded = jsonwebtoken.verify(req.header('authorization').split(' ')[1], process.env.JWT_SECRET);

    let user = await User.findByIdAndUpdate(
      decoded.id, 
      {
        $pull: { websites: { website_id: website_id } },
      },
      { lean: true, new: true }
    );

    res.status(200).json({'msg': 'Successfully added website.', user: user})
  } catch (error) {
    console.log(error)

    res.status(400).json({'msg': 'Invalid token.'});
  }
};
