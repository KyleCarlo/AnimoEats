$(document).ready(function() {
    execute();
});

function execute(){
    loadComponents(hoverPath);
};

function loadComponents(callback){
    $("#nav-placeholder").load("navbar.html");
    $("#map").load("map.html");
    $("#bb-holder").load("card-info.html");
    setTimeout(function(){
        callback();
    }, 100);
};

function hoverPath(){
    var svg_map = $('#map svg #stjpath');
    var card = $('#card-container')[0];

    card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
    card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    $(window).resize(function() {
        card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
        card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    });

    svg_map.on('mouseover', function(){
    });

    svg_map.on('mouseout', function(){
    });

    // idlist = [id1, id2 ... id n];
    // for(){
    //     id = '#map svg #' + idlist[i];

    // }
};
    