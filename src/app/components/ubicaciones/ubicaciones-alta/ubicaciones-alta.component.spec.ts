import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesAltaComponent } from './ubicaciones-alta.component';

describe('UbicacionesAltaComponent', () => {
  let component: UbicacionesAltaComponent;
  let fixture: ComponentFixture<UbicacionesAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionesAltaComponent]
    });
    fixture = TestBed.createComponent(UbicacionesAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
