require('dotenv').config()
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const port = process.env.PORT || 5123
const hostname = "127.0.0.1";
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
//Express App
const app = express();

//Mongoose setup
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
main().catch((err) => console.log(err));

console.log(process.env.MONGO_URI)
// SCHEMA
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, 'Name cannot more than 20 characters'],
    required: true,
  },
  email: {
    type: String,
    maxlength: [40, 'email cannot more than 40 characters'],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Hashing
clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

//Model
const Register = mongoose.model("Register", clientSchema);

//Setting Static and Views files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/Views"));
app.use('/', express.static("./public"));

// JSON Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Cookie Parser,Sessions and Flash
app.use(cookieParser("SecretCookieString"));
app.use(
  session({
    secret: "SecretSessionString",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Server
//Get
app.get("/", (req, res) => {
  res.status(200).render("login", { result: "" });
  console.log(process.env.MONGO_URI)

});
app.get("/register", (req, res) => {
  res.status(200).render("register", { result: "" });
});
app.get("/home", (req, res) => {
  const clientName = req.flash("Client");
  res.status(200).render("home", { clientName });
});
app.get('/change', (req, res) => {
  res.render('change', { result: 'Result' })
});

//Post
app.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_pass = req.body.confirm_password
    const Users = await Register.findOne({ email: email });
    if (Users == null) {
      //Get req
      const registerClient = new Register({
        name: name,
        email: email,
        password: password,
      });
      if (password === confirm_pass) {
        // Save
        await registerClient.save();
        console.log("successfully saved");
        res.status(200).redirect("/");
      } else {
        console.log("Password are not matching");
        res.status(200).render("register", { result: "Password and Confirm password must be same" });
      }

    } else if (Users.email == email) {
      console.log("This email has already been used");
      res.status(200).render('register', { result: "This email has already been used" });
    }
  } catch (err) {
    const message = err.errors
    if (message?.name?.message === 'Name cannot more than 20 characters') {
      return res.status(200).render('register', { result: message.name.message })
    } else if (message?.email?.message === 'email cannot more than 40 characters') {
      return res.status(200).render('register', { result: message.email.message })
    } else {
      return res.send('Cannot Register go back maybe database not found')
    }
  }
});
app.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const Users = await Register.findOne({ email: email });
    const Comparing = await bcrypt.compare(password, Users.password);
    if (Comparing) {
      const Username = Users.name;
      console.log("Signed in successfully");
      req.flash("Client", Username);
      res.status(200).redirect("/home");
    } else {
      console.log("Incorrect password");
      res
        .status(200)
        .render("login", { result: "Invalid password, please try again" });
    }
  } catch {
    console.log("No user with that email");
    res.status(200).render("login", { result: "No user with that email" });
  }
});
//Put
app.post('/change', async (req, res) => {
  try {
    const { email } = req.body
    const { old_password } = req.body
    const { new_password } = req.body
    const { confirm_password } = req.body
    const Users = await Register.findOne({ email })
    if (Users) {
      const Comparing = await bcrypt.compare(old_password, Users.password);
      if (Comparing) {
        if (new_password === confirm_password) {
          const hashedPass = await bcrypt.hash(new_password, 10)
          await Register.updateOne({ email }, { $set: { password: hashedPass } })
          return res.redirect('/')
        } else {
          console.log('New Password and Confirm Password must be same')
          return res.render('change', { result: 'New Password and Confirm Password must be same' })
        }
      } else {
        console.log('Incorrect old password')
        return res.render('change', { result: 'Incorrect old password' })
      }
    } else {
      console.log('Email  not found')
      return res.render('change', { result: 'Email not found' })
    }
  } catch {
    console.log('error')
    res.redirect('/change')
  }
})


app.listen(port, () => {
  console.log(`This server is listening on port http://${hostname}:${port}`);
});