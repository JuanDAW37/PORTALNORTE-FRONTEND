import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGestorComponent } from './crear-gestor.component';

describe('CrearGestorComponent', () => {
  let component: CrearGestorComponent;
  let fixture: ComponentFixture<CrearGestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearGestorComponent]
    });
    fixture = TestBed.createComponent(CrearGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
