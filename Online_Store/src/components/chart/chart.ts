import { BookData } from '../../types/types';
import productsData from '../../assets/scripts/products_data.json';
import './chart.css';
import { MAXCHARTLENGTH, MINPRODUCTSQTYINCHART } from '../constants/constants';

const chart: BookData[] = [];

function showChart() {
    document.querySelector('.chart__wrapper')?.classList.add('open');
}

function hideChart() {
    document.querySelector('.chart__wrapper')?.classList.remove('open');
}

function updateChart(chartData: BookData[]) {
    (document.querySelector('.chart__container') as HTMLElement).innerHTML = '';
    (document.querySelector('.chart__container') as HTMLElement).append(chartRender(chartData));
    updateChartIcon();
}

function updateChartIcon() {
    const chartCounter = document.querySelector('.goods_in_chart') as HTMLElement;
    if (!chart.length && !chartCounter.classList.contains('empty')) {
        chartCounter.classList.add('empty');
    } else {
        chartCounter.innerText = `${chart.length}`;
        chartCounter.classList.remove('empty');
    }
}

function updateCardBtn(btn: HTMLElement) {
    btn.classList.toggle('btn__in_chart');
    btn.innerText = btn.classList.contains('btn__in_chart') ? 'in chart' : 'add to chart';
}

function chartRender(chartData: BookData[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    let total = 0;
    if (chartData.length) {
        for (let i = 0; i < chartData.length; i++) {
            const productInChart: HTMLDivElement = document.createElement('div');
            productInChart.className = 'product_in_chart';
            productInChart.dataset.id = chartData[i].id;
            productInChart.innerHTML = `<h5 class="book__info-title">${chartData[i].name}</h5>
            <span class="book__info-price">$${chartData[i].price * (chartData[i].qtyInChart || 1)}</span>
            <span class="quantity">              ${chartData[i].qtyInChart || 1}</span>
            <span class="remove_from_chart"><i class="fa fa-trash" aria-hidden="true"></i></span>`;
            total += chartData[i].price * (chartData[i].qtyInChart || MINPRODUCTSQTYINCHART);
            fragment.append(productInChart);
        }
    } else {
        const emptyChart = document.createElement('span');
        emptyChart.textContent = 'Your chart is empty :(';
        fragment.append(emptyChart);
    }

    const summary: HTMLDivElement = document.createElement('div');
    summary.className = 'chart__summary';

    const sumTotal: HTMLDivElement = document.createElement('div');
    sumTotal.className = 'sum__total';
    sumTotal.textContent = `Total: $${total.toFixed(2)}`;

    const btnMakeOrder: HTMLButtonElement = document.createElement('button');
    btnMakeOrder.className = 'btn btn-mk-order';
    btnMakeOrder.textContent = 'Order';
    btnMakeOrder.onclick = () => {
        alert('Here you should be redirected to checkout page');
    };

    summary.append(sumTotal, btnMakeOrder);

    fragment.append(summary);

    return fragment;
}

function addToChart(event: MouseEvent) {
    if ((event.target as Element).classList.contains('add-to-chart')) {
        if (chart.length < MAXCHARTLENGTH) {
            const card = (event.target as HTMLElement).closest('.book__item') as HTMLElement;
            const btn = (event.target as HTMLElement).closest('.btn') as HTMLElement;
            const productInfo = productsData.find((object: BookData) => object.id === card.dataset.id) as BookData;

            if (productInfo.inChart) {
                productInfo.qtyInChart++;
            } else {
                chart.push(productInfo);
                productInfo.inChart = true;
                productInfo.qtyInChart = 1;
                updateChart(chart);
                updateChartIcon();
                updateCardBtn(btn);
            }
        } else {
            alert('Сорян, согласно ТЗ данного задания, вы не можете добавить в корзину более 20 товаров.');
        }
    }
}

function removeFromChart(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fa-trash')) {
        const cardToBeRemovedId = ((event.target as HTMLElement).closest('.product_in_chart') as HTMLElement).dataset
            .id as string;

        document.querySelectorAll<HTMLButtonElement>('.add-to-chart').forEach((btn) => {
            if ((btn.parentNode as HTMLDivElement).dataset.id === cardToBeRemovedId) updateCardBtn(btn);
        });

        new Promise<number>((resolve, reject) => {
            resolve(productsData.findIndex((item: BookData) => item.id === cardToBeRemovedId));
            reject(new Error('Something awful happened'));
        })
            .then((idx) => {
                productsData[idx].inChart = false;
                productsData[idx].qtyInChart = 0;
            })
            .catch((err) => console.log('favorite error: ' + err));

        new Promise<number>((resolve, reject) => {
            resolve(chart.findIndex((item: BookData) => item.id === cardToBeRemovedId));
            reject(new Error('Something awful happened'));
        })
            .then((idx) => chart.splice(idx, 1))
            .then(() => updateChart(chart))
            .then(updateChartIcon);
    }
}

function emptyChart() {
    chart.forEach((item) => {
        (productsData.find((element) => element.id === item.id) as BookData).inChart = false;
        (productsData.find((element) => element.id === item.id) as BookData).qtyInChart = 0;
    });

    document.querySelectorAll<HTMLButtonElement>('.add-to-chart').forEach((btn) => {
        if (btn.classList.contains('btn__in_chart')) updateCardBtn(btn);
    });

    chart.splice(0, chart.length);
    updateChart(chart);
    updateChartIcon();
}

export { showChart, hideChart, addToChart, chartRender, chart, updateCardBtn, removeFromChart, emptyChart };
