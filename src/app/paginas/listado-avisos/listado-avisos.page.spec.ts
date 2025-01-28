import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAvisosPage } from './listado-avisos.page';

describe('ListadoAvisosPage', () => {
  let component: ListadoAvisosPage;
  let fixture: ComponentFixture<ListadoAvisosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAvisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
