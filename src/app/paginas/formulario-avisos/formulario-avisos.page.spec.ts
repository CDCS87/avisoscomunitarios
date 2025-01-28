import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioAvisosPage } from './formulario-avisos.page';

describe('FormularioAvisosPage', () => {
  let component: FormularioAvisosPage;
  let fixture: ComponentFixture<FormularioAvisosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAvisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
