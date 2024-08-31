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
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};


beforeAll(async () => {
  await connectToDb();
});

afterAll(async () => {
  await closeDBConnection();
});
