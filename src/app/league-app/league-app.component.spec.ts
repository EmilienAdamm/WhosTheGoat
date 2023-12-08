import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueAppComponent } from './league-app.component';

describe('LeagueAppComponent', () => {
  let component: LeagueAppComponent;
  let fixture: ComponentFixture<LeagueAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueAppComponent]
    });
    fixture = TestBed.createComponent(LeagueAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
