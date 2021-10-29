import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";

import { Dealership } from "../../models/dealership.model";


export enum DealershipActionTypes {
    LOAD_DEALERSHIPS = "[DEALERSHIP] Load dealerships",
    LOAD_DEALERSHIPS_SUCCESS = "[DEALERSHIP] Load dealerships Success",
    LOAD_DEALERSHIPS_FAIL = "[DEALERSHIP] Load dealerships Fail",

    CREATE_DEALERSHIP = "[DEALERSHIP] Create dealership",
    CREATE_DEALERSHIP_SUCCESS = "[DEALERSHIP] Create dealership Success",
    CREATE_DEALERSHIP_FAIL = "[DEALERSHIP] Create dealership Fail",

    UPDATE_DEALERSHIP = "[DEALERSHIP] Update dealership",
    UPDATE_DEALERSHIP_SUCCESS = "[DEALERSHIP] Update dealership Success",
    UPDATE_DEALERSHIP_FAIL = "[DEALERSHIP] Update dealership Fail",

    DELETE_DEALERSHIP = "[DEALERSHIP] Delete dealership",
    DELETE_DEALERSHIP_SUCCESS = "[DEALERSHIP] Delete dealership Success",
    DELETE_DEALERSHIP_FAIL = "[DEALERSHIP] Delete dealership Fail",

    SEARCH_DEALERSHIP = "[DEALERSHIP] Search dealership",
    SEARCH_DEALERSHIP_SUCCESS = "[DEALERSHIP] Search dealership success",
    SEARCH_DEALERSHIP_FAIL = "[DEALERSHIP] Search dealership fail",

    SORT_DEALERSHIP = "[DEALERSHIP] Sort dealership",
    SORT_DEALERSHIP_SUCCESS = "[DEALERSHIP] Sort dealership success",
    SORT_DEALERSHIP_FAIL = "[DEALERSHIP] Sort dealership fail",
}

/**
 * Dealerships list
 */
export class LoadDealerships implements Action {
    readonly type = DealershipActionTypes.LOAD_DEALERSHIPS;
}

export class LoadDealershipsSuccess implements Action {
    readonly type = DealershipActionTypes.LOAD_DEALERSHIPS_SUCCESS;

    constructor(public payload: Dealership[]) {}
}

export class LoadDealershipsFail implements Action {
    readonly type = DealershipActionTypes.LOAD_DEALERSHIPS_FAIL;

    constructor(public payload: string) {}
}

/**
 * Dealearship creation
 */
export class CreateDealership implements Action {
    readonly type = DealershipActionTypes.CREATE_DEALERSHIP;

    constructor(public payload: Dealership) {}
}

export class CreateDealershipSuccess implements Action {
    readonly type = DealershipActionTypes.CREATE_DEALERSHIP_SUCCESS;

    constructor(public payload: Dealership) {}
}

export class CreateDealershipFail implements Action {
    readonly type = DealershipActionTypes.CREATE_DEALERSHIP_FAIL;

    constructor(public payload: string) {}
}

// Dealearship update
export class UpdateDealership implements Action {
    readonly type = DealershipActionTypes.UPDATE_DEALERSHIP;

    constructor(public payload: Dealership) {}
}

export class UpdateDealershipSuccess implements Action {
    readonly type = DealershipActionTypes.UPDATE_DEALERSHIP_SUCCESS;

    constructor(public payload: Update<Dealership>) {}
}

export class UpdateDealershipFail implements Action {
    readonly type = DealershipActionTypes.UPDATE_DEALERSHIP_FAIL;

    constructor(public payload: string) {}
}

/**
 *  Dealearship delete
 */
export class DeleteDealership implements Action {
    readonly type = DealershipActionTypes.DELETE_DEALERSHIP;

    constructor(public payload: number) {}
}

export class DeleteDealershipSuccess implements Action {
    readonly type = DealershipActionTypes.DELETE_DEALERSHIP_SUCCESS;

    constructor(public payload: number) {}
}

export class DeleteDealershipFail implements Action {
    readonly type = DealershipActionTypes.DELETE_DEALERSHIP_FAIL;

    constructor(public payload: string) {}
}

/**
 * SEARCH
 */
export class SearchDealership implements Action {
    readonly type = DealershipActionTypes.SEARCH_DEALERSHIP;

    constructor(public payload: string) {}
}

export class SearchDealershipSuccess implements Action {
    readonly type = DealershipActionTypes.SEARCH_DEALERSHIP_SUCCESS;

    constructor(public payload: Dealership[]) {}
}

export class SearchDealershipFail implements Action {
    readonly type = DealershipActionTypes.SEARCH_DEALERSHIP_FAIL;

    constructor(public payload: string) {}
}

/**
 * SORT
 * 
 */
 export class SortDealership implements Action {
    readonly type = DealershipActionTypes.SORT_DEALERSHIP;

    constructor(public payload: {active: string, direction: string}) {}
}

export class SortDealershipSuccess implements Action {
    readonly type = DealershipActionTypes.SORT_DEALERSHIP_SUCCESS;

    constructor(public payload: Dealership[]) {}
}

export class SortDealershipFail implements Action {
    readonly type = DealershipActionTypes.SORT_DEALERSHIP_FAIL;

    constructor(public payload: string) {}
}


export type DealershipAction = 
    LoadDealerships | 
    LoadDealershipsSuccess | 
    LoadDealershipsFail |
    CreateDealership |
    CreateDealershipSuccess |
    CreateDealershipFail |
    UpdateDealership |
    UpdateDealershipSuccess |
    UpdateDealershipFail |
    DeleteDealership |
    DeleteDealershipSuccess |
    DeleteDealershipFail |
    SearchDealership |
    SearchDealershipFail |
    SearchDealershipSuccess |
    SortDealership |
    SortDealershipSuccess |
    SortDealershipFail;
