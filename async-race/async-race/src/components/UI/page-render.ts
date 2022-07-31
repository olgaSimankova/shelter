import RSSImg from '../../assets/img/logo_rs2.svg';
import GHImg from '../../assets/img/github_icon.svg';
import { mainButtonsContainer } from './main-buttons';
import { getGarageSection } from './garage/garage-section';

const mainContainer = document.querySelector('.main_container') as HTMLElement;

function pageRender() {
    (document.querySelector('.header') as HTMLElement).innerHTML = headerRender();
    mainContainer.prepend(mainButtonsContainer);
    mainContainer.append(getGarageSection());
    (document.querySelector('.footer') as HTMLElement).innerHTML = footerRender();
}

function headerRender(): string {
    return `<h1>Async Race</h1>`;
}

function footerRender(): string {
    return `<a class="footer__github" href="https://github.com/olgaSimankova?tab=repositories"><img src="${GHImg}" alt="GH icon"></a>
    <span class="copyright">Async race 2022</span>
    <a class="footer__rss" href="https://rs.school/js/"><img src="${RSSImg}" alt="RSS icon"></a>`;
}

export { pageRender };
