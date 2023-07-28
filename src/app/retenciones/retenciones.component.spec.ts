import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionesComponent } from './retenciones.component';

describe('RetencionesComponent', () => {
  let component: RetencionesComponent;
  let fixture: ComponentFixture<RetencionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetencionesComponent]
    });
    fixture = TestBed.createComponent(RetencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
