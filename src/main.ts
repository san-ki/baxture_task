import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';

config();

export default async function bootstrap(port: string) {
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  Logger.log(`app on port ${port}`);
}

if (require.main == module) {
  const port = process.argv.length >= 3 ? process.argv[2] : process.env.PORT;
  bootstrap(port);
}
