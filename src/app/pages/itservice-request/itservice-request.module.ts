import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ITServiceRequestPage } from './itservice-request.page';

const routes: Routes = [
  {
    path: '',
    component: ITServiceRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ITServiceRequestPage]
})
export class ITServiceRequestPageModule {}
