import { SourcesData } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    changeSources(event: Event): void {
        const target = event.target as HTMLElement;
        const sourceButtons = document.querySelectorAll('.source__item');
        sourceButtons.forEach((btn) => {
            if (btn.innerHTML[0] == target.innerHTML) {
                (btn as HTMLElement).style.display = 'inline-block';
            } else {
                (btn as HTMLElement).style.display = 'none';
            }
        });
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: SourcesData) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => {
            if (data) {
                this.view.drawAlphabet(data as SourcesData);
            }
        });

        setTimeout(() => {
            const alphabetButtons = document.querySelectorAll('.alphabet__char__button');
            function changeClassActive(event: Event): void {
                const target = event.target as HTMLElement;
                alphabetButtons.forEach((btn) => btn.classList.remove('active'));
                target.classList.add('active');
            }
            alphabetButtons.forEach((btn) => btn.addEventListener('click', changeClassActive));
            alphabetButtons.forEach((btn) => btn.addEventListener('click', this.changeSources));
        }, 2000);

        this.controller.getSources((data) => this.view.drawSources(data as SourcesData, 'A'));
    }
}

export default App;
