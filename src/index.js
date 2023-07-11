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

// app.get("/", function(req, res){
//     res.render("login");
// });

app.get("/sign-up", function(req,res){
    console.log('signing-up');
    // res.send('<h1>hello</h1>');
    res.render("sign-up");   
})

// app.get("/login", function(req, res){
//     res.render("login");
// })

// app.get("/forgotpassword", function(req,res){
//     res.render("forgotpassword");
// })

app.post ("/sign-up", async(req,res)=>{
    const today = new Date();
    const data= { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.emailSignUp,
        password: req.body.passwordSignUp,
        helpfulCount: 0,
        reviewCount: 0,
        photoCount: 0,
        monthMade: today.getMonth() + 1,
        dateMade: today.getDate(),
        yearMade: today.getFullYear(),
        biography: "The user has not yet set a biography."
    }

    console.log(typeof data.firstName);

    await User.insertMany([data]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];

    var dateString = months[data.monthMade-1] + " " + data.dateMade + ", " + data.yearMade;

    console.log('success');
    
    res.render("profile", {
        firstName: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
        helpfulCount: data.helpfulCount,
        reviewCount: data.reviewCount,
        photoCount: data.photoCount,
        dateMade: dateString,
        biography: data.biography
    })
});

// app.post ("/login", async(req,res)=>{
//     try{
//         const check = await User.findOne({email:req.body.emailLogIn})
//         const email = req.body.emailLogIn;
//         if(check.password === req.body.passwordLogIn){
//             User.findOne({ email: email })
//                 .then((user) => {
//                 const data = {
//                     firstname: user.firstName,
//                     lastname: user.lastName,
//                     helpfulcount: user.helpfulCount,
//                     reviewcount: user.reviewCount,
//                     photocount: user.photoCount,
//                     date: user.dateMade,
//                     biography: user.biography
//                     // profilepic: user.profilepic
//                 };
//                     console.log(data.firstName);
//                     res.render('profile', {firstname: user.firstName});
//                 })
//                 .catch((error) => {
//                     res.send('Error retrieving user data');
//                 });
//         } else {
//         res.send('Invalid Login Credentials');
//         }
//   } catch {
//     res.send('Invalid Login Credentials');
//   }
// });


app.listen(3000,function(){
    console.log("port connected");
});

