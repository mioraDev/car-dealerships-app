import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipUpdateComponent } from './dealership-update.component';

describe('DealershipUpdateComponent', () => {
  let component: DealershipUpdateComponent;
  let fixture: ComponentFixture<DealershipUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
