import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesAltaComponent } from './materiales-alta.component';

describe('MaterialesAltaComponent', () => {
  let component: MaterialesAltaComponent;
  let fixture: ComponentFixture<MaterialesAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesAltaComponent]
    });
    fixture = TestBed.createComponent(MaterialesAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
