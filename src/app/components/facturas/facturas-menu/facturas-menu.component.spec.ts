import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasMenuComponent } from './facturas-menu.component';

describe('FacturasMenuComponent', () => {
  let component: FacturasMenuComponent;
  let fixture: ComponentFixture<FacturasMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasMenuComponent]
    });
    fixture = TestBed.createComponent(FacturasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
