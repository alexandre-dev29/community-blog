import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: { credentials: true, origin: 'http://localhost:3000' },
  });
  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Community Blog api')
    .setDescription('A little description to go herejkm')
    .setVersion('1.0')
    .addTag('blog')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(3008).then((values) => {
    console.log(3008);
  });
}

bootstrap();
