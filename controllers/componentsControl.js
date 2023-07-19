import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import User from "../models/User.js";

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
        text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    }
  
    return text;
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
            description: decodeHtmlEntities(req.body.post.description),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            cardNum: req.body.cardNum
        });
    },
    showRestoCard(req, res){
        // TODO: EDIT additional
        res.render("components/resto-card", {
            name: decodeHtmlEntities(req.body.post.name),
            location: decodeHtmlEntities(req.body.post.location),
            description: decodeHtmlEntities(req.body.post.description),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            cardNum: req.body.cardNum          
        });
    },
    async showRevCard(req, res){
        // const reviews = await Review.find({});
        res.render("components/review-card-self",
            // { reviews }
        );
    }
}

export default componentsControl;