import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1', {
    exclude: [],
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
