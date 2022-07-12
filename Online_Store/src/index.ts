import './global.css';
import { footerRender, headerRender } from './components/AppView';
import { productsListRender } from './components/products/products';
import productsData from './assets/scripts/products_data.json'
import { BookData } from './types/types';

const header = document.querySelector('.header') as HTMLElement;
const main = document.querySelector('.books__container') as HTMLElement;
const footer = document.querySelector('.footer') as HTMLElement;

header.innerHTML = headerRender();

main.appendChild(productsListRender(productsData as BookData[]));

footer.innerHTML = footerRender();
