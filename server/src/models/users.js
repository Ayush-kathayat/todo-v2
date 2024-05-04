//! Here we will have the schema and the model (collection ) of all the users


import mongoose from "mongoose";
import Task from "./tasks.js";


//schema

const userSchemaTodoV2 = new mongoose.Schema({
  // creation of schema
  name: String,
  username :{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Task,
    },
  ],
});

 const User = mongoose.model("Users", userSchemaTodoV2); // COLLECTION  // or models


 export default User; //exporting the model so we can use it in other files specifically in the controllers (userControllers.js)
