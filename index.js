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

    card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
    card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    $(window).resize(function() {
        card.style.top = ($('#nav-placeholder')[0].getBoundingClientRect().height) + 'px';
        card.style.height = $('#map svg')[0].getBoundingClientRect().height + 'px';
    });

    var idList=["stjpath", "facultyC", "scitech", "sports", "murien", "miguel", 
    "blmpath", "yuchengco", "bagno", "connonhall", "henrysy", "lspath", "agnocourt", 
    "johnhall", "nolist1", "nolist2", "velascohall", "starbucks", "711R", "ampi", "quad", 
    "brandrew", "greenmall", "archersplace", "mcdoU", "gokshall", "castrost", "univmall", "wh", 
    "egitower", "vistataft", "burg", "estradast", "sherwoodplace"];
    var buildings=["SJ Path", "Faculty Center", "Research Center",
                "Razon", "St. Murien", "St. Miguel", "Bloemen Hall",
                "Yuchengco","Beside Agno", "Connon Hall", "Henry Sy", "LS Path",
                "Agno", "John Hall", "Noli Street", "Noli Street", "Velasco Hall",
                "Starbucks", "7-11", "Ampitheater", "Marian Quadrangle", "Andrew Gonzalez",
                "Green Mall", "One Archers", "Mcdonalds", "Gokongwei", "Castro St.", "Univ Mall",
                "WH Taft", "EGI Towers", "Vista Taft", "Burgundy", "Estrada St.", "Sherwood"];
    var building_descriptions = [
    "Where Food Stalls and Exhibits Are Held",
    "Faculty Lounge for College of Business",
    "Research Building for College of Science",
    "Main Sports Building for Physical Education",
    "Houses History and Engineering Students, Known for Its Scary Vibe",
    "Houses the College of Liberal Arts",
    "Place for Quick Snacks and Refreshers Inside Campus",
    "Artistic and Architectural Piece with the Museum Inside It",
    "Place Beside the Main Food Hub in DLSU",
    "Housing the Clinic and Student Government Offices",
    "Housing the Library and Main Conference Rooms",
    "Benches and Waiting Areas for Many of Administrative Offices",
    "Main Food Place Across Gokongwei, Composed of Different Stalls",
    "Where DLSU PUSO and Science Foundation are Located",
    "Housing Food Places Beside Razon",
    "Known for Its Many Lounging Places",
    "Main Building for the College of Engineering",
    "The Ultimate Go-To Cafe After Classes in Andrew or Razon",
    "The Go-To Convenience Store Near Campus",
    "Hub of University Activities",
    "Iconic Place with Mary's Statue",
    "Main Building for the College of Education",
    "Go-To Mall for Easy Food Stops Near Andrew",
    "One of the Main Condominiums Near Campus",
    "Staple Fast Food Place Near the South Gate",
    "Main Building for the College of Computer Studies",
    "Housing Mini Food Places Near Goks",
    "Housing Many Food Options with Lots of Famous Cafes",
    "One of the Main Condominiums Near Campus",
    "One of the Main Condominiums Near Campus",
    "One of the Main Condominiums Near Campus",
    "One of the Main Condominiums Near Campus",
    "Hidden but Contains One of the Cheapest Food Treats Near Campus",
    "Houses Condominiums and Food Stops Across Campus"];
    var length = idList.length;
    var mapPath;
    for(let i = 0; i < length; i++){
        mapPath = $('#map svg .' + idList[i]);
        mapPath.on('mouseover', function(){
            $('#bb-holder .billboard img')[0].src = 'assets/sprites/bibimbap.png';
            $('#bb-holder .billboard h1')[0].innerHTML = buildings[i];
            $('#bb-holder .billboard p')[0].innerHTML = building_descriptions[i];
        });
    
        mapPath.on('mouseout', function(){
            $('#bb-holder .billboard img')[0].src = 'assets/sprites/pin-loc.png';
            $('#bb-holder .billboard h1')[0].innerHTML = 'AnimoEats';
            $('#bb-holder .billboard p')[0].innerHTML = 'Hover over the map to view more details.';
        });
    }
};
    
