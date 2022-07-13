import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { searchAndRerender } from './search/search';

function appStart() {
    const header = document.querySelector('.header') as HTMLElement;
    const main = document.querySelector('.books__container') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;

    header.innerHTML = headerRender();
    main.appendChild(productsListRender(productsData as BookData[]));
    footer.innerHTML = footerRender();

    //Implement search
    const searchField = document.querySelector('#input') as HTMLInputElement;
    const searchIcon = document.getElementById('search') as HTMLElement;

    searchIcon.onclick = () => searchAndRerender(searchField.value, productsData, main);

    //This is needed to make the search field work with 'enter' click
    searchField.addEventListener('keyup', function (event: KeyboardEvent) {
        event.preventDefault();

        if (event.keyCode === 13) searchAndRerender(searchField.value, productsData, main);
    });

    //     !!!!!!!!!!!  Надо еще при клике по крестику сделать так, чтоб все возвращалось, как было
}

export { appStart };