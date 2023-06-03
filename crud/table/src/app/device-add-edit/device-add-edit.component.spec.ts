import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAddEditComponent } from './device-add-edit.component';

describe('DeviceAddEditComponent', () => {
  let component: DeviceAddEditComponent;
  let fixture: ComponentFixture<DeviceAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
