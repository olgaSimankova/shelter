import { BookData } from '../../types/types';
import './chart.css';

const chart: [BookData, number][] = []; //Массив корзины

function showChart() {
    document.querySelector('.chart__wrapper')?.classList.add('open');
}

function hideChart() {
    document.querySelector('.chart__wrapper')?.classList.remove('open');
}

function updateChart(chartData: [BookData, number][]) {
    // const newChart = chartRender(chartData) as DocumentFragment;
    (document.querySelector('.chart__container') as HTMLElement).innerHTML = '';
    (document.querySelector('.chart__container') as HTMLElement).append(chartRender(chartData));
}

// const chartlist: HTMLDivElement = document.createElement('div');
// chartlist.className = 'chart__container';

function chartRender(chartData: [BookData, number][]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    let total = 0;
    if (chartData.length !== 0) {
        for (let i = 0; i < chartData.length; i++) {
            const productInChart: HTMLDivElement = document.createElement('div');
            productInChart.innerHTML = `<h5 class="book__info-title">${chartData[i][0].name}</h5>
            <span class="book__info-price">$${chartData[i][0].price * chartData[i][1]}</span>;
            <span class="quantity">              ${chartData[i][1]}</span>`;
            total += chartData[i][0].price * chartData[i][1];
            fragment.append(productInChart);
        }
    } else {
        const emptyChart = document.createElement('span');
        emptyChart.textContent = 'Your chart is empty :(';
        fragment.append(emptyChart);
    }

    const sumTotal: HTMLDivElement = document.createElement('div');
    sumTotal.className = 'sum__total';
    sumTotal.textContent = `Total: $${total}`;

    fragment.append(sumTotal);

    return fragment;
}

function addToChart(item: BookData, chartData: [BookData, number][] = chart) {
    if (chartData.length < 20) {
        let isAlreadyInChart = false;
        for (let i = 0; i < chartData.length; i++) {
            if (chartData[i][0].name === item.name) {
                chartData[i][1]++;
                isAlreadyInChart = true;
            }
        }
        if (!isAlreadyInChart) chartData.push([item, 1]);
        updateChart(chartData);
    } else {
        alert('Сорян, согласно ТЗ данного задания, вы не можете добавить в корзину более 20 товаров.');
    }
}

export { showChart, hideChart, addToChart, chartRender, chart };
