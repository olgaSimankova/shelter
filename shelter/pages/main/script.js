console.log('Привет, дорогой проверяющий!')
import petsData from "../../assets/scripts/pets.js";

let arr = [0, 1, 2, 3, 4, 5, 6, 7];
let currentCards

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
function getRandomNum(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

// ----------------burger nav----------------
const header = document.querySelector('.header');
const burgerBtn = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.body')

const openNav = () => {
    header.classList.add('open');
    burgerBtn.classList.add('open');
    navigation.classList.add('open');
    overlay.classList.remove('hidden');
    body.style.overflow = 'hidden';
};

const closeNav = () => {
    header.classList.remove('open');
    burgerBtn.classList.remove('open');
    navigation.classList.remove('open');
    overlay.classList.add('hidden');
    body.style.overflow = 'scroll';
};

burgerBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
});

overlay.addEventListener('click', (e) => {
    if (!e.target.classList.contains('hidden')) {
        closeNav();
    }
});

navigation.addEventListener('click', (e) => {
    if (e.target.closest('.navigation__link')) {
        setTimeout(() => {
            closeNav();
        }, 200);
    }
});

// ----------------Carousel----------------

const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');
const slider = document.querySelector('.pets__slider');

const moveLeft = () => {
    slider.classList.add("transition-left");
    leftBtn.removeEventListener("click", moveLeft);
}
const moveRight = () => {
    slider.classList.add("transition-right");
    rightBtn.removeEventListener("click", moveRight);
}

leftBtn.addEventListener("click", moveLeft);

rightBtn.addEventListener("click", moveRight);

slider.addEventListener('animationend', () => {
    slider.classList.remove("transition-left");
    leftBtn.addEventListener("click", moveLeft);
    slider.classList.remove("transition-right");
    rightBtn.addEventListener("click", moveRight);
})

// ----------------render new slide----------------

const renderPetsSlider = () => {
    const sliderWrapper = getSliderContainer()
    const slideCards = setSlideCards()

    for (let i = 0; i < 3; i++) {
        let newSlide
        if (i == 0) {
            newSlide = createNewSlide(slideCards[1])
            newSlide.classList.add("slide-left")
            currentCards = slideCards[1]
        }
        else if (i == 1) {
            newSlide = createNewSlide(slideCards[0])
            newSlide.classList.add("slide-active")
        }
        else {
            newSlide = createNewSlide(slideCards[1])
            newSlide.classList.add("slide-right")
        }

        sliderWrapper.append(newSlide)
    }
    console.log("currentCards " + currentCards)
    return sliderWrapper
}

const getSliderContainer = () => {
    const sliderContainer = document.querySelector(".pets__slider")
    sliderContainer.innerHTML = ''
    return sliderContainer
}

const setSlideCards = (arrActiveCards = []) => {
    const width = window.innerWidth

    let slideCardsSet = []
    const newShuffledArr = shuffle(arr);
    let randomArr = newShuffledArr.slice(0).filter(el => !arrActiveCards.includes(el))

    if (width >= 1280) {
        //cardsDisplaying = 3;
        slideCardsSet.push(randomArr.splice(0, 3));
        slideCardsSet.push(randomArr.splice(0, 3));
        currentCards = slideCardsSet[1]

    } else if (width >= 768 && width < 1280) {
        //cardDisplaying = 2;
        slideCardsSet.push(randomArr.splice(0, 2));
        slideCardsSet.push(randomArr.splice(0, 2));
        currentCards = slideCardsSet[1]

    } else if (width < 768) {
        //cardDisplaying = 1;
        slideCardsSet.push(randomArr.splice(0, 1));
        slideCardsSet.push(randomArr.splice(0, 1));
        currentCards = slideCardsSet[1]
    }
    console.log(slideCardsSet)
    return slideCardsSet
}

const createNewSlide = (petsNumbers) => {

    const parentSlide = document.createElement("div")
    parentSlide.classList.add("slide")

    petsNumbers.forEach(number => {
        let newCard = document.createElement("div");
        newCard.classList.add("pets_card");
        let element = petsData[number]

        newCard.innerHTML =
            `<img src="${element.img}" alt="${element.name}" class="pet-img">
            <h4 class="pet-name">${element.name}</h4>
            <button class="button button-bordered">Learn more</button>`

        parentSlide.append(newCard);
    })
    return parentSlide
}

document.addEventListener("DOMContentLoaded", () => {
    renderPetsSlider()
})

slider.addEventListener('animationend', () => {
    slider.classList.remove('transition-left')
    const newSlide = document.querySelector('.slide-left').innerHTML
    document.querySelector(".slide-active").innerHTML = newSlide

    const newCards = setSlideCards(currentCards)[0]
    console.log("Номера новых карточек, сколько их там " + newCards)

    currentCards = newCards

    const newFabulousSlide = createNewSlide(newCards)

    let newLeftSlide = document.querySelector(".slide-left")
    let newRightSlide = document.querySelector(".slide-right")

    newLeftSlide.innerHTML = newFabulousSlide.innerHTML
    newRightSlide.innerHTML = newFabulousSlide.innerHTML

    leftBtn.addEventListener("click", moveLeft);
    rightBtn.addEventListener("click", moveRight);
})

// ----------------OMG Modal----------------
