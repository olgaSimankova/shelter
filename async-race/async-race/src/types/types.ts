export interface INewCar {
    name: string;
    color: string;
    id: string;
}

export interface IRacePromise {
    id: string;
    time: number;
    success?: boolean;
}

export interface IWinner {
    id: string;
    wins: number;
    time: number;
}
