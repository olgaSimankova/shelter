import { getAllChecked, resetAllFilters, setChecked } from '../filters/filters';
import { chart, emptyChart } from '../chart/chart';
import * as noUiSlider from 'nouislider';
import { BookData } from '../../types/types';
import {
    MAINPRODUCTSCONTAINER,
    SLIDERPAGEMAX,
    SLIDERPAGEMIN,
    SLIDERPRICEMAX,
    SLIDERPRICEMIN,
} from '../constants/constants';
import { productsListRender } from '../products/products';
import productsData from '../../assets/scripts/products_data.json';

function setLocalStorage() {
    const checkboxesChecked = getAllChecked();
    if (checkboxesChecked.length) {
        localStorage.setItem('checkboxFilters', JSON.stringify(checkboxesChecked));
    }

    const sliderPrice = document.getElementById('slider__price') as noUiSlider.target;
    const valuesPrice = (sliderPrice as noUiSlider.target).noUiSlider?.get() as string[];
    if (parseInt(valuesPrice[0]) !== SLIDERPRICEMIN || parseInt(valuesPrice[1]) !== SLIDERPRICEMAX) {
        localStorage.setItem('sliderPrice', JSON.stringify(valuesPrice));
    }

    const sliderPage = document.getElementById('slider__pages') as noUiSlider.target;
    const valuesPage = (sliderPage as noUiSlider.target).noUiSlider?.get() as string[];
    if (parseInt(valuesPage[0]) !== SLIDERPAGEMIN || parseInt(valuesPage[1]) !== SLIDERPAGEMAX) {
        localStorage.setItem('sliderPage', JSON.stringify(valuesPage));
    }

    const sortingOption = (document.getElementById('sorting__select') as HTMLSelectElement).value;
    if (sortingOption) {
        localStorage.setItem('sortingOption', sortingOption);
    }

    if (chart.length) {
        localStorage.setItem('chart', JSON.stringify(chart));
    }
}

function getLocalStorage() {
    if (localStorage.getItem('checkboxFilters')) {
        setChecked(JSON.parse(localStorage.getItem('checkboxFilters') as string));
    }

    if (localStorage.getItem('sliderPrice')) {
        const sliderPrice = document.getElementById('slider__price') as noUiSlider.target;
        sliderPrice.noUiSlider?.set(JSON.parse(localStorage.getItem('sliderPrice') as string));
    }
    if (localStorage.getItem('sliderPage')) {
        const sliderPage = document.querySelector('#slider__pages') as noUiSlider.target;
        sliderPage.noUiSlider?.set(JSON.parse(localStorage.getItem('sliderPage') as string));
    }

    if (localStorage.getItem('sortingOption')) {
        (document.getElementById('sorting__select') as HTMLSelectElement).value = localStorage.getItem(
            'sortingOption'
        ) as string;
    }
    if (localStorage.getItem('chart')) {
        const storedChartArr = Array.from(JSON.parse(localStorage.getItem('chart') as string)) as BookData[];

        setTimeout(() => {
            const btnArr = Array.from(
                document.querySelectorAll('.add-to-chart') as NodeListOf<HTMLButtonElement>
            ) as HTMLButtonElement[];
            for (let i = 0; i < storedChartArr.length; i++) {
                for (let j = 0; j < btnArr.length; j++) {
                    if (btnArr[j].id === storedChartArr[i].id) {
                        btnArr[j].click();
                    }
                }
            }
        }, 1000);
    }
}

function clearLocalStorage(event: MouseEvent) {
    if ((event.target as Element).classList.contains('reset_storage')) {
        localStorage.clear();
        emptyChart();
        resetAllFilters(event);
        const uncheck: HTMLInputElement[] = Array.from(document.getElementsByTagName('input'));
        uncheck.forEach((element) => {
            if (element.type === 'checkbox') {
                element.checked = false;
            }
        });
        (document.getElementById('sorting__select') as HTMLSelectElement).value = '';
        (document.getElementById('searchInput') as HTMLInputElement).value = '';
        MAINPRODUCTSCONTAINER.innerHTML = '';
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(productsData));
    }
}

export { setLocalStorage, getLocalStorage, clearLocalStorage };
