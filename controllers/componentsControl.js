const componentsControl = {
    showSideBar(req, res) {
        res.render("components/side-bar");
    },
    showLocationCard(req, res){
        res.render("components/location-card");
    },
    showStorePrev(req, res){
        res.render("components/store-prev");
    }
}

export default componentsControl;