import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Syn } from './syn';

describe('Syn', () => {
  let component: Syn;
  let fixture: ComponentFixture<Syn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Syn],
    }).compileComponents();

    fixture = TestBed.createComponent(Syn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
