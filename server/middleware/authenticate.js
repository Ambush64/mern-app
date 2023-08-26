const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// here we need to verify the user's jwt token

// see  steps below

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // compare the token (ie token ) with the secret key

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // using the verify token we get all the details of the user


    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    // req.token is used in the frontend to get the user id
    req.token = token;
    // here (in rootUser) we have all the data of the user
    // if we request for rootUser in our app we will have all the details of the rootuser
    req.rootUser = rootUser;

    req.userID = rootUser._id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("unauthorized: no tokens sent");
  }
};

// steps
// 1. get the token
// 2. verify the token
// 3. store which user's token was it in rootUser
// 4. if user isn't found throw error

module.exports = authenticate;
