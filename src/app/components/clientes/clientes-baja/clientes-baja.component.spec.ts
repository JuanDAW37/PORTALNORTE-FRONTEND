import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesBajaComponent } from './clientes-baja.component';

describe('ClientesBajaComponent', () => {
  let component: ClientesBajaComponent;
  let fixture: ComponentFixture<ClientesBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesBajaComponent]
    });
    fixture = TestBed.createComponent(ClientesBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
