import { INewCar } from '../../types/types';

function getNewCarBody(): INewCar {
    const carData = {} as INewCar;
    carData.name = (document.querySelector('.car_create_name') as HTMLInputElement).value as string;
    carData.color = (document.querySelector('.car_create_color') as HTMLInputElement).value as string;
    return carData;
}

export { getNewCarBody };
