const app = document.getElementById('app');
const homepage = document.getElementById('homepage');

app.innerHTML = `
    <h1 id="header_auth">Login</h1>
    <div><input id="username_input" type="text" placeholder="username"></div>
    <div><input id="password_input" type="password" placeholder="password"></div>
    <div>
      <button id="register_btn">sign up</button>
      <button id="login_btn">sign in</button>
    </div>
    <div>
      or <button id="switch_auth">sign up</button>
    </div>
`

const switch_auth_button = document.getElementById('switch_auth');
const header_auth = document.getElementById('header_auth');
const register_btn = document.getElementById('register_btn');
const login_btn = document.getElementById('login_btn');
const username_input = document.getElementById('username_input');
const password_input = document.getElementById('password_input');
let switch_auth_login = true;

// homepage element
const topic_input = document.getElementById('topic_input');
const content_input = document.getElementById('content_input');
const add_todo = document.getElementById('add_todo')
const todo_list = document.getElementById('todo_list');

register_btn.style.display = 'none';
homepage.style.display = 'none';

const switch_auth = () => {
  switch_auth_login = !switch_auth_login;
  if(switch_auth_login) {
    register_btn.style.display = 'none';
    login_btn.style.display = '';
    header_auth.innerText = 'Login';
    switch_auth_button.innerText = 'sign up';
  }
  else {
    register_btn.style.display = '';
    login_btn.style.display = 'none';
    header_auth.innerText = 'Register';
    switch_auth_button.innerText = 'sign in';
  }
}

console.log(username_input.value);
console.log(password_input.value);

async function register_func() {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: username_input.value,
        password: password_input.value
      })
    });

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log(error);
  }

}

let user_id;

async function login_func() {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: username_input.value,
        password: password_input.value
      })
    });

    const data = await response.json();
    if(data.message === 'ok') {
      user_id = data.user_id;
      homepage_display();
    }
    else {
      user_id = null;
      alert(data.message);
    }
    console.log('data (print from index.js):',data);

  } catch (error) {
    console.log(error.message);
  }

}

async function todos_fetch() {
  try {
    const response = await fetch(`/todos/user/${user_id}`);

    const data = await response.json();
    // console.log("data (from todos_fetch index.js):",data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function create_todo() {
  try {
    const response = await fetch('/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        topic: topic_input.value,
        content: content_input.value,
      })
    })
    const data = await response.json();
    createItem(data.todo_instance.topic,data.todo_instance.content,data.todo_instance._id, data.todo_instance.completed);
  } catch (error) {
    console.log(error.message);
  }
}
async function deleteItem(todoId) {
  try {
    const response = await fetch(`/todos/delete/${todoId}`, {
      method: 'DELETE'
    }) 
    const data = await response.json();
    const deleteElement = document.getElementById(`${data.id}`);
    deleteElement.remove();
  } catch (error) {
    console.log(error.message);
  }
}

async function doneItem(todoId) {
  const item = document.getElementById(`${todoId}`);
  if(item.classList.contains('completed')) return;
  try {
    const response = await fetch(`/todos/done/${todoId}`, {
      method: 'PUT'
    }) 
    const data = await response.json();
    const doneElement = document.getElementById(`${todoId}`);
    doneElement.classList.add("completed");
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function createItem(topic, content, todoId, completed) {
  console.log(todoId);
  const todo = document.createElement("div");
  todo.setAttribute('id', todoId);
  todo.classList.add("todo-item");
  if(completed) todo.classList.add("completed");
  todo.innerHTML = `
  <h3>${topic}</h3>
  <div>${content}</div>
  <button onclick="deleteItem('${todoId}')">delete</button>
  <button onclick="doneItem('${todoId}')">done</button>
  `
  todo_list.appendChild(todo);
}


async function homepage_display() {
  app.style.display = 'none';
  homepage.style.display = '';
  const todos = await todos_fetch();

  // console.log("todos: ", todos);
  for(let i = 0; i < todos.length; ++i){
    createItem(todos[i].topic, todos[i].content, todos[i]._id, todos[i].completed);
  }
}

switch_auth_button.addEventListener('click', switch_auth);
register_btn.addEventListener('click', register_func);
login_btn.addEventListener('click', login_func);
add_todo.addEventListener('click', create_todo);
