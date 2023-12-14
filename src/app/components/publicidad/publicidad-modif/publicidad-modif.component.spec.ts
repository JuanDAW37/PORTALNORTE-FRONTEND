import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadModifComponent } from './publicidad-modif.component';

describe('PublicidadModifComponent', () => {
  let component: PublicidadModifComponent;
  let fixture: ComponentFixture<PublicidadModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadModifComponent]
    });
    fixture = TestBed.createComponent(PublicidadModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
