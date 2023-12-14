import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasModifComponent } from './guias-modif.component';

describe('GuiasModifComponent', () => {
  let component: GuiasModifComponent;
  let fixture: ComponentFixture<GuiasModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiasModifComponent]
    });
    fixture = TestBed.createComponent(GuiasModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
