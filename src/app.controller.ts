import { Controller, Get } from '@nestjs/common';
import { DessertCounterSimulatorService } from './dessertCounterSimulator.service';
import { DogDoorSimulatorService } from './dogDoorSimulator.service';
import { RickGuitarSearchSimulator } from './rickMusicInstrumentSearchTool/rickSearchToolSimulator.service';
import { RickSearchToolSimulatorServiceNew } from './rickMusicInstrumentSearchTool/rickSearchToolSimulator2.service';

@Controller()
export class AppController {
  constructor(private readonly dogDoorSimulator: DogDoorSimulatorService,
    private readonly rickGuitarSearchSimulator: RickGuitarSearchSimulator,
    private readonly rickGuitarSearchSimulatorNew: RickSearchToolSimulatorServiceNew,
    private readonly dessertCounterSimulator: DessertCounterSimulatorService) {}

  @Get()
  getHello(): string {
    return this.dogDoorSimulator.getHello();
  }

  @Get('/runDogDoor')
  runSimulator(){
    return this.dogDoorSimulator.simulate();
  }

  @Get('/runRickGuitar')
  runGuitarSearchSimulator(){
    //return this.rickGuitarSearchSimulator.simulate();
    return this.rickGuitarSearchSimulatorNew.simulate();
  }


  @Get('/runDessertCounter')
  runDessertCounterSimulator(){
    return this.dessertCounterSimulator.simulate();
  }
}
