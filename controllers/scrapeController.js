const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	// A GET route for scraping
	// get list of front page free patterns for 4 sites:
	// http://www.knitpicks.com/patterns/Free_Knitting_Patterns__L300218.html
	// https://www.loveknitting.com/us/free-knitting-patterns
	// https://www.allfreeknitting.com/tag/easy-knitting-patterns
	// http://www.yarnspirations.com/patterns/free-knitting-patterns
	scrapeSites: function(req, res) {
		console.log('scraping');
		const siteList = [
			//'http://www.knitpicks.com/patterns/Free_Knitting_Patterns__L300218.html',
			//'https://www.loveknitting.com/us/free-knitting-patterns',
			//'https://www.allfreeknitting.com/tag/easy-knitting-patterns',
			'http://www.yarnspirations.com/patterns/free-knitting-patterns',
			'http://www.yarnspirations.com/patterns/free-knitting-patterns?p=2',
			'http://www.yarnspirations.com/patterns/free-knitting-patterns?p=3'
		];
		let results = [];
	  	const promises = siteList.map(url => {
	  		//console.log(`url`, url);
	  		return axios.get(url)
	  		.then(function(response) {
			    var $ = cheerio.load(response.data);
			    // for yarnspirations.com
			    $("li.item").each(function(i, element) {
					var result = {};
					result.title = $(this)
						.find("h2.product-name a")
						.text();
					result.externalLink = $(this)
						.find("h2.product-name a")
						.attr("href");
					const link = result.externalLink;
					result.image = $(this)
						.find(".image-container a img")
						.attr("src");
		            results.push(result);
			    });
			});
		});

  		return Promise.all(promises).then(function(data) {
		        // on success, send a data to the client
		        results.forEach(
	        		(item, index) => {}//console.log(index, item.title)
	        	);
		        res.json(results);
		}).catch(function(err) {
		        // On error, send error message to the client
		        // console.log(err);
		        res.json({length_of_results: results.length, err});
		});
	}
}
