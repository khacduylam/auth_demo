const { mongodb } = require('./');

module.exports = (mongoose) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(mongodb.mongoUrl, { useNewUrlParser: true })
    .then(connection => {
      if(connection) {
        console.log('Database connected');
      } else {
        console.log('Can not connect database');
      }
    })
    .catch(err => console.log(`Database connection failed: ${err}`));
}