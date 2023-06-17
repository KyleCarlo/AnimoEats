$(document).ready(function() {
    execute();
});

function execute(){
    loadComponents(hoverPath);
};

function loadComponents(callback){
    $("#nav-placeholder").load("navbar.html");
    $("#map").load("map.html");
    
    $("#card-sample").load("card-info.html");
    setTimeout(function(){
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
        "greenmall", "archersplace", "mcdoU", "gokshall", "castrost", "univmall",  ];
    */
    card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
    card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    $(window).resize(function() {
        card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
        card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    });

    bloemen.on('mouseover', function(){
        $('#bb-holder .billboard p')[0].innerHTML = 'Your in Bloemen';
    });

    bloemen.on('mouseout', function(){
    });

    // idlist = [id1, id2 ... id n];
    // for(){
    //     id = '#map svg #' + idlist[i];

    // }
};
    