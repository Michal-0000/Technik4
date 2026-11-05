import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WynikMuzyka } from './wynik-muzyka';

describe('WynikMuzyka', () => {
  let component: WynikMuzyka;
  let fixture: ComponentFixture<WynikMuzyka>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WynikMuzyka],
    }).compileComponents();

    fixture = TestBed.createComponent(WynikMuzyka);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
