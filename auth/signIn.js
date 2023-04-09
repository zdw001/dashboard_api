// user login function
const verifyUserLogin = async (email,password)=>{
  try {
      const user = await User.findOne({email}).lean()
      if(!user){
          return {status:'error',error:'user not found'}
      }
      if(await bcrypt.compare(password,user.password)){
          // creating a JWT token
          token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
          return {status:'ok',data:token}
      }
      return {status:'error',error:'invalid password'}
  } catch (error) {
      console.log(error);
      return {status:'error',error:'timed out'}
  }
};


exports.main = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  // we made a function to verify our user login
  const response = await verifyUserLogin(email,password);
  
  if(response.status==='ok'){
      // storing our JWT web token as a cookie in our browser
      res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
      res.redirect('/');
  }else{
      res.json(response);
  }
};
