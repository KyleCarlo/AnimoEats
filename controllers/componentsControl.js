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
        res.render("components/resto-card", {
            name: decodeHtmlEntities(req.body.post.name),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            location: decodeHtmlEntities(req.body.post.location),
            price: priceSymbol,
            description: decodeHtmlEntities(req.body.post.description),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),        
        });

    },
    showRevCard(req, res){
        res.render("components/review-card", {
            name: decodeHtmlEntities(req.body.post.name),
        });
    }
}

export default componentsControl;