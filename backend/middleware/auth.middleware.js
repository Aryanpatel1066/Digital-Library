 const jwt = require("jsonwebtoken");
const user_model = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("access-token-key");
    if (!token) {
      return res.status(401).send({ message: "Unauthorized: No token found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized: Invalid token" });
      }

      const user = await user_model.findById(decoded.id); // ✅ fixed here
      if (!user) {
        return res.status(401).send({ message: "Unauthorized: No user found" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    res.status(500).send({ message: "Internal server error in token verification" });
  }
};
const verifyBody = async (req,res,next)=>{
      const { name, email, password } = req.body|| {};

  try{
    if(!name){
       return res.status(401).send({ message: "username name not provided" });
    }
     if(!email){
       return res.status(401).send({ message: "email name not provided" });
    } if(!password){
       return res.status(401).send({ message: "password name not provided" });
    }
    if(password.length < 6){
        return res.status(401).send({ message: "password length is more than 6 " }); 
      }
      //check if password is allredy exist
      const user = await user_model.findOne({email});
      if(user){
        return res.status(401).send({message:"the emaill id allredy present"})
      }
     
      next()
  }
  catch(err){
    console.log("error while verifying body");
    res.status(500).send({message:"error while verify body"})
  }
}
 
module.exports ={ verifyToken,verifyBody};
