import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcjeJezyka } from './opcje-jezyka';

describe('OpcjeJezyka', () => {
  let component: OpcjeJezyka;
  let fixture: ComponentFixture<OpcjeJezyka>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcjeJezyka],
    }).compileComponents();

    fixture = TestBed.createComponent(OpcjeJezyka);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
