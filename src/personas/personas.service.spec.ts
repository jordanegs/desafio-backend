import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { PersonasService } from './personas.service';
import { SwapiService } from './swapi/swapi.service';

describe('PersonasService', () => {
  let service: PersonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PersonasService, SwapiService],
    }).compile();

    service = module.get<PersonasService>(PersonasService);
  });

  process.env.IS_OFFLINE = 'true';

  it('Debería retornar el documento al ser creado', async () => {
    const response = await service.createPersona({
      Nombre: 'Jordan',
      AnioCumpleanios: '19BBY',
      ColorOjos: 'Marroles',
      Genero: 'Hombre',
      ColorCabello: 'Negro',
      Altura: '175',
      Masa: '75',
      ColorPiel: 'Oscura',
      MundoNatal: 'https://swapi.py4e.com/api/planets/1/',
      Peliculas: [
        'https://swapi.py4e.com/api/films/1/',
        'https://swapi.py4e.com/api/films/2/',
        'https://swapi.py4e.com/api/films/3/',
        'https://swapi.py4e.com/api/films/6/',
        'https://swapi.py4e.com/api/films/7/',
      ],
      Especies: ['https://swapi.py4e.com/api/species/1/'],
      NavesEstelares: [
        'https://swapi.py4e.com/api/starships/12/',
        'https://swapi.py4e.com/api/starships/22/',
      ],
      Vehiculos: [
        'https://swapi.py4e.com/api/vehicles/14/',
        'https://swapi.py4e.com/api/vehicles/30/',
      ],
      Url: 'https://swapi.py4e.com/api/people/85/',
      Creado: '2014-12-09T13:50:51.644000Z',
      Editado: '2014-12-20T21:17:56.891000Z',
    });
    expect(response).toBeDefined();
  });

  it('Debería retornar el arreglo de personas', async () => {
    const response = await service.getPersonas();
    expect(response).toBeInstanceOf(Array);
  });

  let persona = null;

  it('Debería retornar el documento al buscar con un ID', async () => {
    const response = await service.getPersona('85');
    persona = response;
    expect(response).toBeDefined();
  });

  it('Debería retornar el documento al ser actualizado', async () => {
    const response = await service.updatePersona(persona, {
      Nombre: 'Juan',
      Genero: 'n/a',
      Altura: '200',
      Masa: '100',
    });
    expect(response).toBeDefined();
  });

  it('Debería retornar sin errores al eliminar una persona', async () => {
    const response = await service.deletePersona('85');
    expect(response).toBeUndefined();
  });
});
