import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";
import { AttributeMap, DocumentClient } from "aws-sdk/clients/dynamodb";
import { CrearPersonaDto } from "./dto/crear-persona.dto";
import { SwapiService } from "./swapi/swapi.service";
import { ActualizarPersonarDto } from "./dto/actualizar-personar.dto";

@Injectable()
export class PersonasService {
  private readonly db: DocumentClient;
  private readonly tableName;

  constructor(private readonly swapiService: SwapiService) {
    this.tableName = 'PersonasTable';
    this.db = process.env.IS_OFFLINE
      ? new AWS.DynamoDB.DocumentClient({
          region: 'localhost',
          endpoint: 'http://localhost:8000',
        })
      : new AWS.DynamoDB.DocumentClient();
  }

  async getPersonas(): Promise<any> {
    try {
      const result = await this.db
        .scan({
          TableName: this.tableName,
        })
        .promise();
      return result.Items;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createPersona(crearPersonaDto: CrearPersonaDto): Promise<any> {
    const persona = {
      Id: uuid(),
      ...crearPersonaDto,
    };
    try {
      await this.db
        .put({
          TableName: this.tableName,
          Item: persona,
        })
        .promise();
      return persona;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getPersona(id: string): Promise<any> {
    try {
      const result = await this.db
        .scan({
          TableName: this.tableName,
          FilterExpression: '#link = :url',
          ExpressionAttributeValues: {
            ':url': `${this.swapiService.url_swapi}/${id}/`,
          },
          ExpressionAttributeNames: { '#link': 'Url' },
        })
        .promise();
      return result.Items.length > 0 ? result.Items[0] : null;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updatePersona(
    persona: AttributeMap,
    actualizarPersonarDto: ActualizarPersonarDto,
  ): Promise<any> {
    try {
      return await this.db
        .update({
          TableName: this.tableName,
          Key: { Id: persona.Id },
          UpdateExpression:
            'set Nombre = :nombre, Genero = :genero, Altura = :altura, Masa = :masa',
          ExpressionAttributeValues: {
            ':nombre': actualizarPersonarDto.Nombre || persona.Nombre,
            ':genero': actualizarPersonarDto.Genero || persona.Genero,
            ':altura': actualizarPersonarDto.Altura || persona.Altura,
            ':masa': actualizarPersonarDto.Masa || persona.Masa,
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deletePersona(Id: string): Promise<any> {
    try {
      await this.db
        .delete({
          TableName: this.tableName,
          Key: {
            Id,
          },
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
