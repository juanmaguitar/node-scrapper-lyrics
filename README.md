# Node Scrapper Lyrics

This project gets the full lyrics of a song using the data from lyricsnmusic.com and scraping the targeted url to get the full lyrics

It serve a unique keypoint `/lyric` that accepts 2 parameters:
- `artist`: artist of the song
- `track`: name of the song

It also serves an `index.html` at `/` showing the use of this API w/ jQuery AJAX

## Routes Examples

### Lyric

    /lyric?artist=bon%20jovi&track=bad%20medicine

## Production Examples

    https://rocky-hollows-34313.herokuapp.com/lyric?artist=the+beatles&track=love+me+do

    https://rocky-hollows-34313.herokuapp.com/lyric?artist=bon+jovi&track=livin%27+on+a+prayer
    

## Installation

To run local server...

    LYRICS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXX  npm run dev

To run remotely (in heroku) the proper BREWERYDB_API_KEY should be set before deploying...

    heroku config:set LYRICS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXX
