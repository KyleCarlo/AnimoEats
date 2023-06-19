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

    $("#map").load("assets/svg/map.html");

    loadTopReviews('json/sample.json');

    setTimeout(function(){
        $(".rating").load("assets/svg/flag.html");
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
    $.ajax({
        type:"GET",
        url:url,
        success:function(response){
            console.log(response);
        }
    })
}