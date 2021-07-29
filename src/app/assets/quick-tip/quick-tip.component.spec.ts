import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTipComponent } from './quick-tip.component';

describe('QuickTipComponent', () => {
  let component: QuickTipComponent;
  let fixture: ComponentFixture<QuickTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
