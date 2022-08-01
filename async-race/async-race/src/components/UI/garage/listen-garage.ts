import { TODO } from '../../../constants/constants';
import { INewCar } from '../../../types/types';
import { createCar, removeCar, updateCar } from '../../API/api';
import { driveCar, stopDriving } from '../../controllers/drive-car';
import { getNewCarData } from '../../controllers/garage-car-loader';
import { generateCars } from '../../utils/utils';
import { renderCarsContainer } from './garage-section';

export const listenGarage = (): void => {
    const garage = document.querySelector('.garage_section');
    let selectedCarId = '';
    garage?.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('car_create_btn')) {
            const newCarData = getNewCarData(TODO.create);
            if (!newCarData.name) {
                alert('Please, enter new car name');
            } else {
                await createCar(newCarData);
                renderCarsContainer();
            }
        }
        if ((event.target as HTMLElement).classList.contains('btn_car_remove')) {
            const id = (event.target as HTMLElement).id;
            await removeCar(+id);
            renderCarsContainer();
        }
        if ((event.target as HTMLElement).classList.contains('btn_car_select')) {
            selectedCarId = (event.target as HTMLElement).id;
        }
        if ((event.target as HTMLElement).classList.contains('car_update_btn')) {
            if (selectedCarId) {
                const newCarData = getNewCarData(TODO.update);
                await updateCar(+selectedCarId, newCarData);
                renderCarsContainer();
            }
        }
        if ((event.target as HTMLElement).id === 'generate') {
            const carsArray: INewCar[] = generateCars();
            console.log(carsArray);
            carsArray.forEach(async (carData) => await createCar(carData));
            renderCarsContainer();
        }
    });
};

export const listenCars = (): void => {
    const carsContainer = document.querySelector('.garage_section') as HTMLElement;
    carsContainer.addEventListener('click', (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('car_btn_start')) {
            const carId = (event.target as HTMLElement).id.split('car_start_')[1];
            driveCar(+carId);
        }
        if ((event.target as HTMLElement).classList.contains('car_btn_stop')) {
            const carId = (event.target as HTMLElement).id.split('car_stop_')[1];
            stopDriving(+carId);
        }
    });
};
