const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const path = require('path')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '/public')))

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            aacessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expireIn: data.body.expires_in  
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(process.env.PORT || 3001)