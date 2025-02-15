import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
    constructor(@Inject('winston') private readonly logger: Logger) { }

    log(message: string, context?: string) {
        this.logger.info(`${context ? `[${context}] ` : ''}${message}`);
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(`${context ? `[${context}] ` : ''}${message}`, trace);
    }

    warn(message: string, context?: string) {
        this.logger.warn(`${context ? `[${context}] ` : ''}${message}`);
    }

    debug(message: string, context?: string) {
        this.logger.debug(`${context ? `[${context}] ` : ''}${message}`);
    }
}
