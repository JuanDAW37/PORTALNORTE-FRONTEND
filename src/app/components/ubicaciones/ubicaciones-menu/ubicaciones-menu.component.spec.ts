import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesMenuComponent } from './ubicaciones-menu.component';

describe('UbicacionesMenuComponent', () => {
  let component: UbicacionesMenuComponent;
  let fixture: ComponentFixture<UbicacionesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionesMenuComponent]
    });
    fixture = TestBed.createComponent(UbicacionesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
