import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddressFormComponent } from './person-address-form.component';

describe('PersonAddressFormComponent', () => {
  let component: PersonAddressFormComponent;
  let fixture: ComponentFixture<PersonAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
