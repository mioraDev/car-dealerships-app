import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';

import { select, Store } from "@ngrx/store";
import { Subscription } from 'rxjs';

import { Dealership } from 'src/app/models/dealership.model';
import * as dealershipReducer from "../state/dealership.reducer"
import * as dealershipActions from "../state/dealership.action"
import { DealershipCreateComponent } from '../dealership-create/dealership-create.component';
import { DealershipDeleteComponent } from '../dealership-delete/dealership-delete.component';
import { DealershipUpdateComponent } from '../dealership-update/dealership-update.component';

@Component({
  selector: 'app-dealership-list',
  templateUrl: './dealership-list.component.html',
  styleUrls: ['./dealership-list.component.scss']
})
export class DealershipListComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'nbCar', 'totalBudget', 'remainingBudget', 'actions'];
  dataSource: MatTableDataSource<Dealership> = new MatTableDataSource<Dealership>([]);
  hasError = false;
  dealerships: Dealership[];
  dialogWidth = '600px';
  searchText = '';
  listSubscription: Subscription;

  constructor(
    private store: Store<any>,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new dealershipActions.LoadDealerships());
    this.listSubscription = this.store.pipe(select(dealershipReducer.getDealerships)).subscribe(dealerships => {
      this.dataSource = new MatTableDataSource<Dealership>(dealerships);
    });
  }

  addDealership() {
    this.dialog.open(DealershipCreateComponent, {
      width: this.dialogWidth,
      data: {}
    });
  }

  editDealership(dealership: Dealership) { 
    this.dialog.open(DealershipUpdateComponent, {
      width: this.dialogWidth,
      data: {dealership}
    });
  }

  deleteDealership(dealership: Dealership) {
    this.dialog.open(DealershipDeleteComponent, {
      width: this.dialogWidth,
      data: {dealership}
    });
  }

  viewDealershipCars(dealership: Dealership) {
    this.router.navigate(['/cars'], { queryParams: { dealership: dealership.id }});
  }

  search() {
    this.store.dispatch(new dealershipActions.SearchDealership(this.searchText.toLowerCase()));
  }

  onSearchChange() {
    if (!this.searchText) {
      this.store.dispatch(new dealershipActions.LoadDealerships());
    }
  }

  sortData(event: Sort) {
    if (!event.direction) {
      this.store.dispatch(new dealershipActions.LoadDealerships());
    } else {
      this.store.dispatch(new dealershipActions.SortDealership(event));
    }
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }
}
