import { createCar } from '../../API/api';
import { getNewCarBody } from '../../controllers/garage-car-loader';

export const listenCar = (): void => {
    const garage = document.querySelector('.garage_section');
    garage?.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('car_create_btn')) {
            const newCarData = getNewCarBody();
            async () => await createCar(newCarData);
        }
    });
};
