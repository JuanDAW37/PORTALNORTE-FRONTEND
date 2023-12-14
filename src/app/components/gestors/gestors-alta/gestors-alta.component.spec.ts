import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorsAltaComponent } from './gestors-alta.component';

describe('GestorsAltaComponent', () => {
  let component: GestorsAltaComponent;
  let fixture: ComponentFixture<GestorsAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorsAltaComponent]
    });
    fixture = TestBed.createComponent(GestorsAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
