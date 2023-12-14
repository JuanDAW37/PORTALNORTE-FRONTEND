import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasMenuComponent } from './reservas-menu.component';

describe('ReservasMenuComponent', () => {
  let component: ReservasMenuComponent;
  let fixture: ComponentFixture<ReservasMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasMenuComponent]
    });
    fixture = TestBed.createComponent(ReservasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
