import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceAddEditComponent } from './device-add-edit/device-add-edit.component';
import { DevicesService } from './services/devices.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'id','device_name',
    'price', 'battery',
    'processor',
    'rare_camera',
    'back_camera',
    'display','action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _devicesService: DevicesService,
    ) {}

    ngOnInit(): void {
      this.getDevicesList();
    }

  opendeviceaddedit(){
    const dialogRef = this._dialog.open(DeviceAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getDevicesList();
        }
      }
    })
  }

  getDevicesList(){
    this._devicesService.getDevicesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        console.log(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDevice(id: number){
    this._devicesService.deleteDevice(id).subscribe({
      next: (res) =>{
        alert('Device deleted')
        this.getDevicesList();
      },
      error: console.log,
    })
  }

  openeditdevice(data:any){
    const dialogRef = this._dialog.open(DeviceAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getDevicesList();
        }
      }
    })
  }
}
