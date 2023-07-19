import Restaurant from "../models/Restaurant.js";
import Review from "../models/Review.js";

const storeControl = {
    showStore(req, res) {
        // console.log('showing store');
        res.render("store");
        
    }
}

export default storeControl;