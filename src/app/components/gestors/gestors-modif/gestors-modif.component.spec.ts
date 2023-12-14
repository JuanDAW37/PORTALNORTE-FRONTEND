import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorsModifComponent } from './gestors-modif.component';

describe('GestorsModifComponent', () => {
  let component: GestorsModifComponent;
  let fixture: ComponentFixture<GestorsModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorsModifComponent]
    });
    fixture = TestBed.createComponent(GestorsModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
