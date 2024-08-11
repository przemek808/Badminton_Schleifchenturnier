import pino from 'pino'

export class Logger {
    public readonly logger: pino.Logger

    constructor(logger: pino.Logger) {
        this.logger = logger
    }

    static createLogger(logLevel: string): Logger {
        const showLogLevelLabel = {
            level: (label: string): any => ({ level: label }),
        }

        const pinoOptions: pino.LoggerOptions = {
            formatters: showLogLevelLabel,
            level: logLevel,
            timestamp: pino.stdTimeFunctions.isoTime,
            browser: {
                asObject: true,
            },
        }

        return new Logger(pino(pinoOptions))
    }

    public info(msg: string, data?: unknown): void {
        if (data) {
            this.logger.info(data, msg)
        } else {
            this.logger.info(msg)
        }
    }

    public warn(msg: string, data?: unknown): void {
        if (data) {
            this.logger.warn(data, msg)
        } else {
            this.logger.warn(msg)
        }
    }

    public debug(msg: string, data?: unknown): void {
        if (data) {
            this.logger.debug(data, msg)
        } else {
            this.logger.debug(msg)
        }
    }

    public error(msg: string, data?: unknown): void {
        if (data) {
            this.logger.error(data, msg)
        } else {
            this.logger.error(msg)
        }
    }
}

export const logger: Logger = Logger.createLogger(
    process.env.LOG_LEVEL || 'info',
)
