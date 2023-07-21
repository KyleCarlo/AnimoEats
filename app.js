/**
 * Import dependencies
 * express, cors, body-parser, mongoose, hbs, session, multer
 */
import "dotenv/config";        //DOTENV
import express from "express"; //EXPRESS application
import cors from "cors";       //Cross-origin resource sharing
import path from "path";       //Path module for directory paths and files
import mongoose from "mongoose";    //Mongoose for MongoDB
import session from "express-session";      //Express-session for creating session
import bodyParser from "body-parser";       //Body-parser for parsing request bodies
import exphbs from "express-handlebars";    //Express-handlebars for templating
import MongoStore from "connect-mongo";     //Connect-mongo for storing session in MongoDB
import multer from "multer";        //Multer for file uploads
import cookieParser from "cookie-parser";
import {decode} from 'html-entities';
/**
 * Import local dependencies
 */
/**** MODELS ****/
import { connectToMongo } from "./db/conn.js";
import User from "./models/User.js";
import Restaurant from "./models/Restaurant.js";
import Review from "./models/Review.js";
/**** CONTROLLERS ****/
import componentsControl from "./controllers/componentsControl.js";
import indexControl from "./controllers/indexControl.js";
import signUpControl from "./controllers/signUpControl.js";
import logInControl from "./controllers/logInControl.js";
import logOutControl from "./controllers/logOutControl.js";
import profileControl from "./controllers/profileControl.js";
import forgotPasswordControl from "./controllers/forgotPasswordControl.js";
import storeControl from "./controllers/storeControl.js";
/**
 * Initiliaze express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use (cookieParser());
app.engine("hbs", exphbs.engine({extname:'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

/**** FILE UPLOAD ****/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let subFolder = '';
        if(req.route.path == '/edit-profile')
            subFolder = '/profiles';
        else if(req.route.path == '/submit-review')
            subFolder = '/reviews';

        cb(null, 'public/uploads' + subFolder);
    },
    filename: function (req, file, cb) {
        let fileName = Date.now(); //default filename
        let userName = req.session.user.email.split('@')[0];
        let origName = file.originalname.split('.')[0];
        
        if(req.route.path == '/edit-profile')
            fileName = userName;
        else if(req.route.path == '/submit-review')
            fileName += '-' + origName + '-' + userName;

        cb(null, fileName+path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage , limits : {fileSize : 10*1024*1024}});
const uploadReview = multer({ 
    storage: storage ,
    fileFilter: function (req, file, cb) {
        if (req.files && req.files.length >= 5) {
            return cb(new Error("Maximum number of files exceeded."));
        }
        cb(null, true);
    },
});

/**** SESSION ****/
const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/usersDB',
    ttl: 1 * 24 * 60 * 60,
    autoRemove: 'native'
});
app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 0, // Set the cookie to expire when the browser is closed
      expires: false,
      httpOnly: true, // Set HttpOnly flag
    },
}));

connectToMongo(()=>{
    console.log('Connected to MongoDB');
})

/**
 * Controller
 */
/**** COMPONENTS ****/
app.get('/side-bar', componentsControl.showSideBar);
app.get('/location-card', componentsControl.showLocationCard);
app.post('/store-prev', componentsControl.showStorePrev);
app.post('/resto-card', componentsControl.showRestoCard);
app.post('/review-card', componentsControl.showRevCard);
app.post('/create-review', componentsControl.showCreateRev);
app.post('/submit-review', uploadReview.array('revUploads', 5), componentsControl.submitCreateRev);

/**** HOME ****/
app.get("/", indexControl.showListRestaurants);
/**** SIGN UP ****/
app.get("/sign-up", signUpControl.showSignUpForm);
app.post("/sign-up", signUpControl.submitSignUpForm);
/**** LOG IN ****/
app.get("/login", logInControl.showLogInForm);
app.post("/login", logInControl.submitLogInForm);
/**** FORGOT PASSWORD ****/
app.get("/forgot-password", forgotPasswordControl.showForgotPassword);
app.post("/forgot-password", forgotPasswordControl.submitForgotPassword);
/**** LOG OUT ****/
app.get("/logout", logOutControl.endSession);
/**** PROFILE ****/
app.get("/profile", profileControl.showProfile);
/**** EDIT PROFILE ****/
app.get("/edit-profile", profileControl.showEditProfile);
app.post("/edit-profile", upload.single('profilePictureEdit'), profileControl.submitEditProfile); //FILE UPLOAD 
/**** STORE ****/
app.get("/store/:restaurantName", storeControl.showStore);

app.listen(3000, () => {
    console.log("App started");
    mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});