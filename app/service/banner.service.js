const config = require('../../config/config'),
mongoose     = require('mongoose'),
banner_mongo = mongoose.model('banner');

module.exports = {
	// 获取所有公司信息
	Get(callback) {
		banner_mongo.find({type: 'seajetlines'})
		.sort({order: 1, createTime: -1})
		.exec((err, banner) => {
			console.log(banner)
			callback(banner)
		})
	}
}
