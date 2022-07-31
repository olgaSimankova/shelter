import { TODO } from '../../../constants/constants';
import { createCar, removeCar, updateCar } from '../../API/api';
import { getNewCarData } from '../../controllers/garage-car-loader';
import { renderCarsContainer } from './garage-section';

export const listenCar = (): void => {
    const garage = document.querySelector('.garage_section');
    let selectedCarId = '';
    garage?.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('car_create_btn')) {
            const newCarData = getNewCarData(TODO.create);
            await createCar(newCarData);
            renderCarsContainer();
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
                console.log('update ' + selectedCarId);
                renderCarsContainer();
            }
        }
    });
};
