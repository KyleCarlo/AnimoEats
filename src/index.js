// import {ReviewCardSelf} from "../views/components/review-card-self.js";
// // const ReviewCardSelf = reqyure("../views/components/review-card-self.js");
// window.customElements.define("review-card-self", ReviewCardSelf);

const express = require("express");
const app = express();
const hbs = require("hbs");
const bodyParser =  require("body-parser");
const {User, Review} = require('./app');
const exphbs = require("express-handlebars");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine("hbs", exphbs.engine({extname:'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

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

app.get("/edit-profile", function(req, res){
    res.render("edit-profile");
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
        rememberMeToken:null
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
            const data = {
              firstName: user.firstName,
              lastName: user.lastName,
              helpfulCount: user.helpfulCount,
              reviewCount: user.reviewCount,
              photoCount: user.photoCount,
              dateMade: user.dateMade,
              biography: user.biography
              // profilepic: user.profilepic
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


app.listen(3000,function(){
    console.log("port connected");
});

