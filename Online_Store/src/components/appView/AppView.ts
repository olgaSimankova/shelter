// import { BookData } from '../types/types'
// import productsData from '../assets/scripts/products_data.json'
import './appView.css';

import footerRssImg from '../../assets/icons/logo_rs2.svg';
import headerImg from '../../assets/icons/book_logo.png';

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
    <div class="chart"><i class="fa fa-shopping-basket" aria-hidden="true"></i></div>`;
}

// function filtersRender() {

// }

function footerRender() {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories">Visit my GitHub</a>
    <span class="copyright">Book Store 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${footerRssImg}" alt="RSS icon"></a>`;
}

export { footerRender, headerRender };
