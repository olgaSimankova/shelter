import './sources.css';
import { Source } from '../../../types/types';

class Sources {
    draw(data: Source[], atChar = 'A') {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Source): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            if (item.name[0] == atChar) {
                (sourceClone.querySelector('.source__item') as HTMLElement).style.display = 'inline-block';
            } else {
                (sourceClone.querySelector('.source__item') as HTMLElement).style.display = 'none';
            }

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
