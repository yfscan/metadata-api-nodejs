const express = require('express')
const path = require('path')
const { HOST } = require('./src/constants')
const fs = require('fs');
let db = JSON.parse(fs.readFileSync('./src/database.json'));

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Get ready for yfScan Gem$!');
})

app.get('/api/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const attributes = db[tokenId]
  const data = {
    'name': 'Gem$ ' + tokenId,
    'image': `${HOST}/images` + attributes["img"],
    'background_color': '191919',
    'attributes': [
      {
        'trait_type': 'amount',
        'value': attributes['amount'],
        'display_type': 'number'
      },
      {
        'trait_type': 'minter',
        'value': attributes['minter']
      }
    ]
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})

