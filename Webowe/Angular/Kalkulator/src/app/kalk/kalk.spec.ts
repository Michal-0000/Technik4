import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kalk } from './kalk';

describe('Kalk', () => {
  let component: Kalk;
  let fixture: ComponentFixture<Kalk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kalk],
    }).compileComponents();

    fixture = TestBed.createComponent(Kalk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
