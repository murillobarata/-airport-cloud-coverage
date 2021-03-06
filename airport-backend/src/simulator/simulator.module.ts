import { Module } from '@nestjs/common';
import { SimulatorController } from './simulator.controller';

@Module({
  controllers: [SimulatorController],
  providers: []
})
export class SimulatorModule {}
