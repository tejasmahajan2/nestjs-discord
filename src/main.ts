import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  const appUrl = await app.getUrl();
  process.env.APP_URL=appUrl;
  console.log(`Application is running on : ${appUrl}`)
}
bootstrap();
