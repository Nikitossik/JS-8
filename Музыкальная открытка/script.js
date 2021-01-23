// const hero = document.querySelector('.hero');
const envelope = document.querySelector('.envelope');
const audio = document.getElementById('envelope-audio');

envelope.addEventListener('click', function(){
    envelope.classList.toggle('opened');
    if (envelope.classList.contains('opened')) audio.play();
    else audio.pause();
});