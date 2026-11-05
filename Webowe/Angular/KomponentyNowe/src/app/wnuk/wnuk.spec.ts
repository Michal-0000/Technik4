import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Wnuk } from './wnuk';

describe('Wnuk', () => {
  let component: Wnuk;
  let fixture: ComponentFixture<Wnuk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wnuk],
    }).compileComponents();

    fixture = TestBed.createComponent(Wnuk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
