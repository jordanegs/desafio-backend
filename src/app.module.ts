import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { PersonasService } from './personas/personas.service';
import { PersonasController } from './personas/personas.controller';
import { SwapiService } from './personas/swapi/swapi.service';

@Module({
  imports: [HttpModule],
  controllers: [PersonasController],
  providers: [AppService, PersonasService, SwapiService],
})
export class AppModule {}
