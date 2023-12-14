import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadAltaComponent } from './tipos-actividad-alta.component';

describe('TiposActividadAltaComponent', () => {
  let component: TiposActividadAltaComponent;
  let fixture: ComponentFixture<TiposActividadAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposActividadAltaComponent]
    });
    fixture = TestBed.createComponent(TiposActividadAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
