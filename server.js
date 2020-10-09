/*eslint-env node*/
'use strict';
(function () {
    var express = require('express');
    const config = require('./config');
    var compression = require('compression');
    var fs = require('fs');
    var url = require('url');
    var request = require('request');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var gzipHeader = Buffer.from('1F8B08', 'hex');

    var yargs = require('yargs').options({
        'port': {
            'default': 8081,
            'description': 'Port to listen on.'
        },
        'public': {
            'type': 'boolean',
            'description': 'Run a public server that listens on all interfaces.'
        },
        'upstream-proxy': {
            'description': 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
        },
        'bypass-upstream-proxy-hosts': {
            'description': 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
        },
        'help': {
            'alias': 'h',
            'type': 'boolean',
            'description': 'Show this help.'
        }
    });
    var argv = yargs.argv;

    if (argv.help) {
        return yargs.showHelp();
    }

    // eventually this mime type configuration will need to change
    // https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
    // *NOTE* Any changes you make here must be mirrored in web.config.
    var mime = express.static.mime;
    mime.define({
        'application/json': ['czml', 'json', 'geojson', 'topojson'],
        'application/wasm': ['wasm'],
        'image/crn': ['crn'],
        'image/ktx': ['ktx'],
        'model/gltf+json': ['gltf'],
        'model/gltf-binary': ['bgltf', 'glb'],
        'application/octet-stream': ['b3dm', 'pnts', 'i3dm', 'cmpt', 'geom', 'vctr'],
        'text/plain': ['glsl']
    }, true);

    var app = express();
    app.use(compression());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(cors());
    app.use(bodyParser.json()); //body-parser 解析json格式数据
    app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
        extended: false
    }));

    function checkGzipAndNext(req, res, next) {
        var reqUrl = url.parse(req.url, true);
        var filePath = reqUrl.pathname.substring(1);

        var readStream = fs.createReadStream(filePath, { start: 0, end: 2 });
        readStream.on('error', function (err) {
            next();
        });

        readStream.on('data', function (chunk) {
            if (chunk.equals(gzipHeader)) {
                res.header('Content-Encoding', 'gzip');
            }
            next();
        });
    }

    var knownTilesetFormats = [/\.b3dm/, /\.pnts/, /\.i3dm/, /\.cmpt/, /\.glb/, /\.geom/, /\.vctr/, /tileset.*\.json$/];
    app.get(knownTilesetFormats, checkGzipAndNext);

    app.use(express.static(__dirname));

    function getRemoteUrlFromParam(req) {
        var remoteUrl = req.params[0];
        if (remoteUrl) {
            // add http:// to the URL if no protocol is present
            if (!/^https?:\/\//.test(remoteUrl)) {
                remoteUrl = 'http://' + remoteUrl;
            }
            remoteUrl = url.parse(remoteUrl);
            // copy query string
            remoteUrl.search = url.parse(req.url).search;
        }
        return remoteUrl;
    }

    var dontProxyHeaderRegex = /^(?:Host|Proxy-Connection|Connection|Keep-Alive|Transfer-Encoding|TE|Trailer|Proxy-Authorization|Proxy-Authenticate|Upgrade)$/i;

    function filterHeaders(req, headers) {
        var result = {};
        // filter out headers that are listed in the regex above
        Object.keys(headers).forEach(function (name) {
            if (!dontProxyHeaderRegex.test(name)) {
                result[name] = headers[name];
            }
        });
        return result;
    }

    var upstreamProxy = argv['upstream-proxy'];
    var bypassUpstreamProxyHosts = {};
    if (argv['bypass-upstream-proxy-hosts']) {
        argv['bypass-upstream-proxy-hosts'].split(',').forEach(function (host) {
            bypassUpstreamProxyHosts[host.toLowerCase()] = true;
        });
    }


    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    var i = 1;


    //mysql
    app.post('/postData', function (req, res) {
        console.log("req.url :", req.url);
        console.log("第", i, "次传参");
        //   console.log("req:",req);
        i++;


        if (req.url == "/postData") {
            //  var avgfps = req.body.avgfps;
            var mysql_lat = req.body.tempLat;
            var mysql_lng = req.body.tempLng;
            var mysql_height = req.body.tempHeight;
            var mysql_heading = req.body.tempHeading;
            var mysql_pitch = req.body.tempPitch;
            var mysql_roll = req.body.tempRoll;
            var mysql_correction = req.body.correction;
            //   var flaps = req.body.flaps;
            //   var mysql_prop = req.body.mysql_prop;
            // var aux = req.body.auxvar;
            //  var aux2 = req.body.auxvar2;
            //  var aux3 = req.body.auxvar3;
            //  var aux4 = req.body.auxvar4;
            //  var aux5 = req.body.auxvar5;
            //  var aux6 = req.body.auxvar6;
            var now = new Date(new Date().getTime() + 28800000);
            console.log("now", now);
            // console.log("avgfps", avgfps);
            const Sequelize = require('sequelize');
            ///const config = require('./config');
            var sequelize = new Sequelize('mycesium', 'root', 'lz1349500382', {
                host: 'localhost',
                dialect: 'mysql',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 30000
                }
            });
            // 存入mysql
            var myMsg = sequelize.define('mymsg', {
                // id: {
                //     type: Sequelize.STRING(50),
                //     primaryKey: true
                // },
                //  fps: Sequelize.DOUBLE,

                lng: Sequelize.DOUBLE,
                lat: Sequelize.DOUBLE,
                height: Sequelize.DOUBLE,
                heading: Sequelize.DOUBLE,
                pitch: Sequelize.DOUBLE,
                roll: Sequelize.DOUBLE,
                correction: Sequelize.DOUBLE,
                //  flaps: Sequelize.DOUBLE,
                //  aux: Sequelize.DOUBLE,
                //  aux2: Sequelize.DOUBLE,
                //  aux3: Sequelize.DOUBLE,
                //  aux4: Sequelize.DOUBLE,
                //  aux5: Sequelize.DOUBLE,
                //  aux6: Sequelize.DOUBLE,
                inTime: Sequelize.DATE
            }, {
                freezeTableName: true,
                timestamps: false
            });
            console.log('mysql init');
            myMsg.create({
                //  fps: avgfps,
                lng: mysql_lng,
                lat: mysql_lat,
                height: mysql_height,
                heading: mysql_heading,
                pitch: mysql_pitch,
                roll: mysql_roll,
                correction: mysql_correction,
                //   flaps: flaps,
                //    aux: aux,
                //    aux2: aux2,
                //    aux3: aux3,
                //    aux4: aux4,
                //     aux5: aux5,
                //aux6: aux6,
                inTime: now
            }).then(function (p) {
                console.log('created.' + JSON.stringify(p));
                console.log('new now:', new Date(new Date().getTime() + 28800000));
                console.log('new now:', new Date(new Date().getTime() + 28800000) - now);
            }).catch(function (err) {
                console.log('failed: ' + err);
            });
        }
    });
    var mysql = require('mysql');
    //依靠这个变量动态查询数据库
    var id = 0;
    app.get('/readDate', function (req, res) {
        var connection = mysql.createConnection({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database
        });
        connection.connect();
        //  connection.query('select GPS_LAT_CA,GPS_LONG_CA,ALT_STD,ROLL_RATE1 from fly order by Time desc ', function (err, data) {
        connection.query('select id, Time,WIN_SPD,VMAN,ALTBARFN,TAT,GPS_LAT_CA, GPS_LONG_CA, ALT_STD,FF1,EGT1C,N21,N22,N11,N12  from sheet1 where id>' + id + ' order by id asc LIMIT 0,1000 ', function (err, data) {
            //connection.query('select id,translateX,translateY,translateZ,rotateX,rotateY,rotateZ from fly_wan where id>' + id + ' order by id asc LIMIT 0,1000 ', function (err, data) {
            //经度、纬度、高度、roll
            if (err) throw err;
            //   msg = data[0].GPS_LAT_CA;
            //  console.log("data:" +JSON.stringify(data));
            //  console.log("data.length:" + data.length);
            res.send(data);
            var now = new Date(new Date().getTime());
            console.log("now:" + now);
            console.log("data.length:" + data.length);
            console.log("id:" + id);

            if (data.length != 0)
                id = data[data.length - 1].id;
            //在此处又回到数据库开头
            else id = 0;
            // console.log("data[1000].id:" + JSON.stringify(data[999]));
        });
        connection.end();
    });
    app.get('/proxy/*', function (req, res, next) {
        // look for request like http://localhost:8080/proxy/http://example.com/file?query=1
        var remoteUrl = getRemoteUrlFromParam(req);
        if (!remoteUrl) {
            // look for request like http://localhost:8080/proxy/?http%3A%2F%2Fexample.com%2Ffile%3Fquery%3D1
            remoteUrl = Object.keys(req.query)[0];
            if (remoteUrl) {
                remoteUrl = url.parse(remoteUrl);
            }
        }

        if (!remoteUrl) {
            return res.status(400).send('No url specified.');
        }

        if (!remoteUrl.protocol) {
            remoteUrl.protocol = 'http:';
        }

        var proxy;
        if (upstreamProxy && !(remoteUrl.host in bypassUpstreamProxyHosts)) {
            proxy = upstreamProxy;
        }

        // encoding : null means "body" passed to the callback will be raw bytes

        request.get({
            url: url.format(remoteUrl),
            headers: filterHeaders(req, req.headers),
            encoding: null,
            proxy: proxy
        }, function (error, response, body) {
            var code = 500;

            if (response) {
                code = response.statusCode;
                res.header(filterHeaders(req, response.headers));
            }

            res.status(code).send(body);
        });
    });

    var server = app.listen(argv.port, argv.public ? undefined : 'localhost', function () {
        if (argv.public) {
            console.log('Cesium development server running publicly.  Connect to http://localhost:%d/', server.address().port);
        } else {
            console.log('Cesium development server running locally.  Connect to http://localhost:%d/', server.address().port);
        }
    });

    server.on('error', function (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Error: Port %d is already in use, select a different port.', argv.port);
            console.log('Example: node server.js --port %d', argv.port + 1);
        } else if (e.code === 'EACCES') {
            console.log('Error: This process does not have permission to listen on port %d.', argv.port);
            if (argv.port < 1024) {
                console.log('Try a port number higher than 1024.');
            }
        }
        console.log(e);
        process.exit(1);
    });

    server.on('close', function () {
        console.log('Cesium development server stopped.');
    });

    var isFirstSig = true;
    process.on('SIGINT', function () {
        if (isFirstSig) {
            console.log('Cesium development server shutting down.');
            server.close(function () {
                process.exit(0);
            });
            isFirstSig = false;
        } else {
            console.log('Cesium development server force kill.');
            process.exit(1);
        }
    });



})();