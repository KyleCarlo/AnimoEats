$(document).ready(function() {
    loadComponents();
});

function loadComponents(){
    $(".review").load("components/review-card.html");
    $(".store-prev").load("components/store-prev.html");
    $('.resto-info').load('components/resto-card.html');
    $('.add-review-btn').load('components/add-review-btn.html');
    $('.view-more-btn').load('components/view-more-btn.html');
    $('.side-bar').load('components/side-bar.html');
    $('.create-review').load('components/create-review.html');
};