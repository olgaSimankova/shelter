import productsData from '../../assets/scripts/products_data.json';
import './appView.css';
import footerRssImg from '../../assets/icons/logo_rs2.svg';
import headerImg from '../../assets/icons/book_logo.png';
import { BookData } from '../../types/types';
import { BOOKTYPES } from '../constants/constants';

const checkboxType = document.querySelector('.checkbox_type_block') as HTMLElement;
const checkboxCategory = document.querySelector('.checkbox_category_block') as HTMLElement;
const checkboxPublisher = document.querySelector('.checkbox_publisher_block') as HTMLElement;
const sortingContainer = document.querySelector('.sorting_wrapper') as HTMLElement;

function headerRender() {
    return `<img src="${headerImg}" alt="BookStore">
    <h1 class="header_title">Book store</h1>
    <div class="search_box">
        <div class="searchIcon">
            <i id="icon" class="fas fa-search"></i>
        </div>
        <div class="input"><input id="searchInput" type="text" placeholder="search" autofocus autocomplete="off"></div>
        <span class="clear"></span>
    </div>
    <div class="chart"><i class="fa fa-shopping-basket" aria-hidden="true"></i><span class="goods_in_chart empty"></span></div>`;
}

function getCategories(productsData?: BookData[]) {
    const categoriesArr: string[][] = [];
    productsData?.forEach((item) => {
        categoriesArr.push(item.category as string[]);
    });
    return new Set(categoriesArr.flat());
}

function categoriesCheckboxRender() {
    const categories: Set<string> = getCategories(productsData);
    const ul: HTMLElement = document.createElement('ul');
    ul.className = 'category-filter-content';
    categories.forEach((category) => {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = `<input class="category_checkbox__filter checkbox__filter" value="${category}" type="checkbox" id="${category}">
        <label class="category_checkbox__label checkbox__label" for="${category}">${category}</label>`;
        ul.append(li);
    });
    return ul;
}

checkboxCategory.append(categoriesCheckboxRender());

function getPublishers() {
    const publishersArr: string[] = [];
    productsData.forEach((item) => {
        publishersArr.push(item.publisher as string);
    });
    return new Set(publishersArr.flat());
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

checkboxPublisher?.append(publishersCheckboxRender());

function typeCheckboxRender() {
    const types: string[] = BOOKTYPES;
    const ul: HTMLElement = document.createElement('ul');
    ul.className = 'type-filter-content';
    types.forEach((type) => {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = `<input class="type_checkbox__filter checkbox__filter" value="${type}" type="checkbox" id="${type}">
        <label class="type_checkbox__label checkbox__label" for="${type}">${type}</label>`;
        ul.append(li);
    });
    return ul;
}

checkboxType.append(typeCheckboxRender());

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

if (sortingContainer) {
    sortingContainer.innerHTML = sortingSelectRender();
}

function footerRender() {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories">Visit my GitHub</a>
    <span class="copyright">Book Store 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${footerRssImg}" alt="RSS icon"></a>`;
}

export { footerRender, headerRender, getCategories };
