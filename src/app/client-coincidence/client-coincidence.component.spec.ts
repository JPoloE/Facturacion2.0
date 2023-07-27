import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCoincidenceComponent } from './client-coincidence.component';

describe('ClientCoincidenceComponent', () => {
  let component: ClientCoincidenceComponent;
  let fixture: ComponentFixture<ClientCoincidenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCoincidenceComponent]
    });
    fixture = TestBed.createComponent(ClientCoincidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
