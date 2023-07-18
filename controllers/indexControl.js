import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";

const indexControl = {
    rememberSesh(req, res){
        if (req.session.user){
            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + (21 * 24 * 60 * 60 * 1000)); // Extend by 3 weeks
            req.session.cookie.expires = expirationDate; // Set new expiration date
        }
        res.render("index");
    },
    async showListRestaurants(req, res){
        // const skip = req.query.skip ? Number(req.query.skip) : 0;
        // const def_limit = 12;

        // try {
        //     const restaurants = await Restaurant.find({}).skip(skip).limit(def_limit);
        //     console.log(restaurants);
        //     res.status(200).json({
        //         success: true,
        //         data: restaurants
        //     });
        // } catch (err) {
        //     res.status(400).json({
        //         error: `Error getting posts: $(err.message)`
        //     });
        // }
        let {page, limit} = req.query;
        // DEFAULT PAGE AND LIMIT
        if (!page) 
            page = 1;
        if (!limit) 
            limit = 12;
        const skip = (page - 1) * limit;
        let restaurants = await Restaurant.find().skip(skip).limit(limit).exec();
        // res.send({page: page, limit: limit, restaurants: restaurants});
        // res.render("index", {restaurants: restaurants});
        restaurants = restaurants.map(restaurant => {
            return {
                _id: restaurant._id.toString(),
                name: restaurant.name,
                location: restaurant.location,
                aveRating: restaurant.aveRating,
                description: restaurant.description,
                bannerPic: restaurant.bannerPic
            }
        });
        console.log(typeof restaurants);

        res.render("index", { restaurants: [restaurants]});
    }

}

export default indexControl;