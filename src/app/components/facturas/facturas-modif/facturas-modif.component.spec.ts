import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasModifComponent } from './facturas-modif.component';

describe('FacturasModifComponent', () => {
  let component: FacturasModifComponent;
  let fixture: ComponentFixture<FacturasModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasModifComponent]
    });
    fixture = TestBed.createComponent(FacturasModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
