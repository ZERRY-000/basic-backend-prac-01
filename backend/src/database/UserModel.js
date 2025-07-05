import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  username: {
    type: String,
    unique: true,     
    required: true,   
    trim: true        
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("UserModels", UserModelSchema);

export default UserModel;