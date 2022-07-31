import flagImg from '../../assets/img/finish.png';
import { INewCar } from '../../types/types';
import { carSVGImage } from './create-car-svg';

function getCarImg(color: string): HTMLSpanElement {
    const img: HTMLElement = document.createElement('span');
    img.setAttribute('class', 'car');
    img.innerHTML = carSVGImage(color);
    return img;
}

function getroadButtons() {
    const roadBtns: HTMLElement = document.createElement('div');
    roadBtns.setAttribute('class', 'road_buttons');
    roadBtns.innerHTML = `<a href="#" class="car_btn_a active">A</a>
    <a href="#" class="car_btn_b">B</a>`;
    return roadBtns;
}

function getFlagImg(): HTMLImageElement {
    const flag: HTMLImageElement = document.createElement('img');
    flag.setAttribute('class', 'flag');
    flag.setAttribute('src', `${flagImg}`);
    return flag;
}

function renderCarOnroad(color: string): HTMLElement {
    const road: HTMLElement = document.createElement('div');
    road.setAttribute('class', 'road');
    road.append(getroadButtons());
    road.append(getCarImg(color), getFlagImg());

    return road;
}

function getCarBtnsAndName(carName: string): HTMLElement {
    const carBtns = document.createElement('div');
    carBtns.setAttribute('class', 'car_buttons');
    carBtns.innerHTML = `<button class="btn btn_car_select">select</button>
                        <button class="btn btn_car_remove">remove</button>
                        <span class="car_name">${carName}</span>`;
    return carBtns;
}

function getCarItemContainer(carData: INewCar): HTMLElement {
    const carContainer = document.createElement('div');
    carContainer.setAttribute('class', 'car_container');
    carContainer.append(getCarBtnsAndName(carData.name), renderCarOnroad(carData.color));
    return carContainer;
}

export { getCarItemContainer };
