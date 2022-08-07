import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PersonasService } from './personas.service';
import { CrearPersonaDto } from './dto/crear-persona.dto';
import { ServerObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwapiService } from './swapi/swapi.service';
import { ActualizarPersonarDto } from './dto/actualizar-personar.dto';

const servers: Array<ServerObject> = [
  {
    url: 'https://n06z9agomi.execute-api.us-west-2.amazonaws.com/dev',
    description: 'Producción',
  },
  {
    url: 'http://localhost:3000/dev',
    description: 'Desarrollo',
  },
];

@ApiTags('Personas')
@Controller('personas')
export class PersonasController {
  constructor(
    private readonly personasService: PersonasService,
    private readonly swapiService: SwapiService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Trae todas las personas que se encuentran en DynamoDB',
    servers,
  })
  @ApiOkResponse({
    description: 'Listado de Personas.',
  })
  async getPersonas() {
    const personas = await this.personasService.getPersonas();
    return { ok: true, statusCode: 200, data: personas };
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Buscar persona en DynamoDB si no se encuentra se busca en The Star Wars API y se guarda en DynamoDB',
    servers,
  })
  @ApiCreatedResponse({
    description: 'Información detallada de la persona.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  async getPersona(@Param('id') id: string) {
    const persona = await this.personasService.getPersona(id);
    if (!persona) {
      const people = await this.swapiService.getPeople(id);
      if (people) {
        const crearPersona: CrearPersonaDto = {
          Nombre: people.name,
          AnioCumpleanios: people.birth_year,
          ColorOjos: people.eye_color,
          Genero: people.gender,
          ColorCabello: people.hair_color,
          Altura: people.height,
          Masa: people.mass,
          ColorPiel: people.skin_color,
          MundoNatal: people.homeworld,
          Peliculas: people.films,
          Especies: people.species,
          NavesEstelares: people.starships,
          Vehiculos: people.vehicles,
          Url: people.url,
          Creado: people.created,
          Editado: people.edited,
        };
        return await this.createPersona(crearPersona);
      } else {
        return {
          ok: false,
          statusCode: 404,
          data: 'No existe ID',
        };
      }
    }
    return {
      ok: true,
      statusCode: 200,
      data: persona,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar información de persona en DynamoDB',
    servers,
  })
  @ApiCreatedResponse({
    description: 'Persona creada correctamente',
  })
  async createPersona(@Body() crearPersonaDto: CrearPersonaDto) {
    const personaCreada = await this.personasService.createPersona(
      crearPersonaDto,
    );
    return {
      ok: true,
      statusCode: 201,
      data: personaCreada,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar información de persona en DynamoDB',
    servers,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  async updatePersona(
    @Param('id') id: string,
    @Body() actualizarPersonarDto: ActualizarPersonarDto,
  ) {
    const persona = await this.personasService.getPersona(id);
    if (persona) {
      const personaActualizada = await this.personasService.updatePersona(
        persona,
        actualizarPersonarDto,
      );
      return {
        ok: true,
        statusCode: 200,
        data: personaActualizada,
      };
    } else {
      return {
        ok: true,
        statusCode: 404,
        data: 'No existe ID',
      };
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminación de la persona en DynamoDB',
    servers,
  })
  @ApiCreatedResponse({
    description: 'Persona eliminada correctamente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  async deletePersona(@Param('id') id: string) {
    const persona = await this.personasService.getPersona(id);
    if (persona) {
      await this.personasService.deletePersona(persona.Id);
      return {
        ok: true,
        statusCode: 200,
      };
    } else {
      return {
        ok: false,
        statusCode: 404,
        data: 'No existe ID',
      };
    }
  }
}
