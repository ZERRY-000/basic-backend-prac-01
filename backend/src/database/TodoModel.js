import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoModelSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  topic: {
    type: String,    
    required: true,   
    trim: true        
  },
  content: {
    type: String,
    trim: true,
    default: ''
  },
  created_at: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false
  }

});

const TodoModel = mongoose.model("TodoModels", TodoModelSchema);

export default TodoModel;