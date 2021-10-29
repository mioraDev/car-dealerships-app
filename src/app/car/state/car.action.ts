import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";

import { Car } from "../../models/car.model";


export enum CarActionTypes {
    LOAD_CARS = "[CAR] Load cars",
    LOAD_CARS_SUCCESS = "[CAR] Load cars Success",
    LOAD_CARS_FAIL = "[CAR] Load cars Fail",

    CREATE_CAR = "[CAR] Create car",
    CREATE_CAR_SUCCESS = "[CAR] Create car Success",
    CREATE_CAR_FAIL = "[CAR] Create car Fail",

    UPDATE_CAR = "[CAR] Update car",
    UPDATE_CAR_SUCCESS = "[CAR] Update car Success",
    UPDATE_CAR_FAIL = "[CAR] Update car Fail",

    DELETE_CAR = "[CAR] Delete car",
    DELETE_CAR_SUCCESS = "[CAR] Delete car Success",
    DELETE_CAR_FAIL = "[CAR] Delete car Fail",

    SEARCH_CAR = "[CAR] Search car",
    SEARCH_CAR_SUCCESS = "[CAR] Search car success",
    SEARCH_CAR_FAIL = "[CAR] Search car fail",

    SORT_CAR = "[CAR] Sort car",
    SORT_CAR_SUCCESS = "[CAR] Sort car success",
    SORT_CAR_FAIL = "[CAR] Sort car fail",
}

/**
 * Cars list
 */
export class LoadCars implements Action {
    readonly type = CarActionTypes.LOAD_CARS;

    constructor(public payload: number) {}
}

export class LoadCarsSuccess implements Action {
    readonly type = CarActionTypes.LOAD_CARS_SUCCESS;

    constructor(public payload: Car[]) {}
}

export class LoadCarsFail implements Action {
    readonly type = CarActionTypes.LOAD_CARS_FAIL;

    constructor(public payload: string) {}
}

/**
 * Dealearship creation
 */
export class CreateCar implements Action {
    readonly type = CarActionTypes.CREATE_CAR;

    constructor(public payload: {car: Car, dealershipId: number}) {}
}

export class CreateCarSuccess implements Action {
    readonly type = CarActionTypes.CREATE_CAR_SUCCESS;

    constructor(public payload: Car) {}
}

export class CreateCarFail implements Action {
    readonly type = CarActionTypes.CREATE_CAR_FAIL;

    constructor(public payload: string) {}
}

// Dealearship update
export class UpdateCar implements Action {
    readonly type = CarActionTypes.UPDATE_CAR;

    constructor(public payload: {car: Car, dealershipId: number}) {}
}

export class UpdateCarSuccess implements Action {
    readonly type = CarActionTypes.UPDATE_CAR_SUCCESS;

    constructor(public payload: Update<Car>) {}
}

export class UpdateCarFail implements Action {
    readonly type = CarActionTypes.UPDATE_CAR_FAIL;

    constructor(public payload: string) {}
}

/**
 *  Dealearship delete
 */
export class DeleteCar implements Action {
    readonly type = CarActionTypes.DELETE_CAR;

    constructor(public payload: {carId: number, dealershipId: number}) {}
}

export class DeleteCarSuccess implements Action {
    readonly type = CarActionTypes.DELETE_CAR_SUCCESS;

    constructor(public payload: number) {}
}

export class DeleteCarFail implements Action {
    readonly type = CarActionTypes.DELETE_CAR_FAIL;

    constructor(public payload: string) {}
}

/**
 * SEARCH
 */
export class SearchCar implements Action {
    readonly type = CarActionTypes.SEARCH_CAR;

    constructor(public payload: {text: string, dealershipId:number}) {}
}

export class SearchCarSuccess implements Action {
    readonly type = CarActionTypes.SEARCH_CAR_SUCCESS;

    constructor(public payload: Car[]) {}
}

export class SearchCarFail implements Action {
    readonly type = CarActionTypes.SEARCH_CAR_FAIL;

    constructor(public payload: string) {}
}

/**
 * SORT
 * 
 */
 export class SortCar implements Action {
    readonly type = CarActionTypes.SORT_CAR;

    constructor(public payload: {active: string, direction: string, dealershipId: number}) {}
}

export class SortCarSuccess implements Action {
    readonly type = CarActionTypes.SORT_CAR_SUCCESS;

    constructor(public payload: Car[]) {}
}

export class SortCarFail implements Action {
    readonly type = CarActionTypes.SORT_CAR_FAIL;

    constructor(public payload: string) {}
}


export type CarAction = 
    LoadCars | 
    LoadCarsSuccess | 
    LoadCarsFail |
    CreateCar |
    CreateCarSuccess |
    CreateCarFail |
    UpdateCar |
    UpdateCarSuccess |
    UpdateCarFail |
    DeleteCar |
    DeleteCarSuccess |
    DeleteCarFail |
    SearchCar |
    SearchCarFail |
    SearchCarSuccess |
    SortCar |
    SortCarSuccess |
    SortCarFail;
