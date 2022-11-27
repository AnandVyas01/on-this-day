const routes = (app, logger) => {
    logger.debug('custom header added');
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, content-type, x-access-token, authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.removeHeader("X-Powered-By");
        logger.debug('custom header ended');

        const size = Buffer.byteLength(JSON.stringify(req.body));
        logger.debug('Request Size: ' + size + " bytes");

        next();
    });
};

module.exports = routes;
