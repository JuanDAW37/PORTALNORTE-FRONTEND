import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvasAltaComponent } from './ivas-alta.component';

describe('IvasAltaComponent', () => {
  let component: IvasAltaComponent;
  let fixture: ComponentFixture<IvasAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvasAltaComponent]
    });
    fixture = TestBed.createComponent(IvasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
