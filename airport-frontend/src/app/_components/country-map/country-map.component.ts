import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Frame } from '../../_models/frame';
import { MapConfiguration } from '../../_interfaces/map-configuration';
import { FrameType } from 'src/app/_enums/frame-type.enum';

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnChanges {

  @Input()
  mapConfig: MapConfiguration;

  @Input()
  frames: Frame[];

  xAxis: number[];
  yAxis: number[];

  constructor() { }

  ngOnChanges(): void {
    this.xAxis = Array(this.mapConfig.xSize).fill(null).map((_,i)=> i);
    this.yAxis = Array(this.mapConfig.ySize).fill(null).map((_,i)=> i);
  }

  getFrameClass(x: number, y: number): string {
    const xStr = (x).toString();
    const yStr = (y).toString();
    // console.log('coord:',xStr,yStr);

    if (this.frames[xStr] && this.frames[xStr][yStr]) {
      return this.frames[xStr][yStr].type;
    } else {
      return '';
    }
  }

}
