const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://kerlinaugustin:sneakyboi7@cluster0.eanp1.mongodb.net/?retryWrites=true&w=majority"

// const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

// app.listen runs a local host for us. app is coming from the variable above. Theres an empty function that makes the local host run automatically when called upon. MongoClient is variable that we declared above and it holds our data base as an object. We pass in the function connect to connect our unique url. useNewUrlParser gives us a new url to dynamically update our url. Then useUnifiedTopology deploys the url to the server. Then error runs the erroc code block. While client runs the code block if everything goes correct with no errors.  


app.listen(3001, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
  });
});


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  console.log('reaching post')
  db.collection('messages').insertOne({shoe: req.body.shoe, crossout: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/shoe', (req, res) => {
  db.collection('messages').findOneAndDelete({shoe: req.body.shoe}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.put('/crossout', (req, res) => {
  console.log(req.body)
  db.collection('messages')
  .findOneAndUpdate({shoe: req.body.shoe}, {
    $set: {
      crossout: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})