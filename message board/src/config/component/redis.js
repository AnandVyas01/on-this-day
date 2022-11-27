'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    REDIS_URI: joi.string()
        .uri({ scheme: 'redis' })
        .required(),
    REDIS_DATA_RETENTION_IN_MS: joi.number()
        .default(86400000)
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Redis Config Validation Error: ${error.message}`)
}

const config = {
    redis: {
        uri: envVars.REDIS_URI,
        dataRetention: envVars.REDIS_DATA_RETENTION_IN_MS
    }
}

module.exports = config