import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadBajaComponent } from './publicidad-baja.component';

describe('PublicidadBajaComponent', () => {
  let component: PublicidadBajaComponent;
  let fixture: ComponentFixture<PublicidadBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadBajaComponent]
    });
    fixture = TestBed.createComponent(PublicidadBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
