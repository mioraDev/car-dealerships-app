import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dealership } from '../models/dealership.model';

@Injectable()
export class DealershipService {
  private dealershipsUrl = "http://localhost:3000/dealerships";

  constructor(private http: HttpClient) {}

  getDealerships(): Observable<Dealership[]> {
    return this.http.get<Dealership[]>(this.dealershipsUrl);
  }

  createDealership(payload: Dealership): Observable<Dealership> {
    return this.http.post<Dealership>(this.dealershipsUrl, payload);
  }

  updateDealership(dealership: Dealership): Observable<Dealership> {
    return this.http.patch<Dealership>(
      `${this.dealershipsUrl}/${dealership.id}`,
      dealership
    );
  }

  deleteDealership(payload: number): Observable<any> {
    return this.http.delete(`${this.dealershipsUrl}/${payload}`);
  }

  searchDealerships(name: string): Observable<Dealership[]> {
    // should send request to the backend but use fake data for now
    return this.http.get<Dealership[]>(this.dealershipsUrl).pipe(
      map(dealerships => {
        return dealerships.filter(d => d.name.toLowerCase().search(name) > -1)
      })
    );
  }

  sortDealerships(sort: {active: string, direction: string}): Observable<Dealership[]> {
    // should send request to the backend but use fake data for now
    return this.http.get<Dealership[]>(this.dealershipsUrl).pipe(
      map(dealerships => {
        const isAsc = sort.direction === 'asc';
          return dealerships.sort((a, b) => {
            switch (sort.active) {
              case 'name': return this.compare(a.name, b.name, isAsc);
              case 'nbCar': return this.compare(a.cars.length, b.cars.length, isAsc);
              case 'totalBudget': return this.compare(a.totalBudget, b.totalBudget, isAsc);
              case 'remainingBudget': return this.compare(a.remainingBudget, b.remainingBudget, isAsc);
              default: return 0;
            }
          })
      })
    );
  }

   compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
