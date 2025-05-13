import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBookingComponent } from './btn-booking.component';

describe('BtnBookingComponent', () => {
  let component: BtnBookingComponent;
  let fixture: ComponentFixture<BtnBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
