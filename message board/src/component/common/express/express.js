const bodyParser = require("body-parser");
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const path = require("path");
const routes = require("../routes");
const compression = require("compression");
const config = require("../../../config");
const ResponseCode = require('../request/responseCode')

class ExpressLoader {
    constructor(logger) {
        this.app = express();
        this.router = express.Router();

        // Setup error handling, this must be after all other middleware
        this.app.use(ExpressLoader.errorHandler);

        // Serve static content
        this.app.use(express.static(path.join(__dirname, "uploads")));

        // Set up middleware
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({
            extended: false,
            limit: "20mb"
        }));
        this.app.use(bodyParser.json({ limit: "20mb" }));

        // Pass app to routes
        routes(this.app, logger);

        // Start application
        this.server = this.app.listen(config.server.port, () => {
            logger.info(`Express running, now listening on port ${config.server.port}`);
        });
    }

    get Server() {
        return this.server;
    }

    /**
     * @description Default error handler to be used with express
     * @param error Error object
     * @param req {object} Express req object
     * @param res {object} Express res object
     * @param next {function} Express next object
     * @returns {*}
     */
    static errorHandler(error, req, res, next) {
        let parsedError;

        // Attempt to gracefully parse error object
        try {
            if (error && typeof error === "object") {
                parsedError = JSON.stringify(error);
            } else {
                parsedError = error;
            }
        } catch (e) {
            logger.error(e);
        }

        // Log the original error
        logger.error(parsedError);

        // If response is already sent, don't attempt to respond to client
        if (res.headersSent) {
            return next(error);
        }

        res.status(ResponseCode.BAD_REQUEST).json({
            success: false,
            error
        });
    }
}

module.exports = bottle => {
    bottle.service('ExpressLoader', ExpressLoader, 'Logger')
}