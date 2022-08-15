import { drive, startEngine, stopEngine } from '../API/api';

export const driveCar = async (id: string): Promise<{ success: boolean; id: string; time: number }> => {
    const startBtn = document.getElementById(`car_start_${id}`) as HTMLButtonElement;
    startBtn.classList.toggle('active', false);
    startBtn.disabled = true;

    const stopBtn = document.getElementById(`car_stop_${id}`) as HTMLButtonElement;
    stopBtn.classList.toggle('active', true);
    stopBtn.disabled = false;

    const { velocity, distance } = await startEngine(id);
    const time: number = Math.round(distance / velocity);

    startBtn.classList.toggle('active', false);
    (document.getElementById(`car_stop_${id}`) as HTMLButtonElement).disabled = false;

    const car = document.querySelector(`.car_${id}`) as HTMLElement;
    car.style.animation = `drive ${time}ms linear 0s`;
    car.style.animationFillMode = `forwards`;
    car.style.animationPlayState = 'running';
    const response = await drive(id);
    const { success } = response;
    if (!success) {
        car.style.animationPlayState = 'paused';
    }
    return { success, id, time };
};

export const stopDriving = async (id: string): Promise<void> => {
    const stopBtn = document.getElementById(`car_stop_${id}`) as HTMLButtonElement;
    stopBtn.disabled = true;
    stopBtn.classList.toggle('active', true);

    const startBtn = document.getElementById(`car_start_${id}`) as HTMLButtonElement;
    startBtn.classList.toggle('active', true);
    startBtn.disabled = true;

    await stopEngine(id);
    stopBtn.classList.toggle('active', false);
    (document.getElementById(`car_start_${id}`) as HTMLButtonElement).disabled = false;

    const car = document.querySelector(`.car_${id}`) as HTMLElement;
    car.style.animation = 'none';
};
