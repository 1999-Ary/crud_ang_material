import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private _http: HttpClient) { }

  adddevice(data: any):Observable<any>{
    console.log(data);
    return this._http.post('http://localhost:3000/devices',data);
  }

  updatedevices(id: number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/devices/${id}`,data);
  }

  getDevicesList():Observable<any>{
    return this._http.get('http://localhost:3000/devices');
  }


  deleteDevice(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/devices/${id}`)
  }
}
