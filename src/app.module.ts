import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DessertCounterSimulatorService } from './dessertCounterSimulator.service';
import { DogDoorSimulatorService } from './dogDoorSimulator.service';
import { RickGuitarSearchSimulator } from './rickMusicInstrumentSearchTool/rickSearchToolSimulator.service';
import { RickSearchToolSimulatorServiceNew } from './rickMusicInstrumentSearchTool/rickSearchToolSimulator2.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DogDoorSimulatorService,RickGuitarSearchSimulator,
    RickSearchToolSimulatorServiceNew,
    DessertCounterSimulatorService],
})
export class AppModule {}
