import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newspaper } from './newspaper';

describe('Newspaper', () => {
  let component: Newspaper;
  let fixture: ComponentFixture<Newspaper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newspaper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newspaper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
