import { getChecked, setChecked } from '../filters/filters';
import { chart } from '../chart/chart';
import * as noUiSlider from 'nouislider';
import { BookData } from '../../types/types';
import { SLIDERPAGEMAX, SLIDERPAGEMIN, SLIDERPRICEMAX, SLIDERPRICEMIN } from '../constants/constants';

function setLocalStorage() {
    const categoriesChecked: string[] = getChecked('.categ_checkbox__filter');
    if (categoriesChecked.length !== 0) {
        localStorage.setItem('categoryFilter', JSON.stringify(categoriesChecked));
    }

    const publishersChecked: string[] = getChecked('.publish_checkbox__filter');
    if (publishersChecked.length !== 0) {
        localStorage.setItem('publisherFilter', JSON.stringify(publishersChecked));
    }

    const typesChecked: string[] = getChecked('.type_checkbox__filter');
    if (typesChecked.length !== 0) {
        localStorage.setItem('typeFilter', JSON.stringify(typesChecked));
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
    if (sortingOption !== '') {
        localStorage.setItem('sortingOption', sortingOption);
    }

    if (chart.length !== 0) {
        localStorage.setItem('chart', JSON.stringify(chart));
    }
}

function getLocalStorage() {
    // console.log(localStorage);
    if (localStorage.getItem('categoryFilter')) {
        setChecked('.categ_checkbox__filter', JSON.parse(localStorage.getItem('categoryFilter') as string));
    }

    if (localStorage.getItem('publisherFilter')) {
        setChecked('.publish_checkbox__filter', JSON.parse(localStorage.getItem('publisherFilter') as string));
    }

    if (localStorage.getItem('typeFilter')) {
        setChecked('.type_checkbox__filter', JSON.parse(localStorage.getItem('typeFilter') as string));
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
            for (let i = 0; i < btnArr.length; i++) {
                for (let j = 0; j < storedChartArr.length; j++) {
                    if (btnArr[i].id === storedChartArr[j].id) {
                        btnArr[i].click(); // Хотела эмулировать нажатие на кнопку "добавить в корзину", но увы.. Так не работает
                    }
                }
            }
        }, 1000);
    }
}

export { setLocalStorage, getLocalStorage };
