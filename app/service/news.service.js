const config = require('../../config/config'),
mongoose     = require('mongoose'),
async        = require('async'),
moment       = require('moment'),
news_mongo   = mongoose.model('news');

module.exports = {
	// 获取所有新闻
	getNews(lang, callback) {
		news_mongo.find({is_show: true, type: 'seajetlines'})
		.sort({top: -1, createTime: -1})
		.exec((err, news) => {
			async.each(news, (item, cb) => {
				item.lang = item.article.find(n => n.language==lang);
				cb();
			}, err => {
				callback(news)	
			})
			
		})
	},
	getNewsIndex(lang, callback) {
		news_mongo.find({is_show: true, type: 'seajetlines'})
		.sort({top: -1, createTime: -1})
		.limit(6)
		.exec((err, news) => {
			async.each(news, (item, cb) => {
				item.lang = item.article.find(n => n.language==lang);
				item.time = moment(item.createTime).format('YYYY年MM月DD日 HH:mm:ss');
				cb();
			}, err => {
				callback(news)	
			})
		})
	},
	SelectById(_id, lang, callback) {
		news_mongo.findOne({_id}).exec((err,news) => {
			if(news) {
				news.lang = news.article.find(n=>n.language == lang);
				news.time = moment(news.createTime).format('YYYY年MM月DD日 HH:mm:ss');
				callback(news)
			} else callback(news)
		})
	}
}
