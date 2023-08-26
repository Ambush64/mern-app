const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hasing the pw
// pre has 2 methods (type of event,callback)
// we need next cuz its a middle ware
userSchema.pre("save", async function (next) {
  // is modified is like which data changes so that i run the if func

  if (this.isModified("password")) {
    // call the save method only when the password changes
    // hash has 2 para current pw,number (salt len)

    // this.tokens here is for the database (this refers t the db)
    // for targeting db.password
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

// generating token
//  userschema is an instance so for working with userschema we need
// to use the method (methods)

userSchema.methods.generateAuthToken = async function () {
  try {
    // sign(payload,secretkey)
    let tokenGenerate = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

    // adding token to db
    // this.tokens is for the tokens in db

    // this.tokens here is for the database (this refers t the db)
    // this.tokens is db.tokens
    this.tokens = this.tokens.concat({ token: tokenGenerate });
    await this.save();
    return tokenGenerate;
  } catch (error) {
    console.log(error);
  }
};

// storing message from contact.js
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    // this.tokens here is for the database (this refers t the db)
    // we r targeting the messages field
    this.messages = this.messages.concat({ name, email, phone, message });

    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
