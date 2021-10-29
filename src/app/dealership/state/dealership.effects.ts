import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { DealershipService } from "../dealership.service";
import * as dealershipActions from "./dealership.action"
import { Dealership } from "../../models/dealership.model";

@Injectable()
export class DealershipEffect {
    constructor(
        private actions$: Actions,
         private dealershipService: DealershipService
    ) {}

        loadDealerships$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<dealershipActions.LoadDealerships>(dealershipActions.DealershipActionTypes.LOAD_DEALERSHIPS),
            mergeMap((actions: dealershipActions.LoadDealerships) => 
                this.dealershipService.getDealerships().pipe(
                    map((dealerships: Dealership[]) => new dealershipActions.LoadDealershipsSuccess(dealerships)),
                    catchError(err => of(new dealershipActions.LoadDealershipsFail(err)))
                    )
                )
            )
        });

        createDealership$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<dealershipActions.CreateDealership>(dealershipActions.DealershipActionTypes.CREATE_DEALERSHIP),
                map((action: dealershipActions.CreateDealership) => action.payload),
                mergeMap((dealership: Dealership) => 
                    this.dealershipService.createDealership(dealership).pipe(
                        map((newDealership: Dealership) => new dealershipActions.CreateDealershipSuccess(newDealership)),
                        catchError(err => of(new dealershipActions.CreateDealershipFail(err)))
                        )
                    )
                )
            });

        updateDealership$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<dealershipActions.UpdateDealership>(dealershipActions.DealershipActionTypes.UPDATE_DEALERSHIP),
                map((action: dealershipActions.UpdateDealership) => action.payload),
                mergeMap((dealership: Dealership) => 
                    this.dealershipService.updateDealership(dealership).pipe(
                        map((updatedDealership: Dealership) => {
                            const id = parseInt(`${updatedDealership.id}`);
                            return new dealershipActions.UpdateDealershipSuccess({
                                id,
                                changes: updatedDealership
                              })
                        }),
                        catchError(err => of(new dealershipActions.UpdateDealershipFail(err)))
                        )
                    )
                )
            });

        deleteDealership$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<dealershipActions.DeleteDealership>(dealershipActions.DealershipActionTypes.DELETE_DEALERSHIP),
                map((action: dealershipActions.DeleteDealership) => action.payload),
                mergeMap((id: number) => 
                    this.dealershipService.deleteDealership(id).pipe(
                        map(() => new dealershipActions.DeleteDealershipSuccess(id)),
                        catchError(err => of(new dealershipActions.DeleteDealershipFail(err)))
                        )
                    )
                )
            });

    
        searchDealerships$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<dealershipActions.SearchDealership>(dealershipActions.DealershipActionTypes.SEARCH_DEALERSHIP),
                map((action: dealershipActions.SearchDealership) => action.payload),
                mergeMap((name: string) => 
                    this.dealershipService.searchDealerships(name).pipe(
                        map((dealerships: Dealership[]) => new dealershipActions.SearchDealershipSuccess(dealerships)),
                        catchError(err => of(new dealershipActions.SearchDealershipFail(err)))
                        )
                    )
                )
            });

        sortDealerships$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<dealershipActions.SortDealership>(dealershipActions.DealershipActionTypes.SORT_DEALERSHIP),
                map((action: dealershipActions.SortDealership) => action.payload),
                mergeMap((sort: {active: string, direction: string}) => 
                    this.dealershipService.sortDealerships(sort).pipe(
                        map((dealerships: Dealership[]) => new dealershipActions.SortDealershipSuccess(dealerships)),
                        catchError(err => of(new dealershipActions.SortDealershipFail(err)))
                        )
                    )
                )
            });
}