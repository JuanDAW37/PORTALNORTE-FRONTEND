import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesModifComponent } from './actividades-modif.component';

describe('ActividadesModifComponent', () => {
  let component: ActividadesModifComponent;
  let fixture: ComponentFixture<ActividadesModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesModifComponent]
    });
    fixture = TestBed.createComponent(ActividadesModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
