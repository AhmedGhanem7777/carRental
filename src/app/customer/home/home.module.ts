import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FeaturedCarsComponent } from './featured-cars/featured-cars.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { SharedModule } from '../../shared/shared.module';
import { OurCategoriesComponent } from './our-categories/our-categories.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    HomeComponent,
    TestimonialComponent,
    FeaturedCarsComponent,
    HowItWorksComponent,
    OurCategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class HomeModule { }
