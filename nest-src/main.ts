import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";

async function bootstrap() {
  // Create Fastify instance with appropriate options
  const fastifyAdapter = new FastifyAdapter({
    logger: process.env.NODE_ENV !== 'production',
    trustProxy: true,
  });

  // Create NestJS app with Fastify adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  // Enable validation pipes for all endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Apply global filters and interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Register Fastify plugins
  await app.register(fastifyHelmet as any, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  // Enable CORS with a simpler configuration for development
  await app.register(fastifyCors as any, {
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Disposition'],
    maxAge: 86400, // 24 hours in seconds
  });

  // Set global prefix for all routes
  app.setGlobalPrefix("api");

  // Start the server
  await app.listen(5000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}

bootstrap();
