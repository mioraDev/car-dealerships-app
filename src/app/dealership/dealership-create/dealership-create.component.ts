import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { Dealership } from 'src/app/models/dealership.model';
import * as fromDealership from "../state/dealership.reducer";
import * as dealershipActions from "../state/dealership.action";

@Component({
  selector: 'app-dealership-create',
  templateUrl: './dealership-create.component.html',
  styleUrls: ['./dealership-create.component.scss']
})
export class DealershipCreateComponent implements OnInit {
  dealershipForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DealershipCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<fromDealership.AppState>
  ) {}

  ngOnInit() {
    this.dealershipForm = this.fb.group({
      name: ["", Validators.required],
      location: [""],
      totalBudget: [0, Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required]
    });
  }

  createDealership() {
    const newDealership: Dealership = {
      name: this.dealershipForm.get('name')?.value,
      location: this.dealershipForm.get('location')?.value,
      totalBudget: this.dealershipForm.get('totalBudget')?.value,
      // initialize remaining budget with total budget as there is no specification for that
      remainingBudget: this.dealershipForm.get('totalBudget')?.value,
      owner: {
        firstname: this.dealershipForm.get('firstname')?.value,
        lastname: this.dealershipForm.get('lastname')?.value,
      },
      // init dealership with empty car
      cars: []
    };
    this.store.dispatch(new dealershipActions.CreateDealership(newDealership));
    this.dialogRef.close();
  }
}
