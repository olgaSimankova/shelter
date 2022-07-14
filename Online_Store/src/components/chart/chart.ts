import { BookData } from '../../types/types';
import productsData from '../../assets/scripts/products_data.json';
import './chart.css';

const chart: BookData[] = []; //Массив корзины

function showChart() {
    document.querySelector('.chart__wrapper')?.classList.add('open');
}

function hideChart() {
    document.querySelector('.chart__wrapper')?.classList.remove('open');
}

function updateChart(chartData: BookData[]) {
    (document.querySelector('.chart__container') as HTMLElement).innerHTML = '';
    (document.querySelector('.chart__container') as HTMLElement).append(chartRender(chartData));
    updateChartIco();
}

function updateChartIco() {
    const chartCounter = document.querySelector('.goods_in_chart') as HTMLElement;
    if (chart.length === 0 && !chartCounter.classList.contains('empty')) {
        chartCounter.classList.add('empty');
    } else {
        chartCounter.innerText = `${chart.length}`;
        chartCounter.classList.remove('empty');
    }
}

function updateCardBtn(id: string, btn: HTMLElement) {
    chart.forEach((elem) => {
        if (elem.id === id) {
            btn.classList.add('btn__in_chart');
            btn.innerText = 'in chart';
        } else {
            btn.classList.remove('btn__in_chart');
            btn.innerText = 'add to chart';
        }
    });
}

function chartRender(chartData: BookData[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    let total = 0;
    if (chartData.length !== 0) {
        for (let i = 0; i < chartData.length; i++) {
            const productInChart: HTMLDivElement = document.createElement('div');
            productInChart.className = 'product_in_chart';
            productInChart.dataset.id = chartData[i].id;
            productInChart.innerHTML = `<h5 class="book__info-title">${chartData[i].name}</h5>
            <span class="book__info-price">$${chartData[i].price * (chartData[i].qtyInChart || 1)}</span>
            <span class="quantity">              ${chartData[i].qtyInChart || 1}</span>
            <span class="remove_from_chart"><i class="fa fa-trash" aria-hidden="true"></i></span>`;
            total += chartData[i].price * (chartData[i].qtyInChart || 1);
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
    sumTotal.textContent = `Total: $${total}`;

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

function addToChart(item: BookData, chartData: BookData[] = chart) {
    if (chartData.length < 20) {
        if (item.inChart) {
            item.qtyInChart++;
        } else {
            chartData.push(item);
            item.inChart = true;
            item.qtyInChart = 1;
            updateChart(chartData);
            updateChartIco();
        }
    } else {
        alert('Сорян, согласно ТЗ данного задания, вы не можете добавить в корзину более 20 товаров.');
    }
}

function removeFromChart(id: string) {
    new Promise<number>((resolve, reject) => {
        resolve(productsData.findIndex((item: BookData) => item.id === id));
        reject(new Error('Something awful happened'));
    })
        .then((idx) => {
            productsData[idx].inChart = false;
            productsData[idx].qtyInChart = 0;
        })
        .catch((err) => console.log('favorite error: ' + err));

    new Promise<number>((resolve, reject) => {
        resolve(chart.findIndex((item: BookData) => item.id === id));
        reject(new Error('Something awful happened'));
    })
        .then((idx) => chart.splice(idx, 1))
        .then(() => updateChart(chart))
        .then(updateChartIco)
        .then(() => {
            document.querySelectorAll<HTMLButtonElement>('add-to-chart').forEach((btn: HTMLButtonElement) => updateCardBtn(id, btn))
        })
        
    //Полагаю, код работал бы и без промисов, но полезно было с ними разобраться

    
}

export { showChart, hideChart, addToChart, chartRender, chart, updateCardBtn, removeFromChart };
