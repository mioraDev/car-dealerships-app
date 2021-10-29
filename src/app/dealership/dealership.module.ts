import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DealershipListComponent } from './dealership-list/dealership-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { dealershipReducer } from "./state/dealership.reducer";
import { DealershipEffect } from "./state/dealership.effects";
import { DealershipService } from './dealership.service';
import { DealershipCreateComponent } from './dealership-create/dealership-create.component';
import { DealershipUpdateComponent } from './dealership-update/dealership-update.component';
import { DealershipDeleteComponent } from './dealership-delete/dealership-delete.component';

const dealershipRoutes: Routes = [{ path: "", component: DealershipListComponent }];

@NgModule({
  declarations: [
    DealershipListComponent,
    DealershipCreateComponent,
    DealershipUpdateComponent,
    DealershipDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    RouterModule.forChild(dealershipRoutes),
    StoreModule.forFeature('dealership', dealershipReducer),
    EffectsModule.forFeature([DealershipEffect]),
    MatDialogModule
  ],
  providers: [DealershipService],
  bootstrap: [DealershipListComponent]
})
export class DealershipModule { }
