import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesBajaComponent } from './materiales-baja.component';

describe('MaterialesBajaComponent', () => {
  let component: MaterialesBajaComponent;
  let fixture: ComponentFixture<MaterialesBajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesBajaComponent]
    });
    fixture = TestBed.createComponent(MaterialesBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
