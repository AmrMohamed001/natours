const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
process.on('uncaughtException', (err) => {
  console.log(`UNHANDLED EXPECTION 💣💣 ${err.message}`);
  console.log(err.name, err.stack);
  process.exit(1);
});
const app = require('./app');

//////////////////////////////////////////
//mongoose connection
let now = new Date().getSeconds();
mongoose.connect(process.env.DATABASE).then(() => {
  //console.log(conn.connection)
  console.log(
    `connected successfully in ${Math.abs(
      new Date().getSeconds() - now
    )} seconds`
  );
});
//////////////////////////////////////////
// server-Listening
const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port : ${process.env.PORT} ...`);
});
//////////////////////////////////////////
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`unhandled promise rejection 💣💣`);
  server.close(() => {
    process.exit(1);
  });
});
