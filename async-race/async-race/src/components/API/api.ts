import { INewCar } from "../../types/types";

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

const getCars = async (page: string, limit = 7) => {
    const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
        items: await responce.json(),
        count: responce.headers.get('X-Total-Count'),
    };
}

const createCar = async (body: INewCar) => (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
})).json();

export {getCars, createCar}