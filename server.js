const app        = require('./app');
const { server } = require('./config');

app.listen(server.port, () => {
  console.log(`Server is running on ${server.port}`);
});