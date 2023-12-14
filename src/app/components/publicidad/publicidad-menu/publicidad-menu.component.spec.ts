import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadMenuComponent } from './publicidad-menu.component';

describe('PublicidadMenuComponent', () => {
  let component: PublicidadMenuComponent;
  let fixture: ComponentFixture<PublicidadMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadMenuComponent]
    });
    fixture = TestBed.createComponent(PublicidadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
