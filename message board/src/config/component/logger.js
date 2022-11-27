/**
 * This script file expose the configuration of Logger.
 */
'use strict'

require('dotenv').config();
const joi = require('joi')

/**
 * This constant create a validation configuration for Logger instance.
 */
const envVarSchema = joi.object({
    LOG_LEVEL: joi.string()
        .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
        .default('info'),
    LOGGER_ENABLED: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .falsy('FALSE')
        .falsy('false')
        .default(true),
    LOGGER_TRANSPORT: joi.string()
        .valid('console', 'file', 'both')
        .default('console'),
    MAX_FILE_SIZE: joi.string()
        .default('20m'),
    MAX_HISTORY: joi.string()
        .default('15d')
}).unknown()
    .required()

const { error, value: envVars } = envVarSchema.validate(process.env)
if (error) {
    throw new Error(`Logger Config Validation Error: ${error.message}`)
}

const config = {
    logger: {
        level: envVars.LOG_LEVEL,
        enabled: envVars.LOGGER_ENABLED,
        transport: envVars.LOGGER_TRANSPORT,
        maxFileSize: envVars.MAX_FILE_SIZE,
        maxHistory: envVars.MAX_HISTORY
    }
}

module.exports = config