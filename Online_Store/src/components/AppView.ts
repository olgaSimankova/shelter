// import { BookData } from '../types/types'
// import productsData from '../assets/scripts/products_data.json'
import './appView.css'

import footerRssImg from '../assets/icons/logo_rs2.svg'
import headerImg from '../assets/icons/book_logo.png'

function headerRender() {
    return `<img src="${headerImg}" alt="BookStore">
    <h1 class="header_title">Book store</h1>`
}

// function appRender() {
        
//         return 

// }

function footerRender() {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories">Visit my GitHub</a>
    <span class="copyright">Book Store 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${footerRssImg}" alt="RSS icon"></a>`
}

export { footerRender, headerRender}