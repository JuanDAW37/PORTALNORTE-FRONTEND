import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAltaComponent } from './empresa-alta.component';

describe('EmpresaAltaComponent', () => {
  let component: EmpresaAltaComponent;
  let fixture: ComponentFixture<EmpresaAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaAltaComponent]
    });
    fixture = TestBed.createComponent(EmpresaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
