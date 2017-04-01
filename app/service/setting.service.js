const config  = require('../../config/config'),
mongoose      = require('mongoose'),
setting_mongo = mongoose.model('setting');

module.exports = {
	// 获取所有新闻
	getAll(callback) {
		setting_mongo.find({type: 'seajetlines'})
		.exec(callback)
	},
	getSettingBylang(lang, callback) {
		setting_mongo.find({type: 'seajetlines', lang})
		.exec(callback)	
	}
}
