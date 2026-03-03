import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Serve the generated receipt PDFs
  app.use('/receipts', express.static(join(process.cwd(), 'receipts')));
  
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
