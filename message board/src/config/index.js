'use strict'

// load .env in local development
if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config({ silent: true })
}

const env = require('./component/env')
const logger = require('./component/logger')
const redis = require('./component/redis')
const server = require('./component/server')
const mongo = require('./component/mongo')

module.exports = Object.assign({}, env, logger, redis, server, mongo)
