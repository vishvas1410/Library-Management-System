import mongoose from "mongoose";


//creating mongodb database connection
export const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/LMS_Project");
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

//closing the mongodb connection
export const closeDBConnection = async () => {
 // await mongoose.connection.dropDatabase();
 try {
    
     await mongoose.connection.close();
 } catch (error) {
    console.error('Error closing database connection:', error);
    
 }
};

