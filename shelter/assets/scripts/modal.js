// ----------------OMG Modal----------------
// Ну че, погнали.. Где там наш попап?

const popup = document.querySelector(".modal-window__wrapper");
const overlay = document.querySelector('.overlay');

const openModal = (n) => {

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

function closeModal() {
    popup.innerHTML = ''
    body.style.overflow = 'scroll'
    popup.classList.remove('active')
    overlay.classList.add('hidden')
}

