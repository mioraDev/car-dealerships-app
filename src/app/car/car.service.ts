import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { Dealership } from "../models/dealership.model";

@Injectable()
export class CarService {
  private carsUrl = "http://localhost:3000/dealerships";

  constructor(private http: HttpClient) {}

  getCars(dealershipId: number): Observable<Car[]> {
    return this.http.get<Dealership>(`${this.carsUrl}/${dealershipId}`).pipe(
      map((dealership: Dealership) => {
        return dealership.cars;
      })
    )
  }

  createCar(payload: {car: Car, dealershipId: number}): Observable<Car> {
    return this.http.get<Dealership>(`${this.carsUrl}/${payload.dealershipId}`).pipe(
      mergeMap(dealership => {
        // push the new car to the dealership cars list
        const car = {
          ...payload.car,
          id: Math.floor((Math.random() * 1000000))
        }
        dealership.cars.push(car);
        return this.updateDealership(dealership).pipe(
          map(() => car)
        )
      })
    )
  }

  updateCar(payload: {car: Car, dealershipId: number}): Observable<Car> {
    return this.http.get<Dealership>(`${this.carsUrl}/${payload.dealershipId}`).pipe(
      mergeMap(dealership => {
        dealership.cars = dealership.cars.map(c => {
          if (c.id === payload.car.id) {
            return payload.car;
          } return c;
        })
        return this.updateDealership(dealership).pipe(
          map(() => payload.car)
        )
      })
    )
  }

  updateDealership(dealership: Dealership): Observable<Dealership> {
    return this.http.patch<Dealership>(
      `${this.carsUrl}/${dealership.id}`,
      dealership
    );
  }

  deleteCar(payload: { carId:number, dealershipId: number}): Observable<any> {
    return this.http.get<Dealership>(`${this.carsUrl}/${payload.dealershipId}`).pipe(
      mergeMap(dealership => {
        // remove car from the dealership cars list
        dealership.cars = dealership.cars.filter(c => c.id !== payload.carId)
        return this.updateDealership(dealership).pipe(
          map(() => payload.carId)
        )
      })
    )
  }

  searchCars(payload: {text: string, dealershipId: number}): Observable<Car[]> {
    // should send request to the backend but use fake data for now
    return this.http.get<Dealership>(`${this.carsUrl}/${payload.dealershipId}`).pipe(
      map(dealership => {
        return dealership.cars.filter(d => (d.brand.toLowerCase().search(payload.text) > -1) || 
        (d.model.toLowerCase().search(payload.text) > -1) || (d.color.toLowerCase().search(payload.text) > -1))
      })
    )
  }

  sortCars(sort: {active: string, direction: string, dealershipId: number}): Observable<Car[]> {
    // should send request to the backend but use fake data for now
    return this.http.get<Dealership>(`${this.carsUrl}/${sort.dealershipId}`).pipe(
      map(dealership => {
        const isAsc = sort.direction === 'asc';
        return dealership.cars.sort((a, b) => {
          switch (sort.active) {
            case 'brand': return this.compare(a.brand, b.brand, isAsc);
            case 'model': return this.compare(a.model, b.model, isAsc);
            case 'color': return this.compare(a.color, b.color, isAsc);
            case 'price': return this.compare(a.price, b.price, isAsc);
            default: return 0;
          }
        })
      })
    )

       
  }

   compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
