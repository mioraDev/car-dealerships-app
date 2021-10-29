import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import * as fromDealership from "../state/dealership.reducer";
import * as dealershipActions from "../state/dealership.action";
import { Dealership } from 'src/app/models/dealership.model';

@Component({
  selector: 'app-dealership-update',
  templateUrl: './dealership-update.component.html',
  styleUrls: ['./dealership-update.component.scss']
})
export class DealershipUpdateComponent implements OnInit {
  dealershipForm: FormGroup;
  currentDealership: Dealership;

  constructor(
    public dialogRef: MatDialogRef<DealershipUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<fromDealership.AppState>
  ) {}

  ngOnInit(): void {
    this.dealershipForm = this.fb.group({
      name: ["", Validators.required],
      location: [""],
      totalBudget: [0, Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required]
    });
    
    this.currentDealership = this.data.dealership;
    this.dealershipForm.patchValue({
      name: this.currentDealership.name,
      location: this.currentDealership.location,
      totalBudget: this.currentDealership.totalBudget,
      firstname: this.currentDealership.owner?.firstname,
      lastname: this.currentDealership.owner?.lastname,
    });
  }

  updateDealership() {
    const updatedCustomer: Dealership = {
      id: this.currentDealership.id,
      name: this.dealershipForm.get("name")?.value,
      location: this.dealershipForm.get("location")?.value,
      totalBudget: this.dealershipForm.get("totalBudget")?.value,
      remainingBudget: this.dealershipForm.get("membership")?.value,
      owner: {
        firstname: this.dealershipForm.get('firstname')?.value,
        lastname: this.dealershipForm.get('lastname')?.value,
      },
      cars: this.currentDealership.cars
    };
    this.store.dispatch(new dealershipActions.UpdateDealership(updatedCustomer));
    this.dialogRef.close();
  }
}
