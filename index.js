$(document).ready(function() {
    loadComponents();
});

function loadComponents(){
    $(".review").load("components/review-card.html");
    $(".store-prev").load("components/store-prev.html");
};