import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToLaterComponent } from './save-to-later.component';

describe('SaveToLaterComponent', () => {
  let component: SaveToLaterComponent;
  let fixture: ComponentFixture<SaveToLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveToLaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveToLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
