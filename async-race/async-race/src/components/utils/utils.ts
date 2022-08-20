import { carBrand, carModel } from '../../assets/scripts/cars-data';
import { NEW_CARS_QTY } from '../../constants/constants';

const getRandomName = (): string => {
    const brand: string = carBrand[Math.round(Math.random() * carBrand.length)];
    const model: string = carModel[Math.round(Math.random() * carModel.length)];
    return `${brand} ${model}`;
};

const getRandomColor = (): string => {
    const colorPossibleChars = '0123456789ABCDEF';
    let color = '#';
    const colorLength = 6;
    for (let i = 0; i < colorLength; i++) {
        color += colorPossibleChars[Math.floor(Math.random() * colorPossibleChars.length)];
    }
    return color;
};

export const generateCars = (length = NEW_CARS_QTY) => {
    const cars = new Array(length).fill(1);
    for (let i = 0; i < length; i++) {
        cars[i] = { name: getRandomName(), color: getRandomColor() };
    }
    return cars;
};

export const fillCarUpdateField = (carName: string, carColor: string) => {
    const name = document.querySelector('.car_update_name') as HTMLInputElement;
    name.value = carName;
    const color = document.querySelector('.car_update_color') as HTMLInputElement;
    color.value = carColor;
};

export const toggleUpdateFormDisability = (bool: boolean) => {
    (document.querySelector('.car_update_name') as HTMLInputElement).disabled = bool;
    (document.querySelector('.car_update_color') as HTMLInputElement).disabled = bool;
    const btn = document.querySelector('.car_update_btn') as HTMLInputElement;
    btn.disabled = bool;
    btn.classList.toggle('disabled', bool);
};

export const getSorting = (sort: string, order: string) => (sort && order ? `&_sort=${sort}&_order=${order}` : '');
