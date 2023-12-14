import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasMenuComponent } from './guias-menu.component';

describe('GuiasMenuComponent', () => {
  let component: GuiasMenuComponent;
  let fixture: ComponentFixture<GuiasMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiasMenuComponent]
    });
    fixture = TestBed.createComponent(GuiasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
