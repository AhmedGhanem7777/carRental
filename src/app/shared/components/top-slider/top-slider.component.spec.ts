import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSliderComponent } from './top-slider.component';

describe('TopSliderComponent', () => {
  let component: TopSliderComponent;
  let fixture: ComponentFixture<TopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
