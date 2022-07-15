import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { searchAndRerender } from './search/search';
import { showChart, hideChart, chartRender, chart, addToChart, updateCardBtn, removeFromChart } from './chart/chart';
import { applyAllFilters, resetAllFilters } from './filters/filters';
import { sortBy } from './sorting/sorting';

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
            updateCardBtn(btn);
        }
    });

    // Removing from chart
    window.addEventListener('click', function (event: MouseEvent) {
        if ((event.target as Element).classList.contains('fa-trash')) {
            const cardToRemoveId = ((event.target as HTMLElement).closest('.product_in_chart') as HTMLElement).dataset
                .id as string;
            removeFromChart(cardToRemoveId);

            document.querySelectorAll<HTMLButtonElement>('.add-to-chart').forEach((btn: HTMLButtonElement) => {
                if ((btn.parentNode as HTMLDivElement).dataset.id === cardToRemoveId) {
                    btn.classList.remove('btn__in_chart');
                    btn.innerText = 'add to chart';
                }
            });
        }
    });

    // implement category checkbox filter (OMG, it wasn't easy)
    window.addEventListener('click', (event: MouseEvent) => {
        const productsOnPage: BookData[] = [...productsData];
        if (
            (event.target as HTMLElement).classList.contains('checkbox__label') ||
            (event.target as HTMLElement).classList.contains('checkbox__filter')
        ) {
            const filteredProducts = applyAllFilters(productsOnPage);
            main.innerHTML = '';
            if (filteredProducts.length === 0) {
                const noMatches = document.createElement('div');
                noMatches.className = 'no_matches';
                noMatches.innerText = 'Sorry, no matches found';
                main.appendChild(noMatches);
            } else {
                main.appendChild(productsListRender(filteredProducts));
            }
        }
    });

    window.addEventListener('click', function (event: MouseEvent) {
        const productsOnPage: BookData[] = [...productsData];
        if ((event.target as Element).classList.contains('reset_filters')) {
            resetAllFilters();
            const filteredProducts = applyAllFilters(productsOnPage);
            main.innerHTML = '';
            main.appendChild(productsListRender(filteredProducts));
        }
    });

    (document.getElementById('sorting__select') as HTMLSelectElement).addEventListener('change', function () {
        const option = this.value;
        const filteredProducts = applyAllFilters(productsData);
        sortBy(filteredProducts, option);
        main.innerHTML = '';
        main.appendChild(productsListRender(filteredProducts));
    });
}

export { appStart };
