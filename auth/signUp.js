
exports.main = async (req, res) => {
   // geting our data from frontend
   const {
    email, 
    password: plainTextPassword,
    
  } = req.body;

   // encrypting our password to store in database
   const password = await bcrypt.hash(plainTextPassword,salt);

   try {
       // storing our user data into database
       const response = await User.create({
           email,
           password
       })
       return res.redirect('/');
   } catch (error) {
       console.log(JSON.stringify(error));

       if(error.code === 11000){
           return res.send({status:'error',error:'email already exists'})
       }
       throw error
   }
};
