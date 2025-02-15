import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import 'winston-daily-rotate-file';

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
  controllers: [AppController],
  providers: [AppService],
  exports: [WinstonModule]
})
export class AppModule { }
