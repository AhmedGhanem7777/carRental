import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCategoriesComponent } from './our-categories.component';

describe('OurCategoriesComponent', () => {
  let component: OurCategoriesComponent;
  let fixture: ComponentFixture<OurCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
