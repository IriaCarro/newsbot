const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routes');

module.exports = function initWebServer() {
    const port = process.env.PORT || 3000;
    const app = express();
    app.use(bodyParser.json());
    app.use('/api', routers.userRouter);
    app.use('/api', routers.crawlerRouter);
    app.use('/api', routers.crawlerUserRouter);
    app.listen(port, () => {
          console.log(`Server running and listening on port ${port}`);
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(400).send({
            error: `Body parser: ${err.message}`
        });
    });
};