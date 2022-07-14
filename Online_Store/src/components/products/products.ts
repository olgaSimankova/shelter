import { BookData } from '../../types/types';
import './products.css';

function productRender(item: BookData) {
    const bookItem: HTMLDivElement = document.createElement('div');
    bookItem.className = 'book__item';
    bookItem.dataset.id = item.id;
    // require(`../../assets/img/${item.cover}`);
    const bookCover: HTMLImageElement = document.createElement('img');
    bookCover.className = 'book__cover';
    bookCover.setAttribute(
        'src',
        `https://www.kindpng.com/picc/m/114-1145859_transparent-book-png-transparent-circle-icon-book-png.png`
    );
    const bookInfo: HTMLDivElement = document.createElement('div');
    bookInfo.dataset.id = item.id;
    bookInfo.className = 'book__info';
    bookInfo.innerHTML = `<p class="book__info-price">$${item.price}</p>
    <h2 class="book__info-title">${item.name}</h2>
    <h3 class="book__info-author">${item.author}</h3>
    <button class="btn add-to-chart">add to chart</button>`;

    bookItem.append(bookCover, bookInfo);
    return bookItem;
}

function productsListRender(data: BookData[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();

    data.forEach((item: BookData) => {
        const bookItem = productRender(item);
        fragment.append(bookItem);
    });

    return fragment as DocumentFragment;
}

export { productsListRender };
