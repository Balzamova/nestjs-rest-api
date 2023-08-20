import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

function addSwaggerDoc(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Nest.js rest api')
    .setDescription('test task')
    .setVersion('1.0.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}

async function bootstrap(): Promise<void> {  
  const app = await NestFactory.create(AppModule);

  addSwaggerDoc(app);
  
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(+process.env.PORT, () => console.log(`Server started on http://localhost:${+process.env.PORT}`));
}
bootstrap();
