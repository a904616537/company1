var path     = require ('path'),
	rootPath = path.normalize(__dirname + '/..')

var config = {
	root         : rootPath,
	languagePath : rootPath + '/app/language/',
	mongo        : 'mongodb://127.0.0.1/company',
	cookie       : {
        secret     : 'company',
        sessionName: 'session'
    }
}

module.exports = config
