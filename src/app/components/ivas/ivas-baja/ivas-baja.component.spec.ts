import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvasBajaComponent } from './ivas-baja.component';

describe('IvasBajaComponent', () => {
  let component: IvasBajaComponent;
  let fixture: ComponentFixture<IvasBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvasBajaComponent]
    });
    fixture = TestBed.createComponent(IvasBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
