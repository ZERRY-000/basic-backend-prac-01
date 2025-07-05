import mongoose from 'mongoose';

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Wait for database to connect, logging an error if there is a problem
async function connectDB() {
  try{
    await mongoose.connect(process.env.mongoDB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
  
}

export default connectDB;
