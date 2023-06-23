$(document).ready(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    execute(page);
    createReview();
});

function execute(page){
    loadComponents(page, hoverPath, hoverStore);
};

function loadComponents(page, callback, callback2){
    var path;
    $("#nav-placeholder").load("components/navbar.html");
    $("#card-sample").load("components/card-info.html");
    $(".top-review").load("components/top-review.html");
    $(".recent-review").load("components/recent-review.html");
    $(".recent-main").load("components/recent-main.html");

    $("#map").load("assets/svg/map.html");  

    for (var i = 0; i < 6; i++) {
        $("#stores" + (i+1)).load("mini-card.html");
    }

    $("#map-specific").load("assets/svg/bloemen.html");

    setTimeout(function(){
        $(".review-rating").load("assets/svg/flag.html");
        loadEditProfile("json/user1.json");
        
        if (page == "user1.html"){
            path = "json/user1.json";
            
        }
        else if(page == "user2.html"){
            path="json/user2.json";
            userView();
        }
        else if(page == "user3.html"){
            path="json/user3.json";
            userView();
        }
        else if(page == "user4.html"){
            path="json/user4.json";
            userView();
        }
        else if(page == "user5.html"){
            path="json/user5.json";
            userView();
        }
        else if(page == "user6.html"){
            path="json/user6.json";
            userView();
        }
        

        // else if (page == "other-user.html") {
        //     loadProfile("json/user2.json");
        //     userView();
            
        // } 
        loadProfile(path);
        
        

        if (page != 'map-specific.html'){
            callback();
            console.log(page);
            
        }else {
            callback2();
        }
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

function loadProfile(url){
    var user;
    var topReviews = [];
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
    };

    $.ajax({
        type:"GET",
        url:url,
        success:function(response){
            // console.log(response.bio);
            user = response.bio;
            topReviews.push(response.top_reviews[0]);
            topReviews.push(response.top_reviews[1]);
            topReviews.push(response.top_reviews[2]);
        }
    });

    setTimeout( function(){
        console.log(user[0].profile_picture);
        console.log(topReviews);
        console.log(topReviews.length);
        console.log(Math.round(topReviews[0].rating));
        $('#profile-bio .profile-picture')[0].src = user[0].profile_picture;
        $('#profile-bio .profile-username')[0].innerHTML = user[0].first_name + " " + user[0].last_name;
        $('#profile-bio .profile-description')[0].innerHTML = user[0].description;
        $('#profile-bio .helpful-count')[0].innerHTML = user[0].helpful_count;
        $('#profile-bio .reviews-count')[0].innerHTML = user[0].reviews_count;
        $('#profile-bio .photos-count')[0].innerHTML = user[0].photos_count;
        console.log(user[0].member_since_date.month);
        $('#profile-bio .member-since-date')[0].innerHTML = month[user[0].member_since_date.month] + " " + user[0].member_since_date.year;
        logOut();
        
        for(var i = 0; i < topReviews.length; i++){
            let name = $(".top-review .review-restaurant")[i];
            let subject = $(".top-review .review-subject")[i];
            let body = $(".top-review .review-body")[i];
            let preview = $('.top-review .review-preview')[i];
            let images = $('.top-review .review-images')[i]; 
            let rating = ($(".top-review .review-rating svg")[i]);
            let date = $(".top-review .review-timestamp")[i];
            
            name.innerHTML = topReviews[i].resto_name;
            subject.innerHTML = topReviews[i].subject;
            body.innerHTML = topReviews[i].body;
            preview.src = topReviews[i].preview;
            images.src = topReviews[i].images;
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

function loadEditProfile(url){
    var profileBio = [];
    $.ajax({
        type:"GET",
        url:url,
        success:function(response){
            profileBio.push(response.bio[0]);
        }
    });
    setTimeout( function(){
        console.log(profileBio);
        console.log(profileBio.length);
        console.log(Math.round(profileBio[0].rating));
        for(var i = 0; i == 0; i++){
            let pp = $(".editprof-container .edit-profile-photo")[i];
            let first = $(".editprof-container .first-name-input")[i];
            let last = $(".editprof-container .last-name-input")[i];
            let desc = $(".editprof-container .bio-input")[i];
            pp.src = profileBio[i].profile_picture;
            first.value = profileBio[i].first_name;
            last.value = profileBio[i].last_name;
            desc.value = profileBio[i].description;
        }
    }, 500);
}


function createReview(){
    $(".add-revbutton").on("click", function (){
        let body = $('body')[0];
        body.innerHTML += '<div class="cover" style="position: fixed; z-index: 3; top: 0; background-color: black; width: 100%; height: 100vh; opacity: 0.5"></div>';
        body.style.overflow = "hidden";
        
        body.innerHTML += '<div class="add-review" style="position: fixed; top:0; z-index: 4;"></div>'
        $('.add-review').load('components/add.html');
        let review = $('.add-review')[0];
        review.style.zIndex = "4";

        setTimeout(function(){
            let x = $('.compose-header span');
            console.log(x);
            x.on('click', function(){
                $('.cover').remove();
                $('.add-review').remove();
                body.style.overflow = "initial";
            })

            createReview();
        }, 300);
    })
}

function hoverStore(){
    var card = $('.mini-card-container');
    card[0].hidden = false;
    
    $('#map-specific .blackstem').on('mouseover', function(e){
        card[0].style.position = 'absolute';
        card[0].style.top = e.pageY + 'px';
        card[0].style.left = (e.pageX+10) + 'px';
        card.load('mini-card.html');
    });

    $('#map-specific .blackstem').on('mouseout', function(){
        card[0].innerHTML = '';
    });

    $('#map-specific .jam-fruit').on('mouseover', function(e){
        card[0].style.position = 'absolute';
        card[0].style.top = e.pageY + 'px';
        card[0].style.left = (e.pageX+10) + 'px';
        card.load('mini-card.html');
    });

    $('#map-specific .jam-fruit').on('mouseout', function(){
        card[0].innerHTML = '';
    });

    $('#map-specific .bowld').on('mouseover', function(e){
        card[0].style.position = 'absolute';
        card[0].style.top = e.pageY + 'px';
        card[0].style.left = (e.pageX+10) + 'px';
        card.load('mini-card.html');
    });

    $('#map-specific .bowld').on('mouseout', function(){
        card[0].innerHTML = '';
    });
    $('#map-specific .queggs').on('mouseover', function(e){
        card[0].style.position = 'absolute';
        card[0].style.top = e.pageY + 'px';
        card[0].style.left = (e.pageX+10) + 'px';
        card.load('mini-card.html');
    });

    $('#map-specific .queggs').on('mouseout', function(){
        card[0].innerHTML = '';
    });
    $('#map-specific .mongolian').on('mouseover', function(e){
        card[0].style.position = 'absolute';
        card[0].style.top = e.pageY + 'px';
        card[0].style.left = (e.pageX+10) + 'px';
        card.load('mini-card.html');
    });

    $('#map-specific .mongolian').on('mouseout', function(){
        card[0].innerHTML = '';
    });
    card.hidden = true;
    console.log('execution done');
}

function logIn(){
    var login = $('.sign-up-log-in form .button')[0];
    console.log(login);
}

function userView(){
    var top_revs = $('.top-review');

    for (var i = 0; i < top_revs.length; i++){
        top_revs[i] > $('.review-edit').remove();
        top_revs[i] > $('.review-delete').remove();
    }
}

function logOut(){
    $('.logout').on('click', function(){
        var body = $('body');
        body[0].innerHTML += '<div style="position:fixed; top:0; z-index: 4; width: 100%; height: 100vh; background-color: black; opacity: 0.7" class=".delete-hover"></div>';
        body[0].style.overflow = "hidden";
        console.log($('body')[0]);
    });

    $('.logout').on('')
}

function deletePost(){
    
}