import { carBrand, carModel } from '../../assets/scripts/cars-data';

const getRandomName = (): string => {
    const brand: string = carBrand[Math.round(Math.random() * carBrand.length)];
    const model: string = carModel[Math.round(Math.random() * carModel.length)];
    return `${brand} ${model}`;
};

const getRandomColor = (): string => {
    const colorPossibleChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += colorPossibleChars[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const generateCars = (length = 100) => {
    const cars = new Array(length).fill(1);
    for (let i = 0; i < length; i++) {
        cars[i] = { name: getRandomName(), color: getRandomColor() };
    }
    return cars;
};
