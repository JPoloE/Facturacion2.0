import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRegisterComponent } from './billing-register.component';

describe('BillingRegisterComponent', () => {
  let component: BillingRegisterComponent;
  let fixture: ComponentFixture<BillingRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingRegisterComponent]
    });
    fixture = TestBed.createComponent(BillingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
