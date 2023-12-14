import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesModifComponent } from './clientes-modif.component';

describe('ClientesModifComponent', () => {
  let component: ClientesModifComponent;
  let fixture: ComponentFixture<ClientesModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesModifComponent]
    });
    fixture = TestBed.createComponent(ClientesModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
