import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { SwapiService } from './swapi.service';
import { PeopleInterface } from './people.interface';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SwapiService],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
  });

  it('Debería retornar un documento con la información de la persona', async () => {
    const data: PeopleInterface = await service.getPeople('85');
    expect(data).toBeDefined();
  });

  it('Debería retornar un nulo cuando la persona no existe en The Star Wars API', async () => {
    const data = await service.getPeople('89');
    expect(data).toBeNull();
  });
});
