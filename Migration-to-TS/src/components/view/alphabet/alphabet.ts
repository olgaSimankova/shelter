import './alphabet.css';

class Alphabet {
    draw(data: string[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();

        data.forEach((item: string): void => {
            const button = document.createElement('button');
            button.innerHTML = item;
            button.setAttribute('id', `${item}`);

            button.classList.add('alphabet__char__button');
            if (item == 'A') button.classList.add('active');

            fragment.append(button);
        });
        (document.querySelector('.alphabet') as HTMLElement).append(fragment);
    }
}

export default Alphabet;
