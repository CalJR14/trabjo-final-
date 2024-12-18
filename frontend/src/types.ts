
export interface Item {
    _id: string;
    name: string;
    genre: string;
    cost: number;
}

export interface Action {
    type: string;
    item?: Item;
    id?: string;
}