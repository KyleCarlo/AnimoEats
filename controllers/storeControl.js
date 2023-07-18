import Restaurant from "../models/Restaurant.js";

const storeControl = {
    showStore(req, res) {
        console.log('showing store');
        res.render("store");
    }
}