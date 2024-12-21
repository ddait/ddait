import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnv } from './config/env.config';

async function bootstrap() {
  try {
    const env = validateEnv(process.env);
    console.log('✅ Environment variables validated successfully');
    
    const app = await NestFactory.create(AppModule);

    // 전역 프리픽스 설정
    app.setGlobalPrefix('api');

    // 전역 파이프 설정
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    // CORS 설정
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Swagger 설정
    const config = new DocumentBuilder()
      .setTitle('Ddait v2.0 API')
      .setDescription('Ddait v2.0 API 문서')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // 서버 시작
    await app.listen(env.PORT);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
bootstrap();
