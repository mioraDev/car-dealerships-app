import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarListComponent } from './car-list/car-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { carReducer } from "./state/car.reducer";
import { CarEffect } from "./state/car.effects";
import { CarService } from './car.service';
import { CarCreateComponent } from './car-create/car-create.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { CarDeleteComponent } from './car-delete/car-delete.component';

const carRoutes: Routes = [{ path: "", component: CarListComponent }];

@NgModule({
  declarations: [
    CarListComponent,
    CarCreateComponent,
    CarUpdateComponent,
    CarDeleteComponent
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
    RouterModule.forChild(carRoutes),
    StoreModule.forFeature('car', carReducer),
    EffectsModule.forFeature([CarEffect]),
    MatDialogModule
  ],
  providers: [CarService],
  bootstrap: [CarListComponent]
})
export class CarModule { }
