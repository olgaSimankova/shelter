import { IRacePromise } from '../../types/types';
import { getCars } from '../API/api';
import state from '../state/state';
import { driveCar, stopDriving } from './drive-car';

const raceAll = async (promises: Promise<IRacePromise>[], ids: string[]): Promise<IRacePromise> => {
    const { success, id, time } = await Promise.any(promises);

    if (!success) {
        const failedIndex = ids.findIndex((index) => index === id);
        const restPromises = [...promises.slice(failedIndex + 1, promises.length)];
        const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
        return raceAll(restPromises, restIds);
    }

    return { id: id, time: +(time / 1000).toFixed(2) };
};

export const race = async (): Promise<IRacePromise> => {
    const { items } = await getCars(state.carsPage);
    const promises = items.map(({ id }) => driveCar(id));
    const winner = raceAll(
        promises,
        items.map((car) => car.id)
    );
    return winner;
};

export const resetAll = async (): Promise<void> => {
    const { items } = await getCars(state.carsPage);
    items.forEach(({ id }) => stopDriving(id));
};
