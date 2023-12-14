import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasBajaComponent } from './reservas-baja.component';

describe('ReservasBajaComponent', () => {
  let component: ReservasBajaComponent;
  let fixture: ComponentFixture<ReservasBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasBajaComponent]
    });
    fixture = TestBed.createComponent(ReservasBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
