import { SourcesData } from '../../types/types';
import AppLoader from './appLoader';
import * as endpoints from '../../constants/endpoints';

class AppController extends AppLoader {
    getSources(callback: (data?: SourcesData) => void) {
        super.getResponce(
            {
                endpoint: endpoints.ENDPOINTS.sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: SourcesData) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResponce(
                        {
                            endpoint: endpoints.ENDPOINTS.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
