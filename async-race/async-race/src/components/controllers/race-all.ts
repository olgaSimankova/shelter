import { INewCar, IRacePromise } from '../../types/types';
import { getCars } from '../API/api';
import state from '../state/state';
import { driveCar, stopDriving } from './drive-car';

const raceAll = async (promises: Promise<IRacePromise>[], ids: string[]): Promise<IRacePromise> => {
    const { success, id, time } = await Promise.race(promises);
    // const { items } = await getCars('1');
    // const carWinner: INewCar = items.find((car: INewCar) => car.id === id);

    if (!success) {
        const failedIndex = ids.findIndex((index) => index === id);
        const restPromises = [...promises.slice(failedIndex + 1, promises.length)];
        const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
        return raceAll(restPromises, restIds);
    }

    return { id: id, time: +(time / 1000).toFixed(2) };
};

export const race = async () => {
    const { items } = await getCars(1);
    const promises = items.map(({ id }) => driveCar(id));
    const winner = raceAll(
        promises,
        items.map((car) => car.id)
    );
    return winner;
};

export const getWinner = async (id: string) => {
    const carWinner = await getCars(1).then((items) => items.items.find((car: INewCar) => car.id === id));
    return carWinner;
};

export const resetAll = async () => {
    const { items } = await getCars(state.carsPage);
    items.forEach(({ id }) => stopDriving(id));
};
