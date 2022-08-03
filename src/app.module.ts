import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DogDoorSimulatorService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DogDoorSimulatorService],
})
export class AppModule {}
