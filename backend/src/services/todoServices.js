import TodoModel from "../database/TodoModel.js";

async function createTodo(request, response) {
  const {user_id, topic, content} = request.body;
  const date = new Date();
  try {
    const todo_instance = await TodoModel.create({
      user_id,
      topic,
      content,
      created_at: date,
    });
    response.status(201).json({message: 'create completed', todo_instance});
  } catch (error) {
    console.log(error.message);
  }
  
}

async function callTodoList(request, response) {
  const {id} = request.params;

  const todos = await TodoModel.find({user_id: id});
  return response.status(200).json(todos);
}

async function deleteTodo(request, response) {
  const {id} = request.params;
  
  const deleteTodo = await TodoModel.deleteOne({_id: id});
  return response.status(200).json({message: "deleted", id});
}
async function doneTodo(request, response) {
  const {id} = request.params;

  const doneTodo = await TodoModel.findOne({_id: id}).updateOne({completed: true});
  return response.status(200).json({message: "changed", doneTodo});
}

export { createTodo, callTodoList, deleteTodo, doneTodo };
