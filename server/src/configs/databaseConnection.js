import mongoose from 'mongoose'; 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "todo-v2-backend",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

export default connectDB;