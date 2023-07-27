import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionBillingConfigurationComponent } from './construction-billing-configuration.component';

describe('ConstructionBillingConfigurationComponent', () => {
  let component: ConstructionBillingConfigurationComponent;
  let fixture: ComponentFixture<ConstructionBillingConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionBillingConfigurationComponent]
    });
    fixture = TestBed.createComponent(ConstructionBillingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
