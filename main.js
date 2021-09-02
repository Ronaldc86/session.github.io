
  
let $data = localStorage.getItem("__users") // load all users
var id = 0

if (!$data) $data = []
else {
  $data = JSON.parse($data)
  $data.forEach(function (rowData) {
    if (!rowData) return
    // setup auto increment for id
    id+=1
    let li = document.createElement('li');
  })
}

// function for reading error size
Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// register function
function register () {
  id++;
  // get data from input
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password2 = document.getElementById('password-confirm').value;

  // clear error messages.
  document.getElementById('error-username').innerHTML = ""
  document.getElementById('error-email').innerHTML = ""
  document.getElementById('error-password').innerHTML = ""
  document.getElementById('error-password-confirm').innerHTML = ""

  // validate user input
  var errors = {}
  if (username.length < 1) {
    errors.username =  `
        <div class="error-text1">Username is required.</div>
        `
  }
  if (email.length < 1) {
    errors.email =  `
        <div class="error-text1">Email is required.</div>
        `
  }
  if (password.length < 1) {
    errors.password =  `
        <div class="error-text1">Password is required.</div>
        `
  }
  if (password != password2) {
    errors.password =  `
        <div class="error-text1">Password should match.</div>
        `
  }

  // check if username or email exists in data
  $data.forEach(function (rowData) {
    if (rowData.username == username) {
      errors.username =  `
          <div class="error-text1">Username already exist.</div>
          `
    }
    if (rowData.email == email) {
      errors.username =  `
          <div class="error-text1">Email already exist.</div>
          `
    }
  })

  // check if there are any errors.
  if (Object.size(errors)) {
    Object.entries(errors).forEach(entry => {
      const [key, value] = entry;
      document.getElementById('error-' + key).innerHTML = value
    });
    return;
  }

  // put data into local storage
  $data.push({
    id,
    username,
    email,
    password
  })
  localStorage.setItem("__users", JSON.stringify($data))

  // clear user input
  document.getElementById('username').value = ""
  document.getElementById('email').value = ""
  document.getElementById('password').value = ""
  document.getElementById('password-confirm').value = ""
  // prompt successful user registration
document.getElementById('username').value;
  document.getElementById('current-user').innerHTML = `
  <div class="animate__animated animate__bounceIn">
  <div class= "gretting">${username} You are in!</div></div>
  `
  document.getElementById('checklist').innerHTML = `
 
   <div class="animate__animated animate__bounceIn"><img src="images/checklist.png" alt="" class="checklist-img"/></div>
  `
  document.getElementById('btn-signin').innerHTML = `
 
   <a href="login.html"> <div class="animate__animated animate__bounceIn">
    <input type="button"value="Sign in" class="btn-signin2">
   </div></a>

   
  `
}

function login () {
  // get user input.
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // validate user input
  var errors = {}
  if (username.length < 1) {
    errors.username = 
    `
    <div class="error-text">Username is required.</div>
    `
    
  }
  if (password.length < 1) {
    errors.password =  `
     
        <div class="error-text">Password is required.</div>
        `
  }
  // initialize matching
  var match = 0
  var matchIdx = 0

  // find match for username and password.
  $data.forEach(function (rowData, idx) {
    if (rowData.username == username && rowData.password == password) {
      match++;
      matchIdx = idx
    }
  })

  // if no match set prompt error invalid username or password.
  if (match < 1) {
    errors.password =  `
        <div class="error-text">Username/Password is invalid.</div>
        `
  }

  // check if there are any errors and prompt to user.
  if (Object.size(errors)) {
    document.getElementById('result').innerHTML = 
    `<div class="error-username">${errors.username?errors.username:''}</div><div class="error-password">${errors.password?errors.password:''}</div>`
    return;
  }

  // set current user in local storage.
  localStorage.setItem("__currentUser", JSON.stringify($data[matchIdx]))
  window.location = './home.html'
}

// setup click events for register and sign in button.
if (document.getElementById('id03')) document.getElementById('id03').addEventListener('click', register)
if (document.getElementById('id02')) document.getElementById('id02').addEventListener('click', login)