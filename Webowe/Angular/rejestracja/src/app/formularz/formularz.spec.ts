import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Formularz } from './formularz';

describe('Formularz', () => {
  let component: Formularz;
  let fixture: ComponentFixture<Formularz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formularz],
    }).compileComponents();

    fixture = TestBed.createComponent(Formularz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
