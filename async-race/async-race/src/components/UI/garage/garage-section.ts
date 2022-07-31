import { getCars } from '../../API/api';
import { getCarItemContainer } from '../car-on-road-render';

function getGarageSection(): HTMLDivElement {
    const garageSection = document.createElement('div');
    garageSection.setAttribute('class', 'garage_section');
    garageSection.prepend(getGarageTitle());
    garageSection.append(getGarageControllersContainer('create'));
    garageSection.append(getGarageControllersContainer('update'));
    garageSection.append(getGarageRaceButtons(), getGarageContainer());
    return garageSection;
}

function getGarageTitle(): HTMLElement {
    const garageTitleContainer = document.createElement('div');
    garageTitleContainer.innerHTML = `<h2 class="section_title">Garage</h2>
    <span class="garage_counter"></span>`;
    return garageTitleContainer;
}

function getGarageControllersContainer(todo: string): HTMLDivElement {
    const carCreateSection = document.createElement('div');
    carCreateSection.setAttribute('class', `car_${todo}`);
    carCreateSection.innerHTML = `
    <input type="text" class="car_${todo}_name">
    <input type="color" class="car_${todo}_color" id="${todo}" name="${todo}" value="#ffffff">
    <button class="btn garage_btn car_${todo}_btn">${todo}</button>`;
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
    const { items, count } = await getCars('1');
    const carsContainer = document.querySelector('.cars_container') as HTMLElement;
    carsContainer.innerHTML = '';
    const carsCounterElement = document.querySelector('.garage_counter') as HTMLElement;
    carsCounterElement.innerText = `(${count})`;

    for (let i = 1; i < items.length; i++) {
        const carItem: HTMLElement = getCarItemContainer(items[i]);
        carsContainer.append(carItem);
    }
}

function getGarageContainer(): HTMLElement {
    const garageCarsContainer = document.createElement('div');
    garageCarsContainer.setAttribute('class', 'garage_container');
    const garagePageTitle = document.createElement('h3');
    garageCarsContainer.setAttribute('class', 'page_title');
    garageCarsContainer.setAttribute('innerText', 'Page #1');
    const carsContainer = document.createElement('div');
    carsContainer.setAttribute('class', 'cars_container garage_slide slide');
    garageCarsContainer.append(garagePageTitle, carsContainer);
    renderCarsContainer();
    return garageCarsContainer;
}

export { getGarageSection, renderCarsContainer };
