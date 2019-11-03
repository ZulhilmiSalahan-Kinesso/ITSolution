import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'category', loadChildren: './pages/category/list-category/category.module#CategoryPageModule' },
  { path: 'add-category', loadChildren: './pages/category/add-category/add-category.module#AddCategoryPageModule' },
  { path: 'itservice', loadChildren: './pages/itservice/itservice/itservice.module#ITServicePageModule' },
  { path: 'add-service', loadChildren: './pages/itservice/add-service/add-service.module#AddServicePageModule' },
  { path: 'itprovider', loadChildren: './pages/itprovider/itprovider/itprovider.module#ITProviderPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile/profile.module#ProfilePageModule' },
  { path: 'itservice-detail', loadChildren: './pages/itservice-detail/itservice-detail.module#ITServiceDetailPageModule' },
  { path: 'itservice-request', loadChildren: './pages/itservice-request/itservice-request.module#ITServiceRequestPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'messaging', loadChildren: './pages/messaging/messaging.module#MessagingPageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'profile/reviews', loadChildren: './pages/profile/reviews/reviews.module#ReviewsPageModule' },
  { path: 'profile/description', loadChildren: './pages/profile/description/description.module#DescriptionPageModule' },
  { path: 'details-provider', loadChildren: './pages/itprovider/details-provider/details-provider.module#DetailsProviderPageModule' },
  { path: 'update-profile', loadChildren: './pages/profile/update-profile/update-profile.module#UpdateProfilePageModule' },
  { path: 'listing', loadChildren: './pages/listing/listing.module#ListingPageModule' },
  { path: 'my-services', loadChildren: './pages/my-services/my-services.module#MyServicesPageModule' },
  { path: 'create-listing', loadChildren: './pages/create-listing/create-listing.module#CreateListingPageModule' },
  { path: 'accept-deal', loadChildren: './pages/accept-deal/accept-deal.module#AcceptDealPageModule' },
  { path: 'create-deal', loadChildren: './pages/create-deal/create-deal.module#CreateDealPageModule' },
  { path: 'final-deal', loadChildren: './pages/final-deal/final-deal.module#FinalDealPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
