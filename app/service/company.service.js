const config  = require('../../config/config'),
mongoose      = require('mongoose'),
company_mongo = mongoose.model('company');

module.exports = {
	// 获取所有公司信息
	getCompany(callback) {
		company_mongo.getAll('seajetlines', callback)
	},
	getCompanyForNav(type, callback) {
		company_mongo.find({pid: {$in : null}, type})
		.sort('-createTime')
		.exec((err, company) => {
			console.log(company)
			callback(company)
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			company_mongo.findOne({_id})
			.exec((err,docs) => {
				if (err) return reject(err);
				console.log(docs)
				resolve(docs);
			})
        })
	}
}
