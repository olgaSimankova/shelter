import { CARS_ON_Page, NOT_FOUND } from '../../constants/constants';
import { INewCar, IWinner } from '../../types/types';
import { getSorting } from '../utils/utils';

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

const getCars = async (page: number, limit = CARS_ON_Page) => {
    const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
        items: (await responce.json()) as INewCar[],
        count: responce.headers.get('X-Total-Count') as string,
    };
};

const getCar = async (id: string): Promise<INewCar> => (await fetch(`${garage}/${id}`, { method: 'GET' })).json();

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

const getWinners = async (page: number, limit = 10, sort: string, order: string) => {
    const responce = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSorting(sort, order)}`).catch();
    const items = (await responce.json()) as IWinner[];

    return {
        items: await Promise.all(items.map(async (winner) => ({ ...winner, car: await getCar(winner.id) }))),
        count: responce.headers.get('X-Total-Count'),
    };
};

const getWinner = async (id: string) => {
    const responce = await fetch(`${winners}/${id}`);
    return responce.json();
};

const updateWinnerInfo = async (id: string, newCarData: INewCar) => {
    const winner = await getWinner(id);
    const newWinnerData = Object.assign(winner, newCarData);
    (
        await fetch(`${winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newWinnerData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

const getWinnerStatus = async (id: string) => (await fetch(`${winners}/${id}`)).status;

const removeWinner = async (id: string) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

const createWinner = async (body: IWinner) =>
    (
        await fetch(winners, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

const updateWinner = async (id: string, body: IWinner) =>
    (
        await fetch(`${winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

async function setWinner(id: string, time: number): Promise<void> {
    try {
        const winnerStatus = await getWinnerStatus(id);

        if (winnerStatus === NOT_FOUND) {
            await createWinner({
                id,
                wins: 1,
                time,
            });
        } else {
            const winner = await getWinner(id);
            await updateWinner(id, {
                id,
                wins: winner.wins + 1,
                time: time < winner.time ? time : winner.time,
            });
        }
    } catch {
        console.log('404 - это не ошибка');
    }
}

export {
    getCars,
    getCar,
    createCar,
    removeCar,
    updateCar,
    startEngine,
    stopEngine,
    drive,
    getSorting,
    getWinners,
    removeWinner,
    setWinner,
    updateWinnerInfo,
};
