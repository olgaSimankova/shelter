import petsData from "../../assets/scripts/pets.js";

const overlay = document.querySelector('.overlay');
const body = document.querySelector('.body');


// Если смогла карусель, смогу и пагинацию!

let arr = [0, 1, 2, 3, 4, 5, 6, 7];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let pagesQty = 6;
let cards = 8;
let pageNow = 1;
let petsOnPages = []

let desktopSize = window.matchMedia("(min-width: 1280px)");
let tabletSize = window.matchMedia("(max-width: 1279px)");
let mobileSize = window.matchMedia("(max-width: 767px)");

if (tabletSize.matches) {
    petsOnPages = [];
    pagesQty = 8;
    cards = 6;
    petsOnPages = getPetsOnPages(petsOnPages, pagesQty, cards);

}
if (mobileSize.matches) {
    petsOnPages = [];
    pagesQty = 16;
    cards = 3;
    petsOnPages = getPetsOnPages(petsOnPages, pagesQty, cards);
}
if (desktopSize.matches) {
    petsOnPages = [];
    pagesQty = 6;
    cards = 8;
    petsOnPages = getPetsOnPages(petsOnPages, pagesQty, cards);
}

function getPetsOnPages(petsOnPages, pagesQty, cards) {
    for (let i = 0; i < pagesQty; i++) {
        let newCardsSet = shuffle(arr).slice(0, cards)
        while (petsOnPages.includes(newCardsSet)) {
            newCardsSet = shuffle(arr)
        }
        petsOnPages.push(newCardsSet)
    }
    return petsOnPages
}

let pageContainer = document.querySelector(".cards-container")

const changeCardsOnPage = () => {
    pageContainer.innerHTML = ''
    const pageCards = petsOnPages[pageNow - 1]
    createNewSlide(pageCards)
}

const createNewSlide = (petsNumbers) => {

    petsNumbers.forEach(number => {
        let newCard = document.createElement("div");
        newCard.classList.add("pets_card");

        let element = petsData[number]

        newCard.innerHTML =
            `<img src="${element.img}" alt="${element.name}" class="pet-img">
            <h4 class="pet-name">${element.name}</h4>
            <button class="button button-bordered">Learn more</button>`
        newCard.addEventListener('click', (e) => {
            openModal(number)
        })

        pageContainer.append(newCard);
    })
}
document.addEventListener("DOMContentLoaded", () => {
    changeCardsOnPage()
})

const CurrentPageNum = document.querySelector(".pagination-page");

function switchPage(e) {
    let currentItem = e.target.closest(".pagination").id;
    switch (currentItem) {
        case "double-left":
            pageNow = 1;
            break;
        case "left":
            pageNow -= 1;
            if (pageNow < 1) {
                pageNow = 1
            }
            break;
        case "right":
            pageNow += 1;
            if (pageNow > pagesQty) {
                pageNow = pagesQty
            }
            break;
        case "double-right":
            pageNow = pagesQty;
            break;
    }
    changeCardsOnPage()
    CurrentPageNum.innerHTML = `${pageNow}`
    buttonsAbleDisable()
}

const paginationButtons = document.querySelectorAll(".pagination");
paginationButtons.forEach((item) => item.addEventListener("click", switchPage))

const buttonsAbleDisable = () => {
    if (pageNow > 1) {
        paginationButtons[0].removeAttribute("disabled");
        paginationButtons[1].removeAttribute("disabled");
        paginationButtons[0].classList.remove("disabled");
        paginationButtons[1].classList.remove("disabled");
    }
    if (pageNow === pagesQty) {
        paginationButtons[2].setAttribute("disabled", "disabled");
        paginationButtons[3].setAttribute("disabled", "disabled");
        paginationButtons[2].classList.add("disabled");
        paginationButtons[3].classList.add("disabled");
    }
    if (pageNow === 1) {
        paginationButtons[0].setAttribute("disabled", "disabled");
        paginationButtons[1].setAttribute("disabled", "disabled");
        paginationButtons[0].classList.add("disabled");
        paginationButtons[1].classList.add("disabled");
    }
    if (pageNow < pagesQty) {
        paginationButtons[2].removeAttribute("disabled");
        paginationButtons[3].removeAttribute("disabled");
        paginationButtons[2].classList.remove("disabled");
        paginationButtons[3].classList.remove("disabled");
    }
}

// ----------------OMG Modal----------------
// Ну че, погнали.. Где там наш попап?

const popup = document.querySelector(".modal-window__wrapper");

export function openModal(n) {

    popup.classList.add('active')

    let modalContainer = `<div class="modal-window">
            <button class="modal-btn">&#215;</button>
            <div class="popup">
              <div class="popup-image">
                <img src="${petsData[n].img}" alt="pet img here" class="popup-img">
              </div>
              <div class="popup-content">
                <h3 class="popup-content__title">${petsData[n].name}</h3>
                <div class="popup-content__pet-type">
                  <span class="popup-content__pet">${petsData[n].type}</span>
                   - 
                  <span class="popup-content__breed">${petsData[n].breed}</span>
                </div>
                <p class="popup-content__text">${petsData[n].description}</p>
                <ul class="popup-content-list">
                  <li class="popup-content__list-item">Age:<span class="list-item__age">${petsData[n].age}</span></li>
                  <li class="popup-content__list-item">Inoculations:<span class="list-item__inoculations">${petsData[n].inoculations}</span></li>
                  <li class="popup-content__list-item">Diseases:<span class="list-item__diseases">${petsData[n].diseases}</span></li>
                  <li class="popup-content__list-item">Parasites:<span class="list-item__parasites">${petsData[n].parasites}</span></li>
                </ul>
            </div>
        </div>`

    popup.innerHTML = modalContainer
    overlay.classList.remove('hidden')

    body.style.overflow = 'hidden'

    popup.onclick = () => closeModal()

    popup.addEventListener('click', () => { closeModal() })


}
overlay.addEventListener('click', () => { closeModal() })

export function closeModal() {
    popup.innerHTML = ''
    body.style.overflow = 'scroll'
    popup.classList.remove('active')
    overlay.classList.add('hidden')
}

