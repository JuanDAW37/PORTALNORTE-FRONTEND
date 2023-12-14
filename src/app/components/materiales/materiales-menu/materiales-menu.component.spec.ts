import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesMenuComponent } from './materiales-menu.component';

describe('MaterialesMenuComponent', () => {
  let component: MaterialesMenuComponent;
  let fixture: ComponentFixture<MaterialesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesMenuComponent]
    });
    fixture = TestBed.createComponent(MaterialesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
