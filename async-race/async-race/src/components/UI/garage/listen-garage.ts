import { TODO } from '../../../constants/constants';
import { INewCar } from '../../../types/types';
import { createCar, getCar, removeCar, updateCar } from '../../API/api';
import { driveCar, stopDriving } from '../../controllers/drive-car';
import { race, getWinner, resetAll } from '../../controllers/race-all';
import { getNewCarData } from '../../controllers/garage-car-loader';
import { fillCarUpdateField, generateCars, toggleDisableUpdateForm } from '../../utils/utils';
import { updateCarsContainer } from './garage-section';

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
                updateCarsContainer();
            }
        }
        if ((event.target as HTMLElement).classList.contains('btn_car_remove')) {
            const id = (event.target as HTMLElement).id;
            await removeCar(+id);
            updateCarsContainer();
        }
        if ((event.target as HTMLElement).classList.contains('btn_car_select')) {
            selectedCarId = (event.target as HTMLElement).id;
            const { car } = await getCar(selectedCarId);
            toggleDisableUpdateForm();
            fillCarUpdateField(car.name, car.color);
        }
        if ((event.target as HTMLElement).classList.contains('car_update_btn')) {
            if (selectedCarId) {
                const newCarData = getNewCarData(TODO.update);
                await updateCar(+selectedCarId, newCarData);
                toggleDisableUpdateForm();
                await updateCarsContainer();
            }
        }
        if ((event.target as HTMLElement).id === 'generate') {
            const carsArray: INewCar[] = generateCars();
            console.log(carsArray);
            carsArray.forEach(async (carData) => await createCar(carData));
            updateCarsContainer();
        }
    });
};

export const listenCars = (): void => {
    const carsContainer = document.querySelector('.garage_section') as HTMLElement;
    carsContainer.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('car_btn_start')) {
            const carId = (event.target as HTMLElement).id.split('car_start_')[1];
            driveCar(carId);
        }
        if ((event.target as HTMLElement).classList.contains('car_btn_stop')) {
            const carId = (event.target as HTMLElement).id.split('car_stop_')[1];
            stopDriving(carId);
        }
        if ((event.target as HTMLElement).id === 'race') {
            const { id, time } = await race();
            const winner = getWinner(id);
            console.log(winner, time);
        }
        if ((event.target as HTMLElement).id === 'race-reset') {
            resetAll();
        }
    });
};
