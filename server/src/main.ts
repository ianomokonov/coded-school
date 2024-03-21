import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { exec } from 'child_process';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });
  app.setGlobalPrefix('api');
  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .setTitle('CodedSchool')
    .setDescription('CodedSchool API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);

  if (!process.env.GEN_API) {
    return;
  }

  exec('cd ../client && npm run api:gen', (err, stdout) => {
    console.log(stdout);
  });
}
bootstrap();
