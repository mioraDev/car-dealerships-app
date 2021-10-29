import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipDeleteComponent } from './dealership-delete.component';

describe('DealershipDeleteComponent', () => {
  let component: DealershipDeleteComponent;
  let fixture: ComponentFixture<DealershipDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
