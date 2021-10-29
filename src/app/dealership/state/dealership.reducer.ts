import { createSelector, createFeatureSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import * as fromRoot from "../../state/app.state";
import { Dealership } from "../../models/dealership.model";
import * as dealerActions from './dealership.action';


export interface DealershipState  extends EntityState<Dealership> {
    selectedDealershipId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    dealership: DealershipState;
  }

  export const defaultDealership: DealershipState = {
    ids: [],
    entities: {},
    selectedDealershipId: null,
    loading: false,
    loaded: false,
    error: ""
  };

export const dealershipAdapter: EntityAdapter<Dealership> = createEntityAdapter<
Dealership
>();
export const initialState = dealershipAdapter.getInitialState(defaultDealership);

export function dealershipReducer(state = initialState, action: dealerActions.DealershipAction) {
    switch (action.type) {

        case dealerActions.DealershipActionTypes.LOAD_DEALERSHIPS: {
            return {
                ...state,
                loading: true,
            }
        }

        case dealerActions.DealershipActionTypes.LOAD_DEALERSHIPS_SUCCESS: {
            return dealershipAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case dealerActions.DealershipActionTypes.LOAD_DEALERSHIPS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                dealerships: [],
                error: action.payload
            }
        }
        case dealerActions.DealershipActionTypes.CREATE_DEALERSHIP_SUCCESS: {
            return dealershipAdapter.addOne(action.payload, state);
        }

        case dealerActions.DealershipActionTypes.CREATE_DEALERSHIP_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case dealerActions.DealershipActionTypes.UPDATE_DEALERSHIP_SUCCESS: {
            return dealershipAdapter.updateOne(action.payload, state);
        }
        
          case dealerActions.DealershipActionTypes.UPDATE_DEALERSHIP_FAIL: {
            return {
              ...state,
              error: action.payload
            };
          }

          case dealerActions.DealershipActionTypes.DELETE_DEALERSHIP_SUCCESS: {
            return dealershipAdapter.removeOne(action.payload, state);
          }

          case dealerActions.DealershipActionTypes.DELETE_DEALERSHIP_FAIL: {
            return {
              ...state,
              error: action.payload
            };
          }

        case dealerActions.DealershipActionTypes.SEARCH_DEALERSHIP_SUCCESS: {
            return dealershipAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case dealerActions.DealershipActionTypes.SEARCH_DEALERSHIP_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                dealerships: [],
                error: action.payload
            }
        }

        case dealerActions.DealershipActionTypes.SORT_DEALERSHIP_SUCCESS: {
            return dealershipAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case dealerActions.DealershipActionTypes.SORT_DEALERSHIP_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                dealerships: [],
                error: action.payload
            }
        }
        default: return state;
    }
}

// Selectors
const getDealerFeatureState = createFeatureSelector<DealershipState>("dealership");
export const getDealerships = createSelector(getDealerFeatureState,  dealershipAdapter.getSelectors().selectAll);