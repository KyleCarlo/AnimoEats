$(document).ready(function() {
    loadComponents();
});

function loadComponents(){
    $(".review").load("../view/components/review-card.html");
    $(".store-prev").load("../view/components/store-prev.html");
    $('.resto-info').load('../view/components/resto-card.html');
    $('.add-review-btn').load('../view/components/add-review-btn.html');
    $('.view-more-btn').load('../view/components/view-more-btn.html');
    $('.side-bar').load('../view/components/side-bar.html');
    // $('.create-review').load('../viewcomponents/create-review.html');
};