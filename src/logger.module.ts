import { Module, Global, DynamicModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import 'winston-daily-rotate-file';
import { DailyRotateFile } from 'winston/lib/winston/transports';

interface LoggerModuleOptions {
  logPath: string
}

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        WinstonModule.forRoot({
          level: "silly",
          transports: [
            new winston.transports.Console({
              level: "silly",
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                  return `[${timestamp}] ${level}: ${message}`;
                })
              )
            }),
            new DailyRotateFile({
              level: "silly",
              filename: `${options.logPath}/application-%DATE%.log`,
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '10m',
              maxFiles: '14d',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
              )
            })
          ]
        })
      ],
      exports: [WinstonModule]
    };
  }
}
