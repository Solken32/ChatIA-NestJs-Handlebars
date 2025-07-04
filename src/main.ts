import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // para uso de handlebars ( vistas en back )
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname,"..", "views"));
  app.setViewEngine("hbs");


  app.enableCors(); // para que la API se use en otro front tambien
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();





