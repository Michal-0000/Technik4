import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WyborJezyka } from './wybor-jezyka';

describe('WyborJezyka', () => {
  let component: WyborJezyka;
  let fixture: ComponentFixture<WyborJezyka>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WyborJezyka],
    }).compileComponents();

    fixture = TestBed.createComponent(WyborJezyka);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
