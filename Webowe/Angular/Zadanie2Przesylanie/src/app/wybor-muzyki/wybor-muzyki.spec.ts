import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WyborMuzyki } from './wybor-muzyki';

describe('WyborMuzyki', () => {
  let component: WyborMuzyki;
  let fixture: ComponentFixture<WyborMuzyki>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WyborMuzyki],
    }).compileComponents();

    fixture = TestBed.createComponent(WyborMuzyki);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
