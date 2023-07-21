import mongoose from "mongoose";
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
    restaurantOwner: Boolean
});

const User = mongoose.model('User', userSchema);

export default User;