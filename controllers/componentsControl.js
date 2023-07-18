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
    showStorePrev(req, res){
        res.render("components/store-prev", {
            name: decodeHtmlEntities(req.body.post.name),
            location: decodeHtmlEntities(req.body.post.location),
            description: decodeHtmlEntities(req.body.post.description),
            aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
            cardNum: req.body.cardNum          
        });
    },
    showRestoCard(req, res){
        res.render("components/resto-card");
    },
    showRevCard(req, res){
        res.render("components/review-card-self");
    }
}

export default componentsControl;