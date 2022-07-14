// import { BookData } from '../../types/types';
import productsData from '../../assets/scripts/products_data.json';
import './appView.css';

import footerRssImg from '../../assets/icons/logo_rs2.svg';
import headerImg from '../../assets/icons/book_logo.png';

const checkbox = document.querySelector('.checkbox_category_block') as HTMLElement;

function headerRender() {
    return `<img src="${headerImg}" alt="BookStore">
    <h1 class="header_title">Book store</h1>
    <div class="search_box">
        <div class="icon">
            <i id="search" class="fas fa-search"></i>
        </div>
        <div class="input"><input id="input" type="text" placeholder="search" autofocus autocomplete="off"></div>
        <span class="clear" onclick="document.getElementById('input').value=''"></span>
    </div>
    <div class="chart"><i class="fa fa-shopping-basket" aria-hidden="true"></i><span class="goods_in_chart empty"></span></div>`;
}

// Наша база данных меняется, категории могут пояфиться новые, поэтому рендерим их динамически

function getCategories() {
    const categoriesArr: string[][] = [];
    productsData.forEach((item) => {
        categoriesArr.push(item.category as string[]);
    });
    const categories = new Set(categoriesArr.flat());
    return categories;
}

function categoriesCheckboxRender() {
    const categories: Set<string> = getCategories();
    const ul: HTMLElement = document.createElement('ul');
    ul.className = 'category-filter-content';
    categories.forEach((categ) => {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = `<input class="filter" data-filter="${categ}" type="checkbox" id="${categ}">
        <label class="checkbox-label" for="${categ}">${categ}</label>`;
        ul.append(li);
    });
    return ul;
}

checkbox.append(categoriesCheckboxRender());

// function sortingBlockRender() {
//     return '';
// }

// function filtersRender() {

// }

function footerRender() {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories">Visit my GitHub</a>
    <span class="copyright">Book Store 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${footerRssImg}" alt="RSS icon"></a>`;
}

export { footerRender, headerRender };
