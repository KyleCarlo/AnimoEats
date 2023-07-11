const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", { useNewUrlParser: true})

  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    helpfulCount: Number,
    reviewCount: Number, 
    photoCount: Number, 
    monthMade: Number,
    dateMade: Number,
    yearMade: Number,
    biography: String
    // profilepic: Buffer 
});

const reviewSchema = new mongoose.Schema({
  rating: Number,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports ={
  User,
  Review
};


// mongoose.connection.close()
//   .then(() => {
//     console.log('Disconnected from MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error disconnecting from MongoDB', error);
//   })