'use strict';

const config = require('../../../config');
const winston = require('winston');
require('winston-daily-rotate-file');
const { format, transports, createLogger } = winston;

/**
 * This is a class for Logger.
 */
class Logger {
    /**
     * Logger
     * @return {winston.Logger}
     */
    constructor() {
        let transportsToAdd = [];
        if (config.logger.transport === 'console' || config.logger.transport === 'both') {
            transportsToAdd.push(new transports.Console({
                level: config.logger.level,
                silent: !config.logger.enabled,
                format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json())
            }))
        }
        if (config.logger.transport === 'file' || config.logger.transport === 'both') {
            transportsToAdd.push(new transports.DailyRotateFile({
                filename: 'logs/xploresenseLogs.log',
                level: config.logger.level,
                maxSize: config.logger.maxFileSize,
                maxFiles: config.logger.maxHistory,
                silent: !config.logger.enabled,
                format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json())
            }))
        }

        return createLogger({
            transports: transportsToAdd,
        });
    }
}

//global.logger = new Logger();

module.exports = bottle => {
    bottle.service('Logger', Logger)
}