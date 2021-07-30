import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTipLangComponent } from './quick-tip-lang.component';

describe('QuickTipLangComponent', () => {
  let component: QuickTipLangComponent;
  let fixture: ComponentFixture<QuickTipLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickTipLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTipLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
