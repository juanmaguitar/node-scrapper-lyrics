var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var getJSON = require('get-json');
var URI = require("uri-js");
var jsesc = require('jsesc');
var app = express();

var apiKey = process.env.LYRICS_API_KEY;

app.get('/lyric', function(req, res) {


	var artist = encodeURIComponent("bon jovi")
	var track = encodeURIComponent("livin' on a prayer")

	var url = "http://api.lyricsnmusic.com/songs?api_key=<%API_KEY%>&track=<%TRACK%>&artist=<%ARTIST%>"

	url = url.replace('<%API_KEY%>', apiKey );
	url = url.replace('<%TRACK%>', track );
	url = url.replace('<%ARTIST%>', artist );

	//url = URI.serialize( URI.parse(url) );

	console.log (url);

	getJSON(url, function(error, response){

		var firstTrack = response.find( function( song ){
			return jsesc(song.title).toLowerCase() === jsesc(decodeURIComponent(track)).toLowerCase();
		})


		console.log ( firstTrack ) ;

    // response.forEach(function( index, value ) {
				// console.log (index)
				// console.log (value)
    // })

})

	// request(url, function(error, response){

	// 	console.log ('response: ' + !!response);
	// 	console.log (response);

	// });

// The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.lyricsnmusic.com/bon-jovi-and-olivia-d-abo/livin-on-a-prayer-lyrics/6615619';

    //console.log (url);
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){


        // First we'll check to make sure no errors occurred when making the request

        if( !error ) {

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

						//console.log ( !!$ );
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

             // We'll use the unique header class as a starting point.

            $('#main pre').filter(function() {
							var $data = $(this);
							lyrics = $data.text();
							json.lyrics = lyrics;
							//console.log (lyrics);
						});

						// $('.ratingValue').filter(function() {
						// 	var data = $(this);

						// 	rating = data.children().first().children().first().text();
						// 	json.rating = rating;
						// });


					}
						fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

						    console.log('___File successfully written! - Check your project directory for the output.json file');

						})

						res.send('Check your console!');





    })

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;