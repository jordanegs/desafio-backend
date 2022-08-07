import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { AppModule } from './app.module';

let cachedServer: Server;

const bootstrap = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
