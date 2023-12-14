import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesMenuComponent } from './actividades-menu.component';

describe('ActividadesMenuComponent', () => {
  let component: ActividadesMenuComponent;
  let fixture: ComponentFixture<ActividadesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesMenuComponent]
    });
    fixture = TestBed.createComponent(ActividadesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
