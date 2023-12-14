import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvasMenuComponent } from './ivas-menu.component';

describe('IvasMenuComponent', () => {
  let component: IvasMenuComponent;
  let fixture: ComponentFixture<IvasMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvasMenuComponent]
    });
    fixture = TestBed.createComponent(IvasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
