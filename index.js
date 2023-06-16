$(document).ready(function() {
    $("#nav-placeholder").load("navbar.html");
    $("#map").load("map.html");
    $(".card").load("card-info.html");
    // $("#nav-placeholder").css("position", "sticky");
    // $("#nav-placeholder").css("top", "0");

    // function showInfo(event) {
    //     var cardInfo = event.currentTarget.getElementByID("card--info")[0];
    //     cardInfo.style.transform = "translateY(0%)";
    //     }

    // function hideInfo(event) {
    //     var cardInfo = event.currentTarget.getElementsByClassName("card--info")[0];
    //     cardInfo.style.transform = "translateY(100%)";
    // }

    const path = document.getElementById('lspath');
    const cardInfo = document.getElementById('card--info');

    path.addEventListener('mouseover', () => {
    cardInfo.classList.add('show');
    });

    path.addEventListener('mouseout', () => {
    cardInfo.classList.remove('show');
    });
});
    