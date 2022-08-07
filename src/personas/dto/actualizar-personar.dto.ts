import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPersonarDto {
  @ApiProperty({
    type: String,
    example: 'Jordan',
  })
  Nombre: string;

  @ApiProperty({
    type: String,
    example: 'Masculino',
  })
  Genero: string;

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
}
