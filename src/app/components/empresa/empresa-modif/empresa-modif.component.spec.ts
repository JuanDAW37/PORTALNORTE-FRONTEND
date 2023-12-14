import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaModifComponent } from './empresa-modif.component';

describe('EmpresaModifComponent', () => {
  let component: EmpresaModifComponent;
  let fixture: ComponentFixture<EmpresaModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaModifComponent]
    });
    fixture = TestBed.createComponent(EmpresaModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
