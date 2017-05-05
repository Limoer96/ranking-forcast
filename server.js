var express = require('express');
var fs = require('fs');
const app = express();

var allowCrossDomain = function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

var data = fs.readFileSync('points.dat');
var points = JSON.parse(data);

app.get('/post', (req, res) => {
    res.status(200).jsonp(points);
    res.end();
})

app.listen(8889, () => {console.log('server at localhost:8889')});
