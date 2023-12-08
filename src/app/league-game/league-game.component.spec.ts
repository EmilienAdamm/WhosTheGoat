import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueGameComponent } from './league-game.component';

describe('LeagueGameComponent', () => {
  let component: LeagueGameComponent;
  let fixture: ComponentFixture<LeagueGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueGameComponent]
    });
    fixture = TestBed.createComponent(LeagueGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
