import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import * as fromCar from "../state/car.reducer";
import * as carActions from "../state/car.action";
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {
  carForm: FormGroup;
  currentCar: Car;

  constructor(
    public dialogRef: MatDialogRef<CarUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<fromCar.AppState>
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand: ["", Validators.required],
      model: ["", Validators.required],
      color: ["", Validators.required],
      price: [0, Validators.required]
    });
  
    this.currentCar = this.data.car;
    this.carForm.patchValue({
      brand: this.currentCar.brand,
      model: this.currentCar.model,
      color: this.currentCar.color,
      price: this.currentCar.price,
    });
  }

  updateCar() {
    const updatedCustomer: Car = {
      id: this.currentCar.id,
      brand: this.carForm.get("brand")?.value,
      model: this.carForm.get("model")?.value,
      color: this.carForm.get("color")?.value,
      price: this.carForm.get("price")?.value,
    };
    this.store.dispatch(new carActions.UpdateCar({car: updatedCustomer, dealershipId: this.data.dealershipId}));
    this.dialogRef.close();
  }
}
