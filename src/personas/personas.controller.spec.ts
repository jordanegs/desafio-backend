import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';
import { SwapiService } from './swapi/swapi.service';
import { ActualizarPersonarDto } from './dto/actualizar-personar.dto';

describe('PersonasController', () => {
  let controller: PersonasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PersonasController],
      providers: [PersonasService, SwapiService],
    }).compile();

    controller = module.get<PersonasController>(PersonasController);
  });

  process.env.IS_OFFLINE = 'true';

  describe('POST /personas', () => {
    it('Debería retornar un código de estado 201', async () => {
      const response = await controller.createPersona({
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
      expect(response.data).toBeDefined();
    });
  });

  describe('GET /personas', () => {
    it('Debería retornar un código de estado 200', async () => {
      const response = await controller.getPersonas();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /personas/{id}', () => {
    it('Debería retornar un código de estado 200', async () => {
      const response = await controller.getPersona('85');
      expect(response.statusCode).toBe(200);
    });

    it('Debería retornar un estado 201 al no encontrar el ID en DynamoDB pero si en The Star Wars API y crearlo', async () => {
      const response = await controller.getPersona('5');
      expect(response.statusCode).toBe(201);
    });

    it('Debería retornar un estado 404 al no encontrar el ID en DynamoDB y tampoco en The Star Wars API', async () => {
      const response = await controller.getPersona('101');
      expect(response.statusCode).toBe(404);
    });
  });

  const actualizar: ActualizarPersonarDto = {
    Nombre: 'Juan',
    Genero: 'n/a',
    Altura: '200',
    Masa: '100',
  };

  describe('PUT /personas/{id}', () => {
    it('Debería retornar un código de estado 200 al actualizar la persona', async () => {
      const response = await controller.updatePersona('85', actualizar);
      expect(response.statusCode).toBe(200);
    });

    it('Debería retornar un estado 404 cuando la persona no esta en DynamoDB', async () => {
      const response = await controller.updatePersona('13', actualizar);
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /personas/{id}', () => {
    it('Debería retornar un código de estado 200 al eliminar la persona', async () => {
      const response = await controller.deletePersona('5');
      expect(response.statusCode).toBe(200);
    });

    it('Debería retornar un OK en true al eliminar la persona', async () => {
      const response = await controller.deletePersona('85');
      expect(response.ok).toBe(true);
    });
  });
});
