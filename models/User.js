import mongoose from "mongoose";
import Restaurant from "./Restaurant.js";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    helpfulCount: Number,
    reviewCount: Number, 
    photoCount: Number, 
    monthMade: Number,
    dateMade: Number,
    yearMade: Number,
    biography: String,
    profilePic: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant,
        default: null
    }
});

const User = mongoose.model('User', userSchema);

export default User;