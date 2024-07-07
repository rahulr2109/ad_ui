import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDayAnomaliesComponent } from './current-day-anomalies.component';

describe('CurrentDayAnomaliesComponent', () => {
  let component: CurrentDayAnomaliesComponent;
  let fixture: ComponentFixture<CurrentDayAnomaliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentDayAnomaliesComponent]
    });
    fixture = TestBed.createComponent(CurrentDayAnomaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
