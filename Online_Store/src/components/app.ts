import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { searchAndRerender } from './search/search';
import { showChart, hideChart, chartRender, chart, addToChart, updateCardBtn, removeFromChart } from './chart/chart';

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

    // Implement Chart
    const chartIcon = document.querySelector('.chart') as HTMLElement;
    chartIcon.onclick = () => showChart();

    const chartContainer = document.querySelector('.chart__container') as HTMLElement;
    chartContainer.append(chartRender(chart));

    const closeChart = document.querySelector('.close') as HTMLElement;
    closeChart.onclick = () => hideChart();

    // Adding to chart

    window.addEventListener('click', function (event: MouseEvent) {
        // console.log(event.target.hasAttribute('add-to-chart'));
        if ((event.target as Element).classList.contains('add-to-chart')) {
            const card = (event.target as HTMLElement).closest('.book__item') as HTMLElement;
            const btn = (event.target as HTMLElement).closest('.btn') as HTMLElement;
            const cardInfo = productsData.find((object: BookData) => object.id === card.dataset.id) as BookData;

            addToChart(cardInfo);
            updateCardBtn(cardInfo.id, btn);
        }
    });

    // Removing from chart
    window.addEventListener('click', function (event: MouseEvent) {
        if ((event.target as Element).classList.contains('fa-trash')) {
            const cardToRemoveId = ((event.target as HTMLElement).closest('.product_in_chart') as HTMLElement).dataset
                .id as string;
            removeFromChart(cardToRemoveId);
            document.querySelectorAll<HTMLButtonElement>('add-to-chart').forEach((btn: HTMLButtonElement) => updateCardBtn(cardToRemoveId, btn))

            // const productToRemove = productsData.find((object: BookData) => object.id === cardToRemove.dataset.id) as BookData;
        }
    });
}

export { appStart };
