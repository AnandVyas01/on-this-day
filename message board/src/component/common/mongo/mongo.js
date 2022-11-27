/**
 * This script is used to create a connection with Mongo 
 */
'use strict';

const config = require('../../../config');
const mongoose = require('mongoose');

/**
 * This is a class for Mongo Connection.
 */
class MongoConnector {
    /**
     * MongoConnector
     * @return {Mongo Connection}
     */
    constructor(logger) {
        const url = config.mongo.uri;
        const options = {
            useUnifiedTopology: config.mongo.useUnifiedTopology,
            useNewUrlParser: config.mongo.useNewUrlParser,
            autoIndex: config.mongo.autoIndex,
            dbName: config.mongo.dbName,
            maxPoolSize: config.mongo.maxPoolSize,
            minPoolSize: config.mongo.minPoolSize
        }
        mongoose.Promise = global.Promise;
        this.connect(url, options).then(() => {
            logger.info('✔ Database Connected');
        }).catch((err) => {
            logger.error('✘ MONGODB ERROR: ', err);
        });
    }

    async connect(url, options) {
        try {
            await mongoose.connect(url, options);
        } catch (e) {
            throw e;
        }
    }

    getConnection(){
        return mongoose.connection;
    }
}

module.exports = bottle => {
    bottle.service('DBConnector', MongoConnector, 'Logger')
}