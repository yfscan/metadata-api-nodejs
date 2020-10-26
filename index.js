const express = require('express')
const path = require('path')
// const { HOST } = require('./src/constants')
const fs = require('fs');
let db = JSON.parse(fs.readFileSync('./src/database.json'));
let mons_db = JSON.parse(fs.readFileSync('./src/mons_database.json'));
let monsMetadata = JSON.parse(fs.readFileSync('./monster_metadata.json'));

const PORT = process.env.PORT || 5000;

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send('Get ready for yfScan Gem$!');
});

app.get('/mon-data', function(req, res) {
  res.send(monsMetadata);
})

app.get('/api/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const attributes = db[tokenId]
  const data = {
    'name': 'Gem$ ' + tokenId,
    'image': `https://yfscan.herokuapp.com/gems` + attributes["img"],
    'background_color': '000000',
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
});

app.get('/api/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const attributes = db[tokenId]
  const data = {
    'name': 'βetagem ' + tokenId,
    'image': `https://yfscan.herokuapp.com/gems` + attributes["img"],
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
});
app.get('/mons/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const d = mons_db[tokenId]
  const data = {
    'name': d["name"],
    'image': `https://yfscan.herokuapp.com/` + d["img"],
    'background_color': '000000',
    'attributes': [
      {
        'trait_type': 'ID',
        'value': tokenId
      },
      {
        'trait_type': 'minter',
        'value': d['minter']
      },
      {
        'trait_type': 'unlockBlock',
        'value': d['unlockBlock'],
        'display_type': 'number'
      },
      {
        'trait_type': 'parent 1',
        'value': d['parent1'],
        'display_type': 'number'
      },
      {
        'trait_type': 'parent 2',
        'value': d['parent2'],
        'display_type': 'number'
      },
      {
        'trait_type': 'gen',
        'value': d['gen'],
        'display_type': 'number'
      },
      {
        'trait_type': 'amount',
        'value': d['amount'],
        'display_type': 'number'
      },
      {
        'trait_type': 'duration',
        'value': d['duration'],
        'display_type': 'number'
      },
      {
        'trait_type': 'powerBits',
        'value': d['powerBits'],
        'display_type': 'number'
      },
      {
        'trait_type': 'amount',
        'value': d['amount'],
        'display_type': 'number'
      }
    ]
  }
  res.send(data)
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
