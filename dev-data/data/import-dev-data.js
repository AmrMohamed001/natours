/*
this script file to import or delete json data to/from our DB
*/
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });
const mongoose = require('mongoose');
const fs = require('fs');
const Tours = require('../../models/tourModel');
const Users = require('../../models/usermodel');
const Reviews = require('../../models/reviewModel');
////////////////////////////////////////////////////////////
mongoose.connect(process.env.DATABASE).then(() => {
  //console.log(conn.connection);
  console.log(`connected successfully`);
});
///////////////////////////////////////////////////////////
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
///////////////////////////////////////////////////////////
const importData = async () => {
  try {
    await Tours.create(tours);
    await Users.create(users, { validateBeforeSave: false });
    await Reviews.create(reviews);
    console.log('imported successfully');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tours.deleteMany();
    await Users.deleteMany();
    await Reviews.deleteMany();
    console.log('deleted successfully');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
