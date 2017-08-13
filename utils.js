let path = require('path'),
    fs = require('fs');

function initApp(modules) {
    let app = {};

    modules.forEach(function (module) {
        let modulePath = path.join(process.cwd(), 'modules', module, 'server');

        // Routes
        let routesPath = path.join(modulePath, 'routes');
        getModules(routesPath, function (err, router) {
            if (err !== null) {
                throw err;
            }
            let prefixedRoutes = {};
            let routes = require(path.join(routesPath, router));
            for( let route in routes ){
                prefixedRoutes[ `/${module}${route}` ] = routes[route];
            }

            app.routes = Object.assign({}, app.routes, prefixedRoutes);
        });
    });

    return app;
}

function getModules(dirname, callback) {
    if (fs.existsSync(dirname)) {
        var filenames = fs.readdirSync(dirname);
        filenames.forEach(function (filename) {
            callback(null, filename);
        });
    } else {
        console.log('Module path "%s" does not exists', dirname);
    }
}

module.exports = {
    initApp
}