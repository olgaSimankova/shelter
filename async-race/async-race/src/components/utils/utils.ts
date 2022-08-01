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
    for (let i = 0; i < 6; i++) {
        color += colorPossibleChars[Math.floor(Math.random() * 16)];
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

// function animation(car: HTMLElement, distance: number, AnimationTime: number) {
//     let start: number = 0;
//     const state: IAnimationState = {id: () => {}};

//     function move(timestamp: number) {
//         if (!start) start = timestamp;
//         const time = timestamp - start;
//         const passed = Math.round(time * ( distance / AnimationTime))

//         car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

//         if (passed < distance) {
//             state.id = window.requestAnimationFrame(move)
//         }
//     }
//     state.id = window.requestAnimationFrame(move);

//     return state;
// }

export function getAnimation(car: HTMLElement, animationTime: number) {
    car.style.animation = `drive ${animationTime} ease 0s`;
}
// object.style.animation = "name duration timingFunction delay iterationCount direction fillMode playState"
