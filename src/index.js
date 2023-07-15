// import {ReviewCardSelf} from "../views/components/review-card-self.js";
// // const ReviewCardSelf = reqyure("../views/components/review-card-self.js");
// window.customElements.define("review-card-self", ReviewCardSelf);

const express = require("express");
const app = express();

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const hbs = require("hbs");
const bodyParser =  require("body-parser");
const {User, Review} = require('./app');
const exphbs = require("express-handlebars");
const path = require("path")

const multer = require("multer");
const { log } = require("console");
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'uploads')
    },
    filename: (req, file,cb)=>{
      console.log(file)
      cb(null, Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine("hbs", exphbs.engine({extname:'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/usersDB',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}));

app.get("/", function(req, res){
    res.render("login");
});

app.get("/sign-up", function(req,res){
    console.log('signing-up');
    // res.send('<h1>hello</h1>');
    res.render("sign-up");   
})

app.get("/login", function(req, res){
    res.render("login");
})

app.get("/forgotpassword", function(req,res){
    res.render("forgotpassword");
})

app.post ("/sign-up", async(req,res)=>{
    const today = new Date();
    const data= { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.emailSignup,
        password: req.body.passwordSignup,
        helpfulCount: 0,
        reviewCount: 0,
        photoCount: 0,
        monthMade: today.getMonth() + 1,
        dateMade: today.getDate(),
        yearMade: today.getFullYear(),
        biography: "The user has not yet set a biography.",
        profilepic: null
    }

    console.log(typeof data.firstName);

    await User.insertMany([data]);

    res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.emailLogin });
    console.log(check.password);
    if (check.password == req.body.passwordLogin) {
      User.findOne({ email: req.body.emailLogin })
        .then((user) => {
          if (!user) {
            // User not found
            res.send('User not found');
          } else {
            req.session.user = user;
            req.session.save();
            const data = {
              firstName: user.firstName,
              lastName: user.lastName,
              helpfulCount: user.helpfulCount,
              reviewCount: user.reviewCount,
              photoCount: user.photoCount,
              dateMade: user.dateMade,
              biography: user.biography,
              profilepic: user.profilepic
            };
             const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
            var dateString = months[user.monthMade - 1] + " " + user.dateMade + ", " + user.yearMade;
            console.log(data.firstName);
            res.render("profile", {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
              helpfulCount: user.helpfulCount,
              reviewCount: user.reviewCount,
              photoCount: user.photoCount,
              dateMade: dateString,
              biography: user.biography
            });
          }
     })
        .catch((error) => {
          console.error(error); // Log the error for debugging
          res.send('Error retrieving user data');
        });

    
    } else {
      res.render("login", {
        errorMessage: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.render("login", {
        errorMessage: 'Invalid credentials'
      });
  }
});

app.get("/edit-profile", function(req, res){
      const user = req.session.user;
      console.log(user.email);
      res.render("edit-profile");
})

app.post("/edit-profile", upload.single("profilePicture"), async (req, res) => {
  try {
      const user = req.session.user;
      console.log(user.email)
      if (user.profilepic == null){
        res.render("edit-profile", {profilePictureEdit: "assets/jpg/profile1.jpg", usernameorig: user.email})
      } else {
        imagePath = "uploads/"+ user.profilepic;
        res.render("/edit-profile", imagePath);
      }
      const firstName = req.body.firstNameEdit;
      const lastName = req.body.lastNameEdit;
      const username = req.body.userNameEdit;
      const description = req.body.descriptionEdit;
      const profilePicture = req.body.profilePicture;

      await user.save(); 

      res.redirect('/profile');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Failed to update user');
  }
});

// Route to handle logout
app.post('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy();
  res.send('Logged out successfully');
});



app.listen(3000,function(){
    console.log("port connected");
});

