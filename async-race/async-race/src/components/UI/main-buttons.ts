import { showGarage, showWinners } from '../controllers/switch-pages';

const mainButtonsContainer = createMainButtons();

function createButton(btnClass: string, btnInnerText: string, btnEventListener: () => void) {
    const btn = document.createElement('button');
    btn.setAttribute('class', `${btnClass}`);
    btn.innerText = btnInnerText;
    btn.addEventListener('click', btnEventListener);
    return btn;
}

function createMainButtons(): HTMLElement {
    const container: HTMLElement = document.createElement('div');
    container.setAttribute('class', 'main_buttons_container');
    container.append(createButton('main_btn garage', 'to garage', showGarage));
    container.append(createButton('main_btn winners', 'to winners', showWinners));
    return container;
}

export { createButton, mainButtonsContainer };
