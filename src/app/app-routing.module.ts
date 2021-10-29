import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dealerships', pathMatch: 'full' },
  { path: 'dealerships', loadChildren: () => import('./dealership/dealership.module').then(m => m.DealershipModule) },
  { path: 'cars', loadChildren: () => import('./car/car.module').then(m => m.CarModule) },


];
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
