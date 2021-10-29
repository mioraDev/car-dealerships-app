import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import * as fromCar from "../state/car.reducer";
import * as carActions from "../state/car.action";
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.scss']
})
export class CarDeleteComponent implements OnInit {
  car: Car;

  constructor(
    public dialogRef: MatDialogRef<CarDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private store: Store<fromCar.AppState>

  ) { }

  ngOnInit(): void {
    this.car = this.data.car;
  }

  deleteCar() {
    this.store.dispatch(new carActions.DeleteCar({carId: this.car.id || 0, dealershipId: this.data.dealershipId}));
    this.dialogRef.close();
  }
}
