const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://tomekszy:Monitor.123@cluster0-jda6b.gcp.mongodb.net/test?retryWrites=true'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db('shop');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
