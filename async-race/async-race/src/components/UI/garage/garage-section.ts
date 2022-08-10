import { getCars } from '../../API/api';
import state from '../../state/state';
import { getCarItemContainer } from '../car-on-road-render';
import { renderWinnerModal } from './show-winner';

function getGarageSection(): HTMLDivElement {
    const garageSection = document.createElement('div');
    garageSection.setAttribute('class', 'garage_section');
    garageSection.prepend(getGarageTitle());
    garageSection.append(getGarageControllersContainer('create'));
    garageSection.append(getGarageControllersContainer('update') as HTMLElement);

    garageSection.append(getGarageRaceButtons(), getGarageContainer());
    garageSection.append(renderWinnerModal());
    return garageSection;
}

function getGarageTitle(): HTMLElement {
    const garageTitleContainer = document.createElement('div');
    garageTitleContainer.innerHTML = `<h2 class="section_title">Garage</h2>
    <span class="section_counter garage_counter"></span>`;
    return garageTitleContainer;
}

function getGarageControllersContainer(todo: string): HTMLDivElement {
    const carCreateSection = document.createElement('div');
    carCreateSection.setAttribute('class', `car_${todo}`);
    const disable = todo === 'update' ? 'disabled' : '';
    carCreateSection.innerHTML = `
    <input type="text" class="car_${todo}_name ${disable}" ${disable}>
    <input type="color" class="car_${todo}_color ${disable}" id="${todo}" name="${todo}" value="#ffffff" ${disable}>
    <button class="btn garage_btn car_${todo}_btn ${disable}" ${disable}>${todo}</button>`;
    return carCreateSection;
}

function getGarageRaceButtons() {
    const raceBtns = document.createElement('div');
    raceBtns.setAttribute('class', `garage_buttons_container`);
    raceBtns.innerHTML = `<button class="btn garage_btn" id="race">RACE</button>
    <button class="btn garage_btn" id="race-reset">RESET</button>
    <button class="btn garage_btn btn_wide" id="generate">GENERATE CARS</button>`;
    return raceBtns;
}

async function renderCarsContainer(): Promise<void> {
    const { items, count } = await getCars(state.carsPage);
    state.carsQuantity = +count;
    const carsContainer = document.querySelector('.cars_container') as HTMLElement;
    carsContainer.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        const carItem: HTMLElement = getCarItemContainer(items[i]);
        carsContainer.append(carItem);
    }
    const carsCounterElement = document.querySelector('.section_counter') as HTMLElement;
    carsCounterElement.innerText = `(${count})`;
}

function getGarageContainer(): HTMLElement {
    const garageCarsContainer = document.createElement('div');
    garageCarsContainer.setAttribute('class', 'garage_container');
    const garagePagination = document.createElement('div');
    garagePagination.setAttribute('class', 'pagination');
    garagePagination.innerHTML = `<h3 class="page_title">Page</h3><span class="page_number">${state.carsPage}</span>
    <div class='pagination_btns'>
    <button class="prev_page btn">prev</button>
    <button class="next_page btn">next</button>
    </div>`;
    const carsContainer = document.createElement('div');
    carsContainer.setAttribute('class', 'cars_container');
    garageCarsContainer.append(garagePagination, carsContainer);
    renderCarsContainer();
    return garageCarsContainer;
}

async function updateCarsContainer() {
    const { items, count } = await getCars(state.carsPage);
    state.carsQuantity = +count;
    const carsContainer = document.querySelector('.cars_container') as HTMLElement;
    (document.querySelector('.page_number') as HTMLElement).innerText = `${state.carsPage}`;
    carsContainer.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        const carItem: HTMLElement = getCarItemContainer(items[i]);
        carsContainer.append(carItem);
    }
    const carsCounterElement = document.querySelector('.garage_counter') as HTMLElement;
    carsCounterElement.innerText = `(${count})`;
}

export { getGarageSection, updateCarsContainer };
