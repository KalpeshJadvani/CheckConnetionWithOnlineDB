const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

const server = http.createServer(app);
const port = 8585;
const dbpass = "stolen_report123";
const dbusername = "stolen_report";

// include routes
const routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const url = `mongodb+srv://${dbusername}:${dbpass}@cluster0.bn45c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams);

// this for local 
// mongoose.connect('mongodb://localhost:27017/stolen_report_db', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info('DB connected!');
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found ----');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});



server.listen(port, () => {
  console.log(`Server is runing on port http://localhost:${port}`);
});




// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
// const client = new MongoClient('mongodb://localhost:27017/stolen_report_db');
// async function run() {
//     try {
//       await client.connect();
//       const database = client.db('stolen_report_db');
//       const movies = database.collection('policeofficers');
//       // Query for a movie that has the title 'Back to the Future'
//       const query = { name: "Hannah Michael" };
//       const movie = await movies.findOne(query);
//       console.log("data ", movie);
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }

//   run().catch(console.dir);


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://stolen_report:<password>@cluster0.bn45c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
