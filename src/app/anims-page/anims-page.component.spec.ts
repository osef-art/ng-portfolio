import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimsPageComponent } from './anims-page.component';

describe('AnimsPageComponent', () => {
  let component: AnimsPageComponent;
  let fixture: ComponentFixture<AnimsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
