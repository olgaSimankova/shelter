import { CARS_ON_Page } from '../../constants/constants';
import { INewCar } from '../../types/types';

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
// const winners = `${base}/winners`;

const getCars = async (page: number, limit = CARS_ON_Page) => {
    const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
        items: (await responce.json()) as INewCar[],
        count: responce.headers.get('X-Total-Count') as string,
    };
};

const getCar = async (id: string): Promise<INewCar> => {
    const car = (await fetch(`${garage}/${id}`, { method: 'GET' })).json();
    return car;
};

const createCar = async (body: INewCar) => {
    const responce = await fetch(garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return {
        item: (await responce.json()) as INewCar,
    };
};

const removeCar = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

const updateCar = async (id: number, newCarData: INewCar) =>
    (
        await fetch(`${garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newCarData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

const startEngine = async (id: string) =>
    (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

const stopEngine = async (id: string) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

const drive = async (id: string): Promise<{ success: boolean }> => {
    const result = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    return result.status !== 200 ? { success: false } : { ...(await result.json()) };
};

export { getCars, getCar, createCar, removeCar, updateCar, startEngine, stopEngine, drive };
