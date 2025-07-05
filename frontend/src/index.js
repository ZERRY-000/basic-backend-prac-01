const app = document.getElementById('app');

app.innerHTML = `
    <h1 id="header_auth">Login</h1>
    <div><input id="username_input" type="text" placeholder="username"></div>
    <div><input id="password_input" type="text" placeholder="password"></div>
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

register_btn.style.display = 'none';

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
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: username_input.value,
        password: password_input.value
      })
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const data = await response.json();
    console.log('Success:', data);

  } catch (error) {
    console.log(error);
  }

}

switch_auth_button.addEventListener('click', switch_auth);
register_btn.addEventListener('click', register_func);
