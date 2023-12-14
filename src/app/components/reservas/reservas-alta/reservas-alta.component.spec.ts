import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAltaComponent } from './reservas-alta.component';

describe('ReservasAltaComponent', () => {
  let component: ReservasAltaComponent;
  let fixture: ComponentFixture<ReservasAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasAltaComponent]
    });
    fixture = TestBed.createComponent(ReservasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
