import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingConfigurationComponent } from './billing-configuration.component';

describe('BillingConfigurationComponent', () => {
  let component: BillingConfigurationComponent;
  let fixture: ComponentFixture<BillingConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingConfigurationComponent]
    });
    fixture = TestBed.createComponent(BillingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
