var express = require('express');
var router = express.Router();
var gm=require('gm')

const request = require('request');
const url = require('url');
var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');

proxy = httpProxy.createProxy({});
proxy.on('error', function (err) {
    console.log('ERROR');
    console.log(err);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/map',function (req, res, next) {
    let curl = url.parse(req.query.url);
    if(!curl){
      return;
    }

    try {
        req.pipe(request({
            method: 'GET',
            url: curl,
            encoding: null
        },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                gm(body)
                .size (function (err,buffer) {
                    console.log(err);
                    console.log(buffer);
                })
                .toBuffer(function (err,buffer) {
                    // console.log(err);
                    // console.log(buffer);
                })
                res.send(body);
                
                
            }
        }));
 
    } catch (e) {
        next(e);
    }
})


router.get("/google",function(req, res, next){

    // var finalUrl = 'https://www.google.com';
    var finalUrl = 'https://www.baidu.com';
    var finalAgent = null;
    var parsedUrl = url.parse(finalUrl);

    if (parsedUrl.protocol === 'https:') {
        finalAgent = https.globalAgent;
    } else {
        finalAgent = http.globalAgent;
    }

    proxy.web(req, res, {
        target: finalUrl,
        agent: finalAgent,
        headers: { host: parsedUrl.hostname },
        prependPath: false,
        xfwd : true,
        hostRewrite: finalUrl.host,
        protocolRewrite: parsedUrl.protocol
    });
})


module.exports = router;