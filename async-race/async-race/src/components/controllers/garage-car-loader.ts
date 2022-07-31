import { INewCar } from '../../types/types';

function getNewCarData(todo: string): INewCar {
    const carData = {} as INewCar;
    carData.name = (document.querySelector(`.car_${todo}_name`) as HTMLInputElement).value as string;
    carData.color = (document.querySelector(`.car_${todo}_color`) as HTMLInputElement).value as string;
    (document.querySelector(`.car_${todo}_name`) as HTMLInputElement).value = '';
    (document.querySelector(`.car_${todo}_color`) as HTMLInputElement).value = '#ffffff';
    return carData;
}

export { getNewCarData };
