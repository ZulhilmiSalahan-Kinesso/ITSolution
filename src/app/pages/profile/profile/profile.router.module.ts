import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: 'profile/profile',
    component: ProfilePage,
    children: [
      {
        path: 'description',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../description/description.module').then(m => m.DescriptionPageModule)
          }
        ]
      },
      {
        path: 'review',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../reviews/reviews.module').then(m => m.ReviewsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/description/description',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/description/description',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {}
