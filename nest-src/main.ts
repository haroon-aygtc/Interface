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
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  // Enable CORS
  await app.register(fastifyCors, {
    origin: true, // Allow all origins in development
    credentials: true,
  });

  // Set global prefix for all routes
  app.setGlobalPrefix("api");

  // Start the server
  await app.listen(3001, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}

bootstrap();
