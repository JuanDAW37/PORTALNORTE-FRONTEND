import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposActividadModifComponent } from './tipos-actividad-modif.component';

describe('TiposActividadModifComponent', () => {
  let component: TiposActividadModifComponent;
  let fixture: ComponentFixture<TiposActividadModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposActividadModifComponent]
    });
    fixture = TestBed.createComponent(TiposActividadModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
