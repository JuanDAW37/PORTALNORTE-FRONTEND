import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesAltaComponent } from './actividades-alta.component';

describe('ActividadesAltaComponent', () => {
  let component: ActividadesAltaComponent;
  let fixture: ComponentFixture<ActividadesAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesAltaComponent]
    });
    fixture = TestBed.createComponent(ActividadesAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
