var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic("." + "/dist"));
var port = process.env.PORT || 80;
app.listen(port);
console.log('server started '+ port);
