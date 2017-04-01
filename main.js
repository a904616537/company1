var express  	 = require('express'),
	config       = require('./config/config'),
	glob         = require('glob'),
	express_core = require('./config/express_core'),
	port         = process.env.PORT || 3002,
	app          = express();



var http = require('http').Server(app);

// Mongodb 预加载
// models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function(model) {
//     console.log('Loading Mongodb model：' + model);
//     require(model);
// });

// Mongodb 预加载
const models = glob.sync(config.root + '/app/models/*.js')
models.forEach(model => {
    console.log('Loading Mongodb model：' + model);
    require(model);
})

express_core(app, config);

// 应用程序启动 config.mongo.db
require('./app/service/mongodb.client');

http.listen(port);

console.log('imooc started on port ' + port);
