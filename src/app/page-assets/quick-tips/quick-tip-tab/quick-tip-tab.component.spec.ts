import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTipTabComponent } from './quick-tip-tab.component';

describe('QuickTipTabComponent', () => {
  let component: QuickTipTabComponent;
  let fixture: ComponentFixture<QuickTipTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickTipTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTipTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
