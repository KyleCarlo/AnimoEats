import Restaurant from "../models/Restaurant.js";
import Review from "../models/Review.js";

const storeControl = {
    async showStore (req, res){
        try {
            const restaurantName = req.params.restaurantName;
            var restaurant = await Restaurant.find( { name: restaurantName });
            restaurant = restaurant[0];

            var reviews = await Review.find({restaurant: restaurant._id.toString()});
            console.log(restaurant._id.toString());
            if (!restaurant) {
                return res.status(404).send("Restaurant not found");
            }
            res.render("store", {
                storeName : restaurant.name,
                restaurantInfo : restaurant
            });
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }

}

export default storeControl;