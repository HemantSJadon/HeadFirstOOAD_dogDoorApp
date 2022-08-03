import { Controller, Get } from '@nestjs/common';
import { DogDoorSimulatorService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly dogDoorSimulatorService: DogDoorSimulatorService) {}

  @Get()
  getHello(): string {
    return this.dogDoorSimulatorService.getHello();
  }

  @Get('/run')
  runSimulator(){
    return this.dogDoorSimulatorService.simulate();
  }
}
