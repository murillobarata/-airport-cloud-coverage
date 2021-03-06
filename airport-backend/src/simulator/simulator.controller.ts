import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MapInfoData } from './dto/map-info-data';

@Controller('simulator')
export class SimulatorController {
  constructor() {}

  @Post()
  create(@Body() mapInfo: MapInfoData) {
    let airports = [];
    let clouds = [];

    let frames = mapInfo.frames; 

    let xValues = Object.keys(frames);
    xValues.map((x) => {
        let yValues = Object.keys(frames[x]);
        yValues.map((y) => {
            if ( frames[x][y].type === 'airport' ) {
                airports.push(frames[x][y]);
            } else {
                clouds.push(frames[x][y]);
            }
        });
    });

    let days = [];
    let airportsMinDistances = [];
    airports.map(airport => {
      let airportMinDist: number;
      clouds.map(cloud => {
        let distance =  Math.sqrt(((cloud.coordX - airport.coordX)**2) + ((cloud.coordY - airport.coordY)**2)); 
        distance = Math.floor(distance);
        if (!airportMinDist || airportMinDist > distance) {
          airportMinDist = distance;
        }  
        days.push(distance);
      });
      airportsMinDistances.push(airportMinDist);
    });

    return {
      'minDays': Math.min(...days),
      'maxDays': Math.max(...airportsMinDistances),
      'days': days,
      'airportsMinDistances': airportsMinDistances,
    };
  }
}