'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    MONGO_URI: joi.string()
        .uri()
        .required(),
    DB_NAME: joi.string()
        .required(),
    AUTO_INDEX: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .falsy('FALSE')
        .falsy('false')
        .default(false),
    MAX_POOL_SIZE: joi.number()
        .default(100),
    MIN_POOL_SIZE: joi.number()
        .default(10),
    USE_NEW_URL_PARSER: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .falsy('FALSE')
        .falsy('false')
        .default(true),
    USE_UNIFIED_TOPOLOGY: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .falsy('FALSE')
        .falsy('false')
        .default(true)
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Mongo Config Validation Error: ${error.message}`)
}

const config = {
    mongo: {
        uri: envVars.MONGO_URI,
        dbName: envVars.DB_NAME,
        autoIndex: envVars.AUTO_INDEX,
        maxPoolSize: envVars.MAX_POOL_SIZE,
        minPoolSize: envVars.MIN_POOL_SIZE,
        useNewUrlParser: envVars.USE_NEW_URL_PARSER,
        useUnifiedTopology: envVars.USE_UNIFIED_TOPOLOGY 
    }
}

module.exports = config