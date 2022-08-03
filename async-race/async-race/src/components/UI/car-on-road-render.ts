import flagImg from '../../assets/img/finish.png';
import { INewCar } from '../../types/types';
import { carSVGImage } from './create-car-svg';

function getCarImg(color: string, id: string): HTMLSpanElement {
    const img: HTMLElement = document.createElement('span');
    img.setAttribute('class', `car_${id}`);
    img.innerHTML = carSVGImage(color);
    return img;
}

function getRoadButtons(carID: string) {
    const roadBtns: HTMLElement = document.createElement('div');
    roadBtns.setAttribute('class', 'road_buttons');
    roadBtns.innerHTML = `<button class="car_btn_start active" id="car_start_${carID}">A</button>
    <button class="car_btn_stop" id="car_stop_${carID}" disabled=true>B</button>`;
    return roadBtns;
}

function getFlagImg(id: string): HTMLImageElement {
    const flag: HTMLImageElement = document.createElement('img');
    flag.setAttribute('class', `flag flag_${id}`);
    flag.setAttribute('src', `${flagImg}`);
    return flag;
}

function renderCarOnRoad(color: string, carID: string): HTMLElement {
    const road: HTMLElement = document.createElement('div');
    road.setAttribute('class', 'road');
    road.append(getRoadButtons(carID));
    road.append(getCarImg(color, carID), getFlagImg(carID));

    return road;
}

function getCarBtnsAndName(carName: string, carID?: string): HTMLElement {
    const carBtns = document.createElement('div');
    carBtns.setAttribute('class', 'car_buttons');
    carBtns.innerHTML = `<button class="btn btn_car_select" id="${carID}">select</button>
                        <button class="btn btn_car_remove" id="${carID}">remove</button>
                        <span class="car_name" id="car_name_${carID}">${carName}</span>`;
    return carBtns;
}

function getCarItemContainer(carData: INewCar): HTMLElement {
    const carContainer = document.createElement('div');
    carContainer.setAttribute('class', 'car_container');
    carContainer.append(getCarBtnsAndName(carData.name, carData.id), renderCarOnRoad(carData.color, carData.id));
    return carContainer;
}

export { getCarItemContainer };
