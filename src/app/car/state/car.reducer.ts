import { createSelector, createFeatureSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import * as fromRoot from "../../state/app.state";
import { Car } from "../../models/car.model";
import * as carActions from './car.action';


export interface CarState  extends EntityState<Car> {
    selectedCarId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    car: CarState;
  }

  export const defaultCar: CarState = {
    ids: [],
    entities: {},
    selectedCarId: null,
    loading: false,
    loaded: false,
    error: ""
  };

export const carAdapter: EntityAdapter<Car> = createEntityAdapter<
Car
>();
export const initialState = carAdapter.getInitialState(defaultCar);

export function carReducer(state = initialState, action: carActions.CarAction) {
    switch (action.type) {

        case carActions.CarActionTypes.LOAD_CARS: {
            return {
                ...state,
                loading: true,
            }
        }

        case carActions.CarActionTypes.LOAD_CARS_SUCCESS: {
            return carAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case carActions.CarActionTypes.LOAD_CARS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                cars: [],
                error: action.payload
            }
        }
        case carActions.CarActionTypes.CREATE_CAR_SUCCESS: {
            return carAdapter.addOne(action.payload, state);
        }

        case carActions.CarActionTypes.CREATE_CAR_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case carActions.CarActionTypes.UPDATE_CAR_SUCCESS: {
            return carAdapter.updateOne(action.payload, state);
        }
        
          case carActions.CarActionTypes.UPDATE_CAR_FAIL: {
            return {
              ...state,
              error: action.payload
            };
          }

          case carActions.CarActionTypes.DELETE_CAR_SUCCESS: {
            return carAdapter.removeOne(action.payload, state);
          }

          case carActions.CarActionTypes.DELETE_CAR_FAIL: {
            return {
              ...state,
              error: action.payload
            };
          }

        case carActions.CarActionTypes.SEARCH_CAR_SUCCESS: {
            return carAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case carActions.CarActionTypes.SEARCH_CAR_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                cars: [],
                error: action.payload
            }
        }

        case carActions.CarActionTypes.SORT_CAR_SUCCESS: {
            return carAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case carActions.CarActionTypes.SORT_CAR_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                cars: [],
                error: action.payload
            }
        }
        default: return state;
    }
}

// Selectors
const getcarFeatureState = createFeatureSelector<CarState>("car");
export const getCars = createSelector(getcarFeatureState,  carAdapter.getSelectors().selectAll);