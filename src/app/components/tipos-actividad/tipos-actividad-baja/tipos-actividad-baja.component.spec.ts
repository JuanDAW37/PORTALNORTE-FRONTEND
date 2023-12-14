import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadBajaComponent } from './tipos-actividad-baja.component';

describe('TiposActividadBajaComponent', () => {
  let component: TiposActividadBajaComponent;
  let fixture: ComponentFixture<TiposActividadBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposActividadBajaComponent]
    });
    fixture = TestBed.createComponent(TiposActividadBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
