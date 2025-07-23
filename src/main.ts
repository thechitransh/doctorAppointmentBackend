import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());


  app.enableCors({
    credentials: true,
    origin: 'https://appointdoc.netlify.app'
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
