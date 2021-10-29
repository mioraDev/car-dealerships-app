import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';

import { select, Store } from "@ngrx/store";
import { Subscription } from 'rxjs';

import { Car } from 'src/app/models/car.model';
import * as carReducer from "../state/car.reducer"
import * as carActions from "../state/car.action"
import { CarCreateComponent } from '../car-create/car-create.component';
import { CarDeleteComponent } from '../car-delete/car-delete.component';
import { CarUpdateComponent } from '../car-update/car-update.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {

  displayedColumns = ['brand', 'model', 'color', 'price', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource<Car>([]);
  hasError = false;
  cars: Car[];
  dialogWidth = '600px';
  searchText = '';
  listSubscription: Subscription;
  routeSubscription: Subscription;
  dealershipId: number;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.queryParams
      .subscribe(params => {
        this.dealershipId = parseInt(params.dealership);
        this.store.dispatch(new carActions.LoadCars(this.dealershipId));
        this.listSubscription = this.store.pipe(select(carReducer.getCars)).subscribe(cars => {
          this.dataSource = new MatTableDataSource<Car>(cars);
        })
      }
    );
  }

  addCar() {
    this.dialog.open(CarCreateComponent, {
      width: this.dialogWidth,
      data: {
        dealershipId: this.dealershipId
      }
    });
  }

  editCar(car: Car) { 
    this.dialog.open(CarUpdateComponent, {
      width: this.dialogWidth,
      data: { dealershipId: this.dealershipId, car }
    });
  }

  deleteCar(car: Car) {
    this.dialog.open(CarDeleteComponent, {
      width: this.dialogWidth,
      data: {dealershipId: this.dealershipId, car}
    });
  }

  search() {
    this.store.dispatch(new carActions.SearchCar({text: this.searchText.toLowerCase(), dealershipId: this.dealershipId}));
  }

  onSearchChange() {
    if (!this.searchText) {
      this.store.dispatch(new carActions.LoadCars(this.dealershipId));
    }
  }

  sortData(event: Sort) {
    if (!event.direction) {
      this.store.dispatch(new carActions.LoadCars(this.dealershipId));
    } else {
      this.store.dispatch(new carActions.SortCar({...event, dealershipId: this.dealershipId}));
    }
  }

  backToList() {
    this.router.navigate(['/dealerships'])
  }
  
  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
