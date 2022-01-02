import $ from 'cash-dom';

const showCard = () => {
    $('.menu-auth').toggleClass('active');
    $('.menu-card').toggleClass('active');
};

$('.menu-toggle').on('click', showCard);
$('.menu-user .img').on('click', showCard);
