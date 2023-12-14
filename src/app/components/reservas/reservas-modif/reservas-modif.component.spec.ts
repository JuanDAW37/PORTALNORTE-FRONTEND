import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasModifComponent } from './reservas-modif.component';

describe('ReservasModifComponent', () => {
  let component: ReservasModifComponent;
  let fixture: ComponentFixture<ReservasModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasModifComponent]
    });
    fixture = TestBed.createComponent(ReservasModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
