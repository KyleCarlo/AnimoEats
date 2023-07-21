import mongoose from "mongoose";
import User from "./User.js";
import Restaurant from "./Restaurant.js";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    postTitle: String,
    rating: Number,
    description: String,
    helpfulCount: Number,
    unhelpfulCount: Number,
    images: {
        image1: String,
        image2: String,
        image3: String, 
        image4: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant
    },
    reply: String
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;