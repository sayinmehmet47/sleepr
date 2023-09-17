import { Module } from '@nestjs/common';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    NestLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            level: 'debug',
            prettyPrint: {
              colorize: true,
              translateTime: true,
              ignore: 'pid,hostname',
            },
          },
        },
      },
    }),
  ],
  exports: [NestLoggerModule],
})
export class LoggerModule {}
