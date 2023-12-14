import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesBajaComponent } from './actividades-baja.component';

describe('ActividadesBajaComponent', () => {
  let component: ActividadesBajaComponent;
  let fixture: ComponentFixture<ActividadesBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesBajaComponent]
    });
    fixture = TestBed.createComponent(ActividadesBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
