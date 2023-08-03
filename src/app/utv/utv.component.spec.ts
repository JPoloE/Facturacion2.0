import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtvComponent } from './utv.component';

describe('UtvComponent', () => {
  let component: UtvComponent;
  let fixture: ComponentFixture<UtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtvComponent]
    });
    fixture = TestBed.createComponent(UtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
