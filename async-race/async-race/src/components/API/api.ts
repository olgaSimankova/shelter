import { INewCar } from '../../types/types';

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

const getCars = async (page: string, limit = 10) => {
    const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
        items: (await responce.json()) as INewCar[],
        count: responce.headers.get('X-Total-Count') as string,
    };
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

export { getCars, createCar, removeCar, updateCar };
