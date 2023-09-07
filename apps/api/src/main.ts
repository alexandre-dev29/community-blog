import {NestApplication, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: {credentials: true, origin: 'https://blogcommunity.axelmwenze.dev'},
  });
  const port = process.env.PORT;

  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Community Blog api')
    .setDescription('A little description to go herejkm')
    .setVersion('1.0')
    .addTag('blog')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(port).then(() => {
    console.log(port);
  });
}

bootstrap();
