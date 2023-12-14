import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAltaComponent } from './clientes-alta.component';

describe('ClientesAltaComponent', () => {
  let component: ClientesAltaComponent;
  let fixture: ComponentFixture<ClientesAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesAltaComponent]
    });
    fixture = TestBed.createComponent(ClientesAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
