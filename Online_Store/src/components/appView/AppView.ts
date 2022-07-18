// import { BookData } from '../../types/types';
import productsData from '../../assets/scripts/products_data.json';
import './appView.css';

import footerRssImg from '../../assets/icons/logo_rs2.svg';
import headerImg from '../../assets/icons/book_logo.png';
import { setChecked } from '../filters/filters';

const checkboxType = document.querySelector('.checkbox_type_block') as HTMLElement;
const checkboxCategory = document.querySelector('.checkbox_category_block') as HTMLElement;
const checkboxPublisher = document.querySelector('.checkbox_publisher_block') as HTMLElement;
const sortingContainer = document.querySelector('.sorting_wrapper') as HTMLElement;

function headerRender() {
    return `<img src="${headerImg}" alt="BookStore">
    <h1 class="header_title">Book store</h1>
    <div class="search_box">
        <div class="icon">
            <i id="search" class="fas fa-search"></i>
        </div>
        <div class="input"><input id="input" type="text" placeholder="search" autofocus autocomplete="off"></div>
        <span class="clear"></span>
    </div>
    <div class="chart"><i class="fa fa-shopping-basket" aria-hidden="true"></i><span class="goods_in_chart empty"></span></div>`;
}

// Наша база данных меняется, категории могут появиться новые, поэтому рендерим их динамически

// -------------------------------------------- DRY принцип? -------------------------------------------------------
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
        li.innerHTML = `<input class="categ_checkbox__filter checkbox__filter" value="${categ}" type="checkbox" id="${categ}">
        <label class="categ_checkbox__label checkbox__label" for="${categ}">${categ}</label>`;
        ul.append(li);
    });
    return ul;
}

checkboxCategory.append(categoriesCheckboxRender());
if (localStorage.getItem('categoryFilter')) {
    setChecked('.categ_checkbox__filter', JSON.parse(localStorage.getItem('categoryFilter') as string));
}

function getPublishers() {
    const publishersArr: string[] = [];
    productsData.forEach((item) => {
        publishersArr.push(item.publisher as string);
    });
    const publishers = new Set(publishersArr.flat());
    return publishers;
}

function publishersCheckboxRender() {
    const publishers: Set<string> = getPublishers();
    const ul: HTMLElement = document.createElement('ul');
    ul.className = 'publisher-filter-content';
    publishers.forEach((publisher) => {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = `<input class="publish_checkbox__filter checkbox__filter" value="${publisher}" type="checkbox" id="${publisher}">
        <label class="publish_checkbox__label checkbox__label" for="${publisher}">${publisher}</label>`;
        ul.append(li);
    });
    return ul;
}

checkboxPublisher.append(publishersCheckboxRender());
if (localStorage.getItem('publisherFilter')) {
    setChecked('.publish_checkbox__filter', JSON.parse(localStorage.getItem('publisherFilter') as string));
}

function typeCheckboxRender() {
    const types: string[] = ['Self-Help', 'Fiction', "Сhildren's book"];
    const ul: HTMLElement = document.createElement('ul');
    ul.className = 'publisher-filter-content';
    types.forEach((type) => {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = `<input class="type_checkbox__filter checkbox__filter" value="${type}" type="checkbox" id="${type}">
        <label class="type_checkbox__label checkbox__label" for="${type}">${type}</label>`;
        ul.append(li);
    });
    return ul;
}

checkboxType.append(typeCheckboxRender());
// -------------------------------------------- DRY принцип? -------------------------------------------------------
// ------------------------------------------- не, не слышала ------------------------------------------------------

function sortingSelectRender() {
    return `<label>Sort by: </label>
    <div class="select">
    <select id="sorting__select">
        <option value="">Choose an option</option>
        <option value="name_a">name a-z</option>                        
        <option value="name_z">name z-a</option>                        
        <option value="price_min">price min</option>                        
        <option value="price_max">price max</option>
    </select>
    </div>`;
}

sortingContainer.innerHTML = sortingSelectRender();

function footerRender() {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories">Visit my GitHub</a>
    <span class="copyright">Book Store 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${footerRssImg}" alt="RSS icon"></a>`;
}

export { footerRender, headerRender };
