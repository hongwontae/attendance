import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory(errors) {
        return new BadRequestException({
          message : 'Validation failed',
          errors : errors.map((err)=>{
            return {
              field : err.property,
              messages : Object.values(err.constraints ?? {})
            }
          })
        })
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
