import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapConfiguration } from '../_interfaces/map-configuration';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  constructor(private http: HttpClient) { }

  loadSimulation(mapConfig: MapConfiguration, frames: any) {
    const url = `${environment.url}/simulator`;
    const body = {
      ...mapConfig,
      frames: frames
    };
    return this.http.post(url, body);
  }
}
