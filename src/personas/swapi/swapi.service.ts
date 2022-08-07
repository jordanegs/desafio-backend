import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PeopleInterface } from './people.interface';

@Injectable()
export class SwapiService {
  public url_swapi: string;
  constructor(private readonly httpService: HttpService) {
    this.url_swapi = 'https://swapi.py4e.com/api/people';
  }

  async getPeople(id: string): Promise<PeopleInterface> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${this.url_swapi}/${id}`,
      );
      return data;
    } catch (e) {
      return null;
    }
  }
}
