import mongoose from "mongoose";
import User from "./User.js";
import Restaurant from "./Restaurant.js";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    postTitle: String,
    rating: Number,
    description: String,
    helpfulCount: {
        type: Number,
        default: 0,
        get: function(){
            return this.likeList.length;
        }
    },
    unhelpfulCount: {
        type: Number,
        default: 0,
        get: function(){
            return this.dislikeList.length;
        }
    },
    monthPosted: Number, 
    datePosted: Number,
    yearPosted: Number,
    edited: Boolean,
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
    reply: String, 
    likeList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        default: []
    }],
    dislikeList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: []
    }]
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;