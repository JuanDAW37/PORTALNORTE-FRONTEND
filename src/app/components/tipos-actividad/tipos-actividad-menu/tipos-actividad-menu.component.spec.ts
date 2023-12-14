import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadMenuComponent } from './tipos-actividad-menu.component';

describe('TiposActividadMenuComponent', () => {
  let component: TiposActividadMenuComponent;
  let fixture: ComponentFixture<TiposActividadMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposActividadMenuComponent]
    });
    fixture = TestBed.createComponent(TiposActividadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
