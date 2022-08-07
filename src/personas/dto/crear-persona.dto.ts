import { ApiProperty } from '@nestjs/swagger';

export class CrearPersonaDto {
  @ApiProperty({
    type: String,
    example: 'Jordan',
  })
  Nombre: string;

  @ApiProperty({
    type: String,
    example: '19BBY',
  })
  AnioCumpleanios: string;

  @ApiProperty({
    type: String,
    example: 'Marroles',
  })
  ColorOjos: string;

  @ApiProperty({
    type: String,
    example: 'Masculino',
  })
  Genero: string;

  @ApiProperty({
    type: String,
    example: 'Negro',
  })
  ColorCabello: string;

  @ApiProperty({
    type: Number,
    example: 175,
  })
  Altura: string;

  @ApiProperty({
    type: Number,
    example: 75,
  })
  Masa: string;

  @ApiProperty({
    type: String,
    example: 'Oscura',
  })
  ColorPiel: string;

  @ApiProperty({
    type: String,
    example: 'https://swapi.py4e.com/api/planets/1/',
  })
  MundoNatal: string;

  @ApiProperty({
    type: [String],
    example: [
      'https://swapi.py4e.com/api/films/1/',
      'https://swapi.py4e.com/api/films/2/',
      'https://swapi.py4e.com/api/films/3/',
      'https://swapi.py4e.com/api/films/6/',
      'https://swapi.py4e.com/api/films/7/',
    ],
  })
  Peliculas: Array<string>;

  @ApiProperty({
    type: [String],
    example: ['https://swapi.py4e.com/api/species/1/'],
  })
  Especies: Array<string>;

  @ApiProperty({
    type: [String],
    example: [
      'https://swapi.py4e.com/api/starships/12/',
      'https://swapi.py4e.com/api/starships/22/',
    ],
  })
  NavesEstelares: Array<string>;

  @ApiProperty({
    type: [String],
    example: [
      'https://swapi.py4e.com/api/vehicles/14/',
      'https://swapi.py4e.com/api/vehicles/30/',
    ],
  })
  Vehiculos: Array<string>;

  @ApiProperty({
    type: String,
    example: 'https://swapi.py4e.com/api/people/27/',
  })
  Url: string;

  @ApiProperty({
    type: Date,
    example: '2014-12-09T13:50:51.644000Z',
  })
  Creado: string;

  @ApiProperty({
    type: Date,
    example: '2014-12-20T21:17:56.891000Z',
  })
  Editado: string;
}
