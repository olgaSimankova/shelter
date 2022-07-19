import News from './news/news';
import Sources from './sources/sources';
import { Article, SourcesData, Source } from '../../types/types';
import Alphabet from './alphabet/alphabet';

export class AppView {
    news: News;
    sources: Sources;
    alphabet: Alphabet;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.alphabet = new Alphabet();
    }

    getAlphabet(data: Source[]) {
        const charsArr: string[] = [];
        data.forEach((item: Source): void => {
            const char: string = item.name[0].toUpperCase();
            if (!charsArr.includes(char)) charsArr.push(char);
        });
        return charsArr.sort();
    }

    drawAlphabet(data: SourcesData) {
        const values = this.getAlphabet(data?.sources || []);
        this.alphabet.draw(values);
    }

    drawNews(data: SourcesData) {
        const values: Article[] = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: SourcesData, atChar: string) {
        const values: Source[] = data?.sources || [];
        this.sources.draw(values, atChar);
    }
}

export default AppView;
