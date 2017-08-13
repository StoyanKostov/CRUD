const HTTP = require('http'),
    URL = require('url'),
    CONFIG = require('./config')[process.env.NODE_ENV],
    { initApp } = require('./utils'),
    APP_MODULES = ['user'];
let app;

// Init application
app = initApp(APP_MODULES);

// Start apllication server
const server = HTTP.createServer(function (req, res) {
    let urlParsed = URL.parse(req.url),
        pathname = urlParsed.pathname,
        body = "";

    if ((req.method === 'GET' || req.method === 'DELETE') && urlParsed.query !== null) {
        let getParams = urlParsed.query.split('&');
        body = getParams.reduce((obj, param) => {
            let decomposedParam = param.split('=');
            obj[decomposedParam[0]] = decomposedParam[1];
            return obj;
        }, {});
    };

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        res.setHeader('Content-Type', 'application/json');
        try {
            let route = app.routes[urlParsed.pathname];
            if (route.method === req.method) {
                req.body = typeof body === 'string' && body != '' ? JSON.parse(body) : body;
                route.handler(req, res);
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    code: 1,
                    message: 'End point not found'
                }));
            }
        }
        catch (err) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                code: 1,
                message: 'End point not found'
            }));
        }
    });
}).listen(CONFIG.WEB_SERVER.PORT, CONFIG.WEB_SERVER.HOST, function () {
    let address = server.address();
    console.log(`Server running at http://${address.address}:${address.port}`);
});