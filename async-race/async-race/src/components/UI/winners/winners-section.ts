import { WINNERS_ON_Page } from '../../../constants/constants';
import { getWinners } from '../../API/api';
import state from '../../state/state';
import { getCarImg } from '../car-on-road-render';

async function getWinnersContainer(): Promise<HTMLElement> {
    const { items, count } = await getWinners(state.winnersPage, WINNERS_ON_Page, state.sortBy, state.sortOrder);
    if (count) state.winnersQuantity = +count;
    const section = document.createElement('div');
    section.setAttribute('class', 'winners_section');
    section.innerHTML = `<h2 class="section_title">Winners</h2>
    <span class="winners_counter section_counter">(${count})</span>
    <div class='pagination winners_pagination'>
        <h3 class="page_title">Page</h3><span class="winners_page_number page_number">#${state.winnersPage}</span>
        <button class="prev_page btn">back</button>
        <button class="next_page btn">next</button>
    </div>`;
    const winnersSorting = document.createElement('div');
    winnersSorting.setAttribute('class', 'select');

    winnersSorting.innerHTML = `<label for="sort-winners">Sort winners by:</label>
    <div class="select">
    <select id="sort-winners">
    <option value='id ASC'>id &uarr;</option>
    <option value='id DESC'>id &darr;</option>            
    <option value='wins ASC'>wins &uarr;</option>
    <option value='wins DESC'>wins &darr;</option>
    <option value='time ASC'>time &uarr;</option>
    <option value='time DESC'>time &darr;</option>            
    </select>
    </div>`;
    let innerTable = '<table><tr><th>No</th><th>IMG</th><th>Name</th><th>Wins</th><th>Time</th></tr>';
    for (let i = 0; i < items.length; i++) {
        const img = getCarImg(items[i].car.color, items[i].id);
        innerTable += `<tr><td>${items[i].id}</td><td>${img.innerHTML}</td><td>${items[i].car.name}</td><td>${items[i].wins}</td><td>${items[i].time}</td></tr>`;
    }
    innerTable += '</table>';
    section.innerHTML += winnersSorting.innerHTML;
    section.innerHTML += innerTable;
    return section;
}

async function updateWinnersContainer() {
    const { items, count } = await getWinners(state.winnersPage, WINNERS_ON_Page, state.sortBy, state.sortOrder);
    (document.querySelector('.winners_counter') as HTMLElement).innerText = `(${count})`;
    const pageNumber = document.querySelector('.winners_page_number') as HTMLElement;
    pageNumber.innerText = `#${state.winnersPage}`;
    const table = document.querySelector('table');
    (table as HTMLElement).innerHTML = '';
    let innerTable = '<table><tr><th>No</th><th>IMG</th><th>Name</th><th>Wins</th><th>Time</th></tr>';
    for (let i = 0; i < items.length; i++) {
        const img = getCarImg(items[i].car.color, items[i].id);
        innerTable += `<tr><td>${items[i].id}</td><td>${img.innerHTML}</td><td>${items[i].car.name}</td><td>${items[i].wins}</td><td>${items[i].time}</td></tr>`;
    }
    innerTable += '</table>';
    (table as HTMLElement).innerHTML = innerTable;
}

export { getWinnersContainer, updateWinnersContainer };
