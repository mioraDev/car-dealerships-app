import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import * as fromDealership from "../state/dealership.reducer";
import * as dealershipActions from "../state/dealership.action";
import { Dealership } from 'src/app/models/dealership.model';

@Component({
  selector: 'app-dealership-delete',
  templateUrl: './dealership-delete.component.html',
  styleUrls: ['./dealership-delete.component.scss']
})
export class DealershipDeleteComponent implements OnInit {
  dealership: Dealership;

  constructor(
    public dialogRef: MatDialogRef<DealershipDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private store: Store<fromDealership.AppState>

  ) { }

  ngOnInit(): void {
    this.dealership = this.data.dealership;
  }

  deleteDealership() {
    this.store.dispatch(new dealershipActions.DeleteDealership(this.dealership.id || 0));
    this.dialogRef.close();
  }
}
