import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesBajaComponent } from './ubicaciones-baja.component';

describe('UbicacionesBajaComponent', () => {
  let component: UbicacionesBajaComponent;
  let fixture: ComponentFixture<UbicacionesBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionesBajaComponent]
    });
    fixture = TestBed.createComponent(UbicacionesBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
