import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponsabilidadesComponent } from './modal-responsabilidades.component';

describe('ModalResponsabilidadesComponent', () => {
  let component: ModalResponsabilidadesComponent;
  let fixture: ComponentFixture<ModalResponsabilidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalResponsabilidadesComponent]
    });
    fixture = TestBed.createComponent(ModalResponsabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
