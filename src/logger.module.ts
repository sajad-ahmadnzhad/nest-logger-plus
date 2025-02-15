import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import 'winston-daily-rotate-file';

@Global()
@Module({
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
              return `[${timestamp}] ${level}: ${message}`
            })
          )
        }),
        new winston.transports.DailyRotateFile({
          level: "silly",
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYY-MM-DD',
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
})
export class LoggerModule { }
