const express = require("express");
const app = express();
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");


// middleware
// middleware's r fr sending the data through em first it will go to middleware and then
// the next func
// it takes 3 params (req,res,next)

// to use a middleware use it in bw the get func bw the path & the params


// storing data in db
// using async
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill in the required fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email is duplicate " });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      // hashing using bcryptjs
      // hashing(difficult to restore) and encryption(you can restore using decryption) is different

      // we need to hash the pw b4 save to ie pre save
      // u can call it middleware
      // see userschema

      await user.save();
      res.status(201).json({ message: "user registered" });
    }
  } catch (err) {
    console.log(err);
  }

});

// using promises
// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Plz fill in the required fields" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email is duplicate" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered" });
//         })
//         .catch(() => {
//           res.status(500).json({ message: "user not registered" });
//         });
//     })
//     .catch((err) => console.log("user already exists"));

//   console.log(req.body.name);
//   //   or
//   console.log(name);
//   //   res.json({ message: req.body });
// });

// router.get("/contact", (req, res) => {
//   res.send("Hello contact!");
// });

// login
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userExist.generateAuthToken();

        // res.cookie(name ,value,[options])
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true, 
            sameSite: 'None', 
            domain: 'http://localhost/', 
        });


        res.status(200).json({ message: "login successful" });
        console.log("Login Successful");
      }
    } else {
      // never give invalid email or invalid pass cuz hacker can easily guess
      res.status(400).json({ error: "Invalid Credentials" });
    }
    //   if (!isMatch) {
    //     return res.status(404).json({ message: "invalid credentials" });
    //   } else {
    //     res.json({ message: "user signed in" });
    //     token = await userLogin.generateAuthToken();

    //     res.cookie("jwtoken", token, {

    //       expires: new Date(Date.now + 25892000000),
    //       httpOnly: true,
    //     });
    //     console.log("Login Successful");
    //   }
    // } else {
    //   // never give invalid email or invalid pass cuz hacker can easily guess
    //   return res.status(404).json({ message: "invalid credentials" });
    // }
  } catch (err) {
    console.log(err);
  }

  //   if (!userLogin) {
  //     res.status(404).json({ message: "user error" });
  //   } else {
  //     res.json({ message: "user signed in" });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});

// about us page
// for authentication we use middlewares(ie authenticate)
router.get("/about", authenticate, (req, res) => {
  // req.rootUser is the rootUser we have stored in rootUser in authenticate
  // req.rootUser = rootUser;
  // and then we r sending the rootUser to the frontend whenever the req is made

  // res.send req.rootUser is shown in the network tab in the response tab
  res.send(req.rootUser);
});

// get user data for contact and home page
router.get("/getdata", authenticate, (req, res) => {
  // and then we r sending the rootUser to the frontend whenever the req is made
  // res.send("This is about page");
  res.send(req.rootUser);
});

// contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = await req.body;

    if ((!name, !email, !phone, !message)) {
      console.log("error in backend contatc");
      return res.json({ error: "pls fill the fields" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "User Contact saved" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout
router.get("/logout", (req, res) => {
  // we login using verifying the cookie

  // so logout can be done by deleting the cookie
  res.clearCookie("jwtoken", {
    // where to redirect after logout (path)
    path: "/",
  });
  res.status(200).send("User Logout");
});

module.exports = router;

// {
//   "name":"bil",
//   "email":"yes@gmail.com",
//   "phone":"987654321",
//   "work":"yes js",
//   "password":"dis",
//   "cpassword":"dis"
// }

// {
//   "email":"yesds@gmail.com",
//   "password":"dis"
// }

// ====================================================================
// create json web token

// const createToken = async () => {
//   // sign(obj(payload),string(secret key),expiry date like when the user should be automatically logged out ie 30days etc)
//   // payload is body data
//   // in mongo _id is payload
//   const token = await jwt.sign(
//     { _id: "6227929a053677b4074a4b6d" },
//     "hellohellohellohellohellohellohellohellohello",
//     {
//       expiresIn: "2 seconds",
//     }
//   );
//   // token will be as eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI3OTI5YTA1MzY3N2I0MDc0YTRiNmQiLCJpYXQiOjE2NDY3NjA2MTd9.yXJofH7h3P39NpUKCk-acOVwc4AfzxLqzPFF0Pz_NHM
//   // the first part is header (algorithm)& typeof(jwt),second is payload(body data), third is when was it issued
//   // the parts are divided using dots
//   // in this server wont have any data so ie called stateless
//   console.log(token);

//   // verify user
//   // verify(token we created, secret key)
//   const userVerify = await jwt.verify(
//     token,
//     "hellohellohellohellohellohellohellohellohello"
//   );
//   console.log(userVerify);
// };

// createToken();

// cookies
// res.cookie(name ,value,[options])

// res.cookie("jwt",token,{
//   // when u wanna expire
//   expires: new Date(date.now()+3000)
//   httpOnly:true // client side cant do any edit
// })
