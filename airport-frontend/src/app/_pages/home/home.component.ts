import { Component, OnInit } from '@angular/core';

import { SimulatorService } from 'src/app/_services/simulator.service';

import { MapConfiguration } from 'src/app/_interfaces/map-configuration';
import { Frame } from 'src/app/_models/frame';
import { FrameType } from 'src/app/_enums/frame-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  canSimulate: boolean = false;
  showDays: boolean = false;

  mapConfig: MapConfiguration;
  frames: any;

  firstAirportDays: number;
  allAirportsDays: number;

  constructor(private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    this.initConfig();
    this.frames = {};
  }

  initConfig() {
    this.mapConfig = {
      xSize: 10,
      ySize: 10,
      cloudsNumber: 4,
      airportsNumber: 3
    };
  }

  loadMap() {
    this.showDays = false;
    this.createFrames();
  }

  loadSimulation() {
    this.simulatorService.loadSimulation(this.mapConfig, this.frames).subscribe((res: any) => {
      this.showDays = true;
      this.allAirportsDays = res.maxDays;
      this.firstAirportDays = res.minDays;
    });
  }

  createFrames() {
    this.frames = {};
    let usedCoordinates = {};

    let airportIndex = 0;
    while(airportIndex < this.mapConfig.airportsNumber) {
      const airportPositionX = Math.floor(Math.random() * (this.mapConfig.xSize));
      const airportPositionY = Math.floor(Math.random() * (this.mapConfig.ySize));

      if (
        (usedCoordinates[airportPositionX.toString()] &&
        !usedCoordinates[airportPositionX.toString()].includes(airportPositionY)) ||
        !usedCoordinates[airportPositionX.toString()]
      ) {
        const newFrame = new Frame();
        newFrame.coordX = airportPositionX;
        newFrame.coordY = airportPositionY;
        newFrame.type = FrameType.AIRPORT;

        if (this.frames[airportPositionX.toString()]) {
          this.frames[airportPositionX.toString()][airportPositionY.toString()] = newFrame;
          usedCoordinates[airportPositionX.toString()].push(airportPositionY);
        } else {
          this.frames[airportPositionX.toString()] = {};
          this.frames[airportPositionX.toString()][airportPositionY.toString()] = newFrame;
          usedCoordinates[airportPositionX.toString()] = [airportPositionY];
        }
        ++airportIndex;
      }
    }

    let cloudIndex = 0;
    while(cloudIndex < this.mapConfig.cloudsNumber) {
      const cloudPositionX = Math.floor(Math.random() * (this.mapConfig.xSize));
      const cloudPositionY = Math.floor(Math.random() * (this.mapConfig.ySize));

      if (
        (usedCoordinates[cloudPositionX.toString()] &&
        !usedCoordinates[cloudPositionX.toString()].includes(cloudPositionY)) ||
        !usedCoordinates[cloudPositionX.toString()]
      ) {

        const newFrame = new Frame();
        newFrame.coordX = cloudPositionX;
        newFrame.coordY = cloudPositionY;
        newFrame.type = FrameType.CLOUD;

        if (this.frames[cloudPositionX.toString()]) {
          this.frames[cloudPositionX.toString()][cloudPositionY.toString()] = newFrame;
          usedCoordinates[cloudPositionX.toString()].push(cloudPositionY);
        } else {
          this.frames[cloudPositionX.toString()] = {};
          this.frames[cloudPositionX.toString()][cloudPositionY.toString()] = newFrame;
          usedCoordinates[cloudPositionX.toString()] = [cloudPositionY];
        }
        ++cloudIndex;
      }
    }
  }

  validateAirportsNumber() {
    if (this.mapConfig.airportsNumber < 3) {
      this.mapConfig.airportsNumber = 3;
    } else if (this.mapConfig.airportsNumber >
      (this.mapConfig.xSize * this.mapConfig.ySize - this.mapConfig.cloudsNumber)) {
      this.mapConfig.airportsNumber = 3;
    }
  }

  validateCloudsNumber() {
    if (this.mapConfig.cloudsNumber < 4) {
      this.mapConfig.cloudsNumber = 4;
    } else if (this.mapConfig.cloudsNumber >
      (this.mapConfig.xSize * this.mapConfig.ySize - this.mapConfig.airportsNumber)) {
      this.mapConfig.cloudsNumber = 4;
    }
  }

}
