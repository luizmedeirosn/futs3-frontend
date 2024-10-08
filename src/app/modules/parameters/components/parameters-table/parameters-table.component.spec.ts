import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersTableComponent } from './parameters-table.component';

describe('ParametersTableComponent', () => {
  let component: ParametersTableComponent;
  let fixture: ComponentFixture<ParametersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametersTableComponent],
    });
    fixture = TestBed.createComponent(ParametersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
