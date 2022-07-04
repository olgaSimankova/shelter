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

    start(): void {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data as SourcesData))
            );
        this.controller.getSources((data) => this.view.drawSources(data as SourcesData));
    }
}

export default App;
