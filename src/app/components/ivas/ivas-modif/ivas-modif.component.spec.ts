import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvasModifComponent } from './ivas-modif.component';

describe('IvasModifComponent', () => {
  let component: IvasModifComponent;
  let fixture: ComponentFixture<IvasModifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvasModifComponent]
    });
    fixture = TestBed.createComponent(IvasModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
