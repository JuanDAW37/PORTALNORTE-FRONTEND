import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasAltaComponent } from './guias-alta.component';

describe('GuiasAltaComponent', () => {
  let component: GuiasAltaComponent;
  let fixture: ComponentFixture<GuiasAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiasAltaComponent]
    });
    fixture = TestBed.createComponent(GuiasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
