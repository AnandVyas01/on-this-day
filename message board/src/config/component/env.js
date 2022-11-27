'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        .valid('dev', 'prod', 'test', 'stagging')
        .default('dev')
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Enviornment Config Validation Error: ${error.message}`)
}

const config = {
    env: envVars.NODE_ENV
}

module.exports = config