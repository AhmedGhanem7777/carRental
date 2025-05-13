import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTypesComponent } from './fuel-types.component';

describe('FuelTypesComponent', () => {
  let component: FuelTypesComponent;
  let fixture: ComponentFixture<FuelTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
