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

/**
 * Import local dependencies
 */
/**** MODELS ****/
import { connectToMongo } from "./db/conn.js";
import User from "./models/User.js";
import Restaurant from "./models/Restaurant.js";
import Review from "./models/Review.js";
/**** CONTROLLERS ****/
import signUpControl from "./controllers/signUpControl.js";
import logInControl from "./controllers/logInControl.js";
import logOutControl from "./controllers/logOutControl.js";
import profileControl from "./controllers/profileControl.js";

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
app.engine("hbs", exphbs.engine({extname:'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");
/**** FILE UPLOAD ****/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname))
    }
});
/**** SESSION ****/
const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/usersDB',
    ttl: 21 * 24 * 60 * 60,
    autoRemove: 'native'
});
app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

connectToMongo(()=>{
    console.log('Connected to MongoDB');
})

/**
 * Controller
 */

/**** SIGN UP ****/
app.get("/sign-up", signUpControl.showSignUpForm);
app.post("/sign-up", signUpControl.submitSignUpForm);
/**** LOG IN ****/
app.get("/login", logInControl.showLogInForm);
app.post("/login", logInControl.submitLogInForm);
/**** LOG OUT ****/
app.get("/logout", logOutControl.endSession);
/**** EDIT PROFILE ****/
app.get("/edit-profile", profileControl.getProfile);

app.listen(3000, () => {
    console.log("App started");
    mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});

export { app };