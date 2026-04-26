import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const startLocal = async () => {
    const nestApp = await bootstrap();
    const port = process.env.PORT ?? 3000;
    await nestApp.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  };
  void startLocal().catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });
}

// Export for Vercel
export default async (req: unknown, res: unknown) => {
  const nestApp = await bootstrap();
  const instance = nestApp.getHttpAdapter().getInstance() as (
    req: unknown,
    res: unknown,
  ) => void;
  instance(req, res);
};
