import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorsMenuComponent } from './gestors-menu.component';

describe('GestorsMenuComponent', () => {
  let component: GestorsMenuComponent;
  let fixture: ComponentFixture<GestorsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorsMenuComponent]
    });
    fixture = TestBed.createComponent(GestorsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
