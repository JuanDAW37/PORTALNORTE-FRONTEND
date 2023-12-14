import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadAltaComponent } from './publicidad-alta.component';

describe('PublicidadAltaComponent', () => {
  let component: PublicidadAltaComponent;
  let fixture: ComponentFixture<PublicidadAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadAltaComponent]
    });
    fixture = TestBed.createComponent(PublicidadAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
