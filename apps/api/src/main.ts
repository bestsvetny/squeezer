import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 5000;
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe());
    console.log(PORT);
    await app.listen(PORT);
}
bootstrap();
