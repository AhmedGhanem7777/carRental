import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { RouterModule } from '@angular/router';
import { TopSliderComponent } from './components/top-slider/top-slider.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { BtnBookingComponent } from './buttons/btn-booking/btn-booking.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { BtnLogoutComponent } from './buttons/btn-logout/btn-logout.component';
import { SocialMediaComponent } from './buttons/social-media/social-media.component';
import { StarsComponent } from './components/stars/stars.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { SearchVehiclePipe } from './pipes/search-vehicle.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { SearchCategoryPipe } from './pipes/search-category.pipe';
import { SearchFuelTypePipe } from './pipes/search-fuel-type.pipe';
import { FormatInfoPipe } from './pipes/format-info.pipe';


@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    VehicleCardComponent,
    TopSliderComponent,
    BackToTopComponent,
    BtnBookingComponent,
    GoBackComponent,
    BtnLogoutComponent,
    SocialMediaComponent,
    StarsComponent,
    LoadingComponent,
    SidebarComponent,
    DashboardNavComponent,
    SearchUserPipe,
    SearchVehiclePipe,
    FormatDatePipe,
    SearchCategoryPipe,
    SearchFuelTypePipe,
    FormatInfoPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    VehicleCardComponent,
    FooterComponent,
    TopSliderComponent,
    BackToTopComponent,
    LoadingComponent,
    DashboardNavComponent,
    SidebarComponent,
    SearchUserPipe,
    SearchVehiclePipe,
    FormatDatePipe,
    GoBackComponent,
    StarsComponent,
    SearchCategoryPipe,
    SearchFuelTypePipe,
    FormatInfoPipe,
    BtnBookingComponent
  ]
})
export class SharedModule { }
