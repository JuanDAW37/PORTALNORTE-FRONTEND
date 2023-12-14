import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasBajaComponent } from './guias-baja.component';

describe('GuiasBajaComponent', () => {
  let component: GuiasBajaComponent;
  let fixture: ComponentFixture<GuiasBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiasBajaComponent]
    });
    fixture = TestBed.createComponent(GuiasBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
