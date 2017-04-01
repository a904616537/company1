const config = require('../../config/config'),
mongoose     = require('mongoose'),
async        = require('async'),
moment       = require('moment'),
news_mongo   = mongoose.model('news');

module.exports = {
	// 获取所有新闻
	getNews(lang, callback) {
		news_mongo.find({type: 'seajetlines'})
		.sort('-createTime')
		.exec((err, news) => {
			console.log(news)
			async.each(news, (item, cb) => {
				item.lang = item.article.find(n => n.language==lang);
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
