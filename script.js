const slideshow = ["showOne", "showTwo", "showThree", "showFour", "showFive", "showSix", "showSeven"];
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const allPics = document.querySelector('#allPics');
const dotsArray = [];

//Automatically create as many dots as slide views, add to an array
const dots = document.querySelector('.dots');
    for (const slide in slideshow) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        //Click to jump to slide
        dot.addEventListener('click', function () {
            //Cancel current timer
            clearTimeout(countdown);
            let currentClass = allPics.className;
            allPics.classList.remove(`${currentClass}`);
            //Apply class corresponding with dot's index
            allPics.classList.add(slideshow[dotsArray.indexOf(dot)]);
            //Clear all dots and fill selected dot
            for (const dot in dotsArray) {
                dotsArray[dot].classList.remove('filled');
            }  
            dot.classList.add('filled');
            //Reset timer
            startCountdown();
        });
        dotsArray.push(dot);
        dots.appendChild(dot);
    }

//Fill first dot on page load
dotsArray[0].classList.add('filled');

//Separate function to work on button click AND on timeout
nextButton.addEventListener('click', advanceSlide);
previousButton.addEventListener('click', previousSlide);

function advanceSlide() {
    clearTimeout(countdown);
    let currentClass = allPics.className;
    let newClass = slideshow[slideshow.indexOf(allPics.className) + 1];
    // Remove fill from previous dot
    let dotMarker = slideshow.indexOf(allPics.className) + 1;
    dotsArray[dotMarker - 1].classList.remove('filled');
    if (newClass == undefined) {
        newClass = slideshow[0];
        dotMarker = 0;
    } 
    allPics.classList.remove(`${currentClass}`);
    allPics.classList.add(`${newClass}`);
    // Add fill to next dot
    dotsArray[dotMarker].classList.add('filled');
    //Begin time to next slide
    startCountdown();
}

function previousSlide() {
    clearTimeout(countdown);
    let currentClass = allPics.className;
    let newClass = slideshow[slideshow.indexOf(allPics.className) - 1];
    let dotMarker = slideshow.indexOf(allPics.className) - 1;
    dotsArray[dotMarker + 1].classList.remove('filled');
    if (newClass == undefined) {
        newClass = slideshow[slideshow.length - 1];
        dotMarker = slideshow.length - 1;
    } 
    allPics.classList.remove(`${currentClass}`);
    allPics.classList.add(`${newClass}`);
    dotsArray[dotMarker].classList.add('filled');
    startCountdown();
}

//Begin timer on page load
startCountdown();

function startCountdown() {
    countdown = setTimeout(advanceSlide, 5000);
}