
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DevicesService } from '../services/devices.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.css']
})
export class DeviceAddEditComponent implements OnInit {
  empForm: FormGroup;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _fb: FormBuilder,
    private _devicesService: DevicesService,
    private _dialogref: MatDialogRef<DeviceAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      device_name: '',
      price: '',
      battery: '',
      processor: '',
      rare_camera: '',
      back_camera: '',
      display: '',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.getDevicesList();
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._devicesService.updatedevices(this.data.id , this.empForm.value).subscribe({
          next: (val: any) => {
            alert('device detail Updated successfully');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })

      } else {


        this._devicesService.adddevice(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('device addes successfully');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
    // this.getDevicesList();

  }

  getDevicesList() {
    this._devicesService.getDevicesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
