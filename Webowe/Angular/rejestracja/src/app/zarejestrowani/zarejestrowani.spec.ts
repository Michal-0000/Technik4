import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zarejestrowani } from './zarejestrowani';

describe('Zarejestrowani', () => {
  let component: Zarejestrowani;
  let fixture: ComponentFixture<Zarejestrowani>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zarejestrowani],
    }).compileComponents();

    fixture = TestBed.createComponent(Zarejestrowani);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
