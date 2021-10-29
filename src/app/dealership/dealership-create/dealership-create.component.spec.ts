import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipCreateComponent } from './dealership-create.component';

describe('DealershipCreateComponent', () => {
  let component: DealershipCreateComponent;
  let fixture: ComponentFixture<DealershipCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
