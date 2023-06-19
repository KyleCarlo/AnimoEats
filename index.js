$(document).ready(function() {
    execute();
});

function execute(){
    loadComponents(hoverPath);
};

function loadComponents(callback){
    $("#nav-placeholder").load("components/navbar.html");
    $("#card-sample").load("components/card-info.html");
    $(".top-review").load("components/top-review.html");
    $(".recent-review").load("components/recent-review.html");

    $("#map").load("assets/svg/map.html");

    setTimeout(function(){
        loadTopReviews("json/sample.json");
        $(".review-rating").load("assets/svg/flag.html");
        callback();
    }, 500);
};

function hoverPath(){
    var card = $('#bb-holder')[0];
    var bloemen = $('#map svg #blmpath');
    /* 
        idList=["stjpath", "facultyC", "scitech", "sports", "murien", "miguel", "blmpath", 
        "yuchengco", "bagno", "connonhall", "henrysy", "lspath", "agnocourt", "johnhall", 
        "nolist1", "nolist2", "velascohall", "starbucks", "711R", "ampi", "quad", "brandrew",
        "greenmall", "archersplace", "mcdoU", "gokshall", "castrost", "univmall", "wh", "egitower",
        "vistataft", "burg", "estradast", "sherwoodplace"];

        descripList=[]
    */

    card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
    card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    $(window).resize(function() {
        card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
        card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    });

    bloemen.on('mouseover', function(){
        $('#bb-holder .billboard img')[0].src = 'assets/sprites/bibimbap.png';
        $('#bb-holder .billboard h1')[0].innerHTML = 'Bloemen Hall';
        $('#bb-holder .billboard p')[0].innerHTML = 'Lorem Ipsum Dolor Sit Amet';
    });

    bloemen.on('mouseout', function(){
        $('#bb-holder .billboard img')[0].src = 'assets/sprites/pin-loc.png';
        $('#bb-holder .billboard h1')[0].innerHTML = 'AnimoEats';
        $('#bb-holder .billboard p')[0].innerHTML = 'Hover over the map to view more details.';
    });
};

function loadTopReviews(url){
    var topReviews = [];
    $.ajax({
        type:"GET",
        url:url,
        success:function(response){
            topReviews.push(response.top_reviews[0]);
            topReviews.push(response.top_reviews[1]);
            topReviews.push(response.top_reviews[2]);
        }
    });
    setTimeout( function(){
        console.log(topReviews);
        console.log(topReviews.length);
        console.log(Math.round(topReviews[0].rating));
        for(var i = 0; i < topReviews.length; i++){
            let name = $(".top-review .review-restaurant")[i];
            let subject = $(".top-review .review-subject")[i];
            let body = $(".top-review .review-body")[i];
            let preview = $('.top-review .review-preview');
            let images; 
            let rating = ($(".top-review .review-rating svg")[i]);
            let date = $(".top-review .review-timestamp")[i];
            let month = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December",
            }
            name.innerHTML = topReviews[i].resto_name;
            subject.innerHTML = topReviews[i].subject;
            body.innerHTML = topReviews[i].body;
            for (var j = 0 ; j < 5; j++){
                if (j < Math.round(topReviews[i].rating)){
                    if(Math.round(topReviews[i].rating) < 3){
                        rating.children[j].style.fill = "#800037";
                    }
                    else{
                        rating.children[j].style.fill = "#008037";
                    }
                }
                else{
                    rating.children[j].style.fill = "#595959";
                }
            }
            date.innerHTML = "Posted on " +  month[topReviews[i].date.month] + " " + topReviews[i].date.day + ", " + topReviews[i].date.year;
        }
    }, 500);
}