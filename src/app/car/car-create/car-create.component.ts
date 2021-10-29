import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { Car } from 'src/app/models/car.model';
import * as fromCar from "../state/car.reducer";
import * as carActions from "../state/car.action";

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss']
})
export class CarCreateComponent implements OnInit {
  carForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CarCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<fromCar.AppState>
  ) {}

  ngOnInit() {
    this.carForm = this.fb.group({
      brand: ["", Validators.required],
      model: ["", Validators.required],
      color: ["", Validators.required],
      price: [0, Validators.required]
    });
  }

  createCar() {
    const newCar: Car = {
      brand: this.carForm.get('brand')?.value,
      model: this.carForm.get('model')?.value,
      color: this.carForm.get('color')?.value,
      price: this.carForm.get('price')?.value,
    };
    this.store.dispatch(new carActions.CreateCar({car: newCar, dealershipId: this.data.dealershipId}));
    this.dialogRef.close();
  }
}
