import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'add-security/:action/:id',
    loadChildren: () => import('./pages/settings/add-security/add-security.module').then( m => m.AddSecurityPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'security-list',
    loadChildren: () => import('./pages/settings/security-list/security-list.module').then( m => m.SecurityListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-subscription-package/:action/:id',
    loadChildren: () => import('./pages/subscription/add-subscription-package/add-subscription-package.module').then( m => m.AddSubscriptionPackagePageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'subscription-package-list',
    loadChildren: () => import('./pages/subscription/subscription-package-list/subscription-package-list.module').then( m => m.SubscriptionPackageListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-license/:action/:id',
    loadChildren: () => import('./pages/license/add-license/add-license.module').then( m => m.AddLicensePageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'license-list',
    loadChildren: () => import('./pages/license/license-list/license-list.module').then( m => m.LicenseListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'license-view',
    loadChildren: () => import('./pages/license/license-view/license-view.module').then( m => m.LicenseViewPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'notification-list',
    loadChildren: () => import('./pages/notification/notification-list/notification-list.module').then( m => m.NotificationListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-payment',
    loadChildren: () => import('./pages/payment/add-payment/add-payment.module').then( m => m.AddPaymentPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'payment-list',
    loadChildren: () => import('./pages/payment/payment-list/payment-list.module').then( m => m.PaymentListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'email-notification-list',
    loadChildren: () => import('./pages/notification/email-notification-list/email-notification-list.module').then( m => m.EmailNotificationListPageModule),
    canLoad: [AuthGuard]                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  },
  {
    path: 'sms-notification-list',
    loadChildren: () => import('./pages/notification/sms-notification-list/sms-notification-list.module').then( m => m.SmsNotificationListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-email-notification/:action/:id',
    loadChildren: () => import('./pages/notification/add-email-notification/add-email-notification.module').then( m => m.AddEmailNotificationPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-sms-notification/:action/:id',
    loadChildren: () => import('./pages/notification/add-sms-notification/add-sms-notification.module').then( m => m.AddSmsNotificationPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'admin-list',
    loadChildren: () => import('./pages/tracking/admin-list/admin-list.module').then( m => m.AdminListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'user-list',
    loadChildren: () => import('./pages/tracking/user-list/user-list.module').then( m => m.UserListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'tracking-view',
    loadChildren: () => import('./pages/tracking/tracking-view/tracking-view.module').then( m => m.TrackingViewPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'approved-notification',
    loadChildren: () => import('./pages/notification/approved-notification/approved-notification.module').then( m => m.ApprovedNotificationPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'rejected-notification',
    loadChildren: () => import('./pages/notification/rejected-notification/rejected-notification.module').then( m => m.RejectedNotificationPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'compose-mail',
    loadChildren: () => import('./pages/notification/compose-mail/compose-mail.module').then( m => m.ComposeMailPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'sent-mail',
    loadChildren: () => import('./pages/notification/sent-mail/sent-mail.module').then( m => m.SentMailPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'received-mail',
    loadChildren: () => import('./pages/notification/received-mail/received-mail.module').then( m => m.ReceivedMailPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'compose-sms',
    loadChildren: () => import('./pages/notification/compose-sms/compose-sms.module').then( m => m.ComposeSmsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'sent-sms',
    loadChildren: () => import('./pages/notification/sent-sms/sent-sms.module').then( m => m.SentSmsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'tracking-list',
    loadChildren: () => import('./pages/tracking/tracking-list/tracking-list.module').then( m => m.TrackingListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./pages/payment/payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'due-payment',
    loadChildren: () => import('./pages/payment/due-payment/due-payment.module').then( m => m.DuePaymentPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'exam-tracking',
    loadChildren: () => import('./pages/tracking/exam-tracking/exam-tracking.module').then( m => m.ExamTrackingPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'package-tracking',
    loadChildren: () => import('./pages/tracking/package-tracking/package-tracking.module').then( m => m.PackageTrackingPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'exam-list',
    loadChildren: () => import('./pages/tracking/exam-list/exam-list.module').then( m => m.ExamListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'user-details',
    loadChildren: () => import('./pages/tracking/user-details/user-details.module').then( m => m.UserDetailsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'package-details',
    loadChildren: () => import('./pages/tracking/package-details/package-details.module').then( m => m.PackageDetailsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'manage-banners',
    loadChildren: () => import('./pages/settings/manage-banners/manage-banners.module').then( m => m.ManageBannersPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-banners',
    loadChildren: () => import('./pages/settings/add-banners/add-banners.module').then( m => m.AddBannersPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'manage-gallery',
    loadChildren: () => import('./pages/settings/manage-gallery/manage-gallery.module').then( m => m.ManageGalleryPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-gallery',
    loadChildren: () => import('./pages/settings/add-gallery/add-gallery.module').then( m => m.AddGalleryPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'manage-links',
    loadChildren: () => import('./pages/settings/manage-links/manage-links.module').then( m => m.ManageLinksPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-links',
    loadChildren: () => import('./pages/settings/add-links/add-links.module').then( m => m.AddLinksPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'manage-website',
    loadChildren: () => import('./pages/settings/manage-website/manage-website.module').then( m => m.ManageWebsitePageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-website-details',
    loadChildren: () => import('./pages/settings/add-website-details/add-website-details.module').then( m => m.AddWebsiteDetailsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'view-website-details',
    loadChildren: () => import('./pages/settings/view-website-details/view-website-details.module').then( m => m.ViewWebsiteDetailsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'package-tracking-list',
    loadChildren: () => import('./pages/tracking/package-tracking-list/package-tracking-list.module').then( m => m.PackageTrackingListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'institute-view/:id',
    loadChildren: () => import('./pages/settings/institute-view/institute-view.module').then( m => m.InstituteViewPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'add-hsn',
    loadChildren: () => import('./pages/hsn/add-hsn/add-hsn.module').then( m => m.AddHsnPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'hsn-list',
    loadChildren: () => import('./pages/hsn/hsn-list/hsn-list.module').then( m => m.HsnListPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/auth/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'resetpassword/:action/:id',
    loadChildren: () => import('./pages/auth/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
