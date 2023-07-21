import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import {decodeEntity} from 'html-entities';
import he from "he";


function decodeHtmlEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) {
        var entityPattern = new RegExp('&' + entities[i][0] + ';', 'g');
        text = text.replace(entityPattern, entities[i][1]);
    }

    console.log(text);

    return text;
}

function replaceHtmlEntities(paragraph) {
    const htmlEntitiesMap = {
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      // Add more entities if needed
    };
  
    // Regular expression pattern to match HTML entities
    const htmlEntityPattern = /&[A-Za-z0-9]+;/g;
  
    // Use the replace() method with a callback function to replace entities
    const replacedParagraph = paragraph.replace(htmlEntityPattern, (match) => {
      return htmlEntitiesMap[match] || match; // Replace with corresponding entity or the original match if not found
    });
  
    return replacedParagraph;
  }

const componentsControl = {
    showSideBar(req, res) {
        res.render("components/side-bar");
    },
    showLocationCard(req, res){
        res.render("components/location-card");
    },
    async showStorePrev(req, res) {

        res.render("components/store-prev", {
            name: decodeHtmlEntities(req.body.post.name),
            location: decodeHtmlEntities(req.body.post.location),
            description: he.decode(req.body.post.description),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            cardNum: req.body.cardNum
        });
    },
    
    showRestoCard(req, res){
        // TODO: EDIT additional
        let priceSymbol = "";
        for (let i = 0; i < req.body.post.price; i++) {
            priceSymbol += "₱";
        }
        // console.log(req.body.post);
        res.render("components/resto-card", {
            name: req.body.post.name,
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            totalReviews: req.body.post.totalReviews,
            location: req.body.post.location,
            price: priceSymbol,
            description: req.body.post.description,
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),  
            bannerPic: req.body.post.bannerPic      
        });

    },
    
    async showRevCard(req, res){
        const user = await User.findById(req.body.post.user);
        const name = user.firstName + " " + user.lastName;
        const profilePic = user.profilePic;
        const restaurant = await Restaurant.findById(req.body.post.restaurant);
        const restoName = restaurant.name;
        console.log(profilePic);
        res.render("components/review-card", {
            restoName: restoName,
            name: name,
            rating: req.body.post.rating,
            profilePic: profilePic,
            postTitle: req.body.post.postTitle,
            description: req.body.post.description,
            helpfulCount: req.body.post.helpfulCount,
            unhelpfulCount: req.body.post.unhelpfulCount,
            images: JSON.stringify(req.body.post.images),
            image1: req.body.post.images.image1,
            image2: req.body.post.images.image2,
            image3: req.body.post.images.image3,
            image4: req.body.post.images.image4,
            cardNum: req.body.cardNum,
            reviewId: req.body.post._id
        });
    },
    showCreateRev(req, res){
        const restaurantId = req.body.post._id;
        if(req.session.user) //FIX THIS
            res.render("components/create-review", {restaurantId: restaurantId});
    },

    async submitCreateRev(req, res){
        // console.log(req.body.restaurantId);
        // console.log(req.session.user._id);
        // const resto_id = {"$oid": req.body.restaurantId};
        // console.log(resto_id);

        /**** MON  *****/
        const resto =  await Restaurant.findById(req.body.restaurantId, 'name');
        const resto_name = resto.name;
        const today = new Date();
        var imageNames = []
        for(let i = 0; i < 4; i++){
            if (req.files[i] != undefined)
                imageNames.push(req.files[i].path.split("\\").slice(1).join('/'));
            else {
                imageNames.push('');
            }
        }
        const data = {
            postTitle: req.body.subject,
            rating: req.body.rating,
            description: req.body.message,
            helpfulCount: 0,
            unhelpfulCount: 0,
            monthPosted: today.getMonth() + 1,
            datePosted: today.getDate(),
            yearPosted: today.getFullYear(),
            edited: false,
            images: {
                "image1": imageNames[0],
                "image2": imageNames[1],
                "image3": imageNames[2],
                "image4": imageNames[3]
            },
            user: req.session.user._id,
            restaurant: req.body.restaurantId
        };

        try {
            await Review.insertMany([data]);
            res.redirect("/store/"+resto_name);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred.");
        }
        // redirect("/store/"+resto_name);
    }
}

export default componentsControl;