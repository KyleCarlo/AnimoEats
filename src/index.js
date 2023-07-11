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
    res.render("sign-up");
})

app.get("/login", function(req, res){
    res.render("login");
})

app.get("/forgotpassword", function(req,res){
    res.render("forgotpassword");
})

app.get("/profile", function(req,res){
    res.render("profile");
})

app.post ("/sign-up", async(req,res)=>{
    const today = new Date();
    const data= {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.emailSignUp,
        password: req.body.passwordSignUp
        // helpfulCount: 0,
        // reviewCount: 0,
        // photoCount: 0, 
        // dateMade: today.getDate(),
        // biography: null,
        // profilepic: null
    }

    // give the data to MongoDB
    await User.insertMany([data]) 
    res.render("profile", {firstname:data.firstname});  
        // lastname: data.lastname, 
        // helpfulcount:data.helpfulCount, 
        // reviewcount: data.reviewCount,
        // photocount: data.photoCount,
        // date: data.dateMade,  
        // biography: data.biography
        // profilepic: data.profilepic
})

app.post ("/login", async(req,res)=>{
    try{
        const check = await User.findOne({email:req.body.emailLogIn})
        const email = req.body.emailLogIn;
        if(check.password === req.body.passwordLogIn){
            User.findOne({ email: email })
                .then((user) => {
                const data = {
                    firstname: user.firstName,
                    lastname: user.lastName,
                    helpfulcount: user.helpfulCount,
                    reviewcount: user.reviewCount,
                    photocount: user.photoCount,
                    date: user.dateMade,
                    biography: user.biography
                    // profilepic: user.profilepic
                };
                    console.log(data.firstName);
                    res.render('profile', {firstname: user.firstName});
                })
                .catch((error) => {
                    res.send('Error retrieving user data');
                });
        } else {
        res.send('Invalid Login Credentials');
        }
  } catch {
    res.send('Invalid Login Credentials');
  }
});


app.listen(3000,function(){
    console.log("port connected");
});

