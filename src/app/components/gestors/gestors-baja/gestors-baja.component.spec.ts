import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorsBajaComponent } from './gestors-baja.component';

describe('GestorsBajaComponent', () => {
  let component: GestorsBajaComponent;
  let fixture: ComponentFixture<GestorsBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorsBajaComponent]
    });
    fixture = TestBed.createComponent(GestorsBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
