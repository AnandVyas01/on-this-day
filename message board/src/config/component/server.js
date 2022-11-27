'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    PORT: joi.number()
        .required()
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Server onfig Validation Error: ${error.message}`)
}

const config = {
    server: {
        port: envVars.PORT
    }
}

module.exports = config