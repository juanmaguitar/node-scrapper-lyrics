var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var getJSON = require('get-json');
var jsesc = require('jsesc');
var path = require('path');
var cors = require('cors')

var app = express();

var apiKey = process.env.LYRICS_API_KEY;
var publicFolder = path.join(__dirname, 'public');

app.get('/lyric', cors(), function( req, res ) {

	var artist = req.query.artist
	var track = req.query.track;

	var url = "http://api.lyricsnmusic.com/songs?api_key=<%API_KEY%>&track=<%TRACK%>&artist=<%ARTIST%>"

	url = url.replace('<%API_KEY%>', apiKey );
	url = url.replace('<%TRACK%>', track );
	url = url.replace('<%ARTIST%>', artist );

	getJSON(url, function(error, response){

		var firstTrack = response.find( function( song ){
			titleFromJson = jsesc(song.title).toLowerCase();
			titleFromRequest = jsesc(decodeURIComponent(track)).toLowerCase()
			return titleFromJson === titleFromRequest;
		})

		if (firstTrack) {

			var urlLyric = firstTrack.url;

			request(urlLyric, function(error, response, html){

				if( !error ) {

					var $ = cheerio.load(html);
					var json = {
						status: "ok",
						url: urlLyric,
						artist : decodeURIComponent(artist),
						track : decodeURIComponent(track),
						lyrics : ""
					};

					$('#main pre').filter(function() {
						var $data = $(this);
						lyrics = $data.text();
						console.log(lyrics);
						json.lyrics = lyrics;
					});

					res.json(json);

				}

			})

		}
		else {
			res.json({ "status": "ko", "msg" : "No song found" });
		}

	})

})

app.use( express.static(publicFolder) );

app.listen(process.env.PORT || '8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;