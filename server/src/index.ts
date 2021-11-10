import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Sentience Common UI Framework Example (SCUF)')
    .setDescription('SCUF Example App APIs')
    .setVersion('1.0')
    .addTag('Chart')
    .addTag('Table')
    .setSchemes('http', 'https')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static('client/build'));
  app.use((req, res, next) => {
    
    // This block adds a delay to all api calls to simulate data actually coming back from a server. It must be removed before shifting to a production environment. 
    if (req.path.startsWith('/api')) {
      setTimeout(next, 1000);
    }
    else {
      res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    }
  });
  await app.listen(8080);
}
bootstrap();
