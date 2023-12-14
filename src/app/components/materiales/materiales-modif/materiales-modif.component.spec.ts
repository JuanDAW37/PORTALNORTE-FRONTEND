import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesModifComponent } from './materiales-modif.component';

describe('MaterialesModifComponent', () => {
  let component: MaterialesModifComponent;
  let fixture: ComponentFixture<MaterialesModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesModifComponent]
    });
    fixture = TestBed.createComponent(MaterialesModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
