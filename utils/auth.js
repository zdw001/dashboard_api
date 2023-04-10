//////// AUTH /////////////
module.exports = {
  verifyToken: (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);

        if (verify.type === 'user') return true;
        else return false;
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
  }
}