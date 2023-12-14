import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesModifComponent } from './ubicaciones-modif.component';

describe('UbicacionesModifComponent', () => {
  let component: UbicacionesModifComponent;
  let fixture: ComponentFixture<UbicacionesModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionesModifComponent]
    });
    fixture = TestBed.createComponent(UbicacionesModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
