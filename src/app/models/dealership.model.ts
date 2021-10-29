import { Car } from "./car.model";

export interface Dealership {
    id?: number;
    name: string;
    location: string;
    totalBudget: number;
    remainingBudget: number;
    owner: User;
    cars: Car[];
}

interface User {
    firstname: string;
    lastname: string;
}