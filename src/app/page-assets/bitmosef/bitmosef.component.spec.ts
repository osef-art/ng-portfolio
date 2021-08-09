import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitmosefComponent } from './bitmosef.component';

describe('BitmosefComponent', () => {
  let component: BitmosefComponent;
  let fixture: ComponentFixture<BitmosefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitmosefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitmosefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
