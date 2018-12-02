import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScopesComponent } from './live-scopes.component';

describe('LiveScopesComponent', () => {
  let component: LiveScopesComponent;
  let fixture: ComponentFixture<LiveScopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveScopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveScopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
