import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { CarService } from "../car.service";
import * as carActions from "./car.action"
import { Car } from "../../models/car.model";

@Injectable()
export class CarEffect {
    constructor(
        private actions$: Actions,
         private carService: CarService
    ) {}

        loadCars$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<carActions.LoadCars>(carActions.CarActionTypes.LOAD_CARS),
            map((action: carActions.LoadCars) => action.payload),
            mergeMap((dealershipId: number) => 
                this.carService.getCars(dealershipId).pipe(
                    map((cars: Car[]) => new carActions.LoadCarsSuccess(cars)),
                    catchError(err => of(new carActions.LoadCarsFail(err)))
                    )
                )
            )
        });

        createCar$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<carActions.CreateCar>(carActions.CarActionTypes.CREATE_CAR),
                map((action: carActions.CreateCar) => action.payload),
                mergeMap((result) => 
                    this.carService.createCar(result).pipe(
                        map((newCar: Car) => new carActions.CreateCarSuccess(newCar)),
                        catchError(err => of(new carActions.CreateCarFail(err)))
                        )
                    )
                )
            });

        updateCar$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<carActions.UpdateCar>(carActions.CarActionTypes.UPDATE_CAR),
                map((action: carActions.UpdateCar) => action.payload),
                mergeMap(({car, dealershipId}) => 
                    this.carService.updateCar({car, dealershipId}).pipe(
                        map((updatedCar: Car) => {
                            const id = parseInt(`${updatedCar.id}`);
                            return new carActions.UpdateCarSuccess({
                                id,
                                changes: updatedCar
                              })
                        }),
                        catchError(err => of(new carActions.UpdateCarFail(err)))
                        )
                    )
                )
            });

        deleteCar$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<carActions.DeleteCar>(carActions.CarActionTypes.DELETE_CAR),
                map((action: carActions.DeleteCar) => action.payload),
                mergeMap(({ carId, dealershipId}) => 
                    this.carService.deleteCar({ carId, dealershipId}).pipe(
                        map(() => new carActions.DeleteCarSuccess(carId)),
                        catchError(err => of(new carActions.DeleteCarFail(err)))
                        )
                    )
                )
            });

    
        searchCars$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<carActions.SearchCar>(carActions.CarActionTypes.SEARCH_CAR),
                map((action: carActions.SearchCar) => action.payload),
                mergeMap(({text, dealershipId}) => 
                    this.carService.searchCars({text, dealershipId}).pipe(
                        map((cars: Car[]) => new carActions.SearchCarSuccess(cars)),
                        catchError(err => of(new carActions.SearchCarFail(err)))
                        )
                    )
                )
            });

        sortCars$ = createEffect(() => {
            return this.actions$.pipe(
                ofType<carActions.SortCar>(carActions.CarActionTypes.SORT_CAR),
                map((action: carActions.SortCar) => action.payload),
                mergeMap((sort: {active: string, direction: string, dealershipId: number}) => 
                    this.carService.sortCars(sort).pipe(
                        map((cars: Car[]) => new carActions.SortCarSuccess(cars)),
                        catchError(err => of(new carActions.SortCarFail(err)))
                        )
                    )
                )
            });
}