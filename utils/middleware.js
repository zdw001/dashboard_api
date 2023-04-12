const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  verifyProtectedRoute: (req, res, next) => {
    try {
      jsonwebtoken.verify(req.header('authorization').split(' ')[1], process.env.JWT_SECRET);  
      
      next();
    } catch (error) {
      res.status(400).json({'msg': 'Invalid token.'});
    }
  }
} 