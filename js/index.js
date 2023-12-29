var details = [];

var storedUsers = localStorage.getItem("details");

if (storedUsers != null) {
  details = JSON.parse(storedUsers);
}

function addUserDetails() {
  var userName = document.querySelector("#Name");
  var userEmail = document.querySelector("#NewEmail");
  var userPassword = document.querySelector("#Newpassword");

  var userDetails = {
    Name: userName.value,
    Email: userEmail.value,
    password: userPassword.value,
  };

  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userPassword.value == ""
  ) {
    document.querySelector(
      "#notify"
    ).innerHTML = ` <p> All inputs are required </p> `;
    document.querySelector("#notify").setAttribute("class", "error");
  } else {
    checkEmailExist(userEmail.value, userDetails);
  }
  console.log(details);
}

function signupform() {
  document.querySelector(".logincard").innerHTML = `
    <h1>Smart Login System</h1>
            <input id="Name" placeholder="Enter your Name" class="w-100 bg-transparent rounded-1 p-2 input" type="text">
            <input id="NewEmail" placeholder="Enter your email" class="w-100 bg-transparent rounded-1 p-2 my-3 input" type="text">
            <input id="Newpassword" placeholder="Enter your password" class="w-100 bg-transparent rounded-1 p-2 input " type="password">
            <div id="notify"><p class=""></p></div>                    
            <button id="signupbtn" class="w-100 bg-transparent my-4 p-1 rounded-1 ">Sign Up</button>
    <p class="text-white">you have an account? <span id="signin" class="signup">Sign In</span></p>
`;

  document.querySelector("#signin").addEventListener("click", signinform);
  document.querySelector("#signupbtn").addEventListener("click", addUserDetails);
}

function signinform() {
  document.querySelector(".logincard").innerHTML = `
    <h1>Smart Login System</h1>
                <input id="Email" placeholder="Enter your email" class="w-100 bg-transparent rounded-1 p-2 my-3 input" type="text">
                <input id="password" placeholder="Enter your password" class="w-100 bg-transparent rounded-1 p-2 input " type="password">
                <div id="notify"></div>
                <button id="loginbtn" class="w-100 bg-transparent my-4 p-1 rounded-1 ">Login</button>
            <p class="text-white">Don't have an account? <span id="signup" class="signup">Sign Up</span></p>
        `;
  document.querySelector("#signup").addEventListener("click", signupform);

  document.querySelector("#loginbtn").addEventListener("click", userLogin);
}

function checkEmailExist(userEmailInput, userinputs) {
  var isUserExists = false;
  for (var i = 0; i < details.length; i++) {
    if (details[i].Email === userEmailInput) {
      isUserExists = true;
    }
  }

  if (isUserExists == false) {
    details.push(userinputs);
    localStorage.setItem("details", JSON.stringify(details));

    document.querySelector("#notify").innerHTML = ` <p> Success </p> `;
    document.querySelector("#notify").setAttribute("class", "success");
  } else {
    document.querySelector(
      "#notify"
    ).innerHTML = ` <p> This Email already exists </p> `;
    document.querySelector("#notify").setAttribute("class", "error");
  }
}

function userLogin() {
  var currentUserEmail = document.querySelector("#Email");
  var currentUserPassword = document.querySelector("#password");

  var loginEmail = currentUserEmail.value;
  var loginPassword = currentUserPassword.value;

  var isUserExists = false;
  if (currentUserEmail.value == "" || currentUserPassword.value == "") {
    document.querySelector(
      "#notify"
    ).innerHTML = ` <p class="error"> All inputs are required </p> `;
  } else {
    var index = 0;

    for (let i = 0; i < details.length; i++) {
      if (
        details[i].Email.toLowerCase() === loginEmail.toLowerCase() &&
        details[i].password === loginPassword
      ) {
        isUserExists = true;
        index = i;
      }
    }

    if (isUserExists == true) {
      document.querySelector(
        "#nameOfUser"
      ).innerHTML = `<h1>Welcome ${details[index].Name} </h1>`;
      document
        .querySelector(".logincard")
        .classList.replace("d-inline-block", "d-none");
      document
        .querySelector("#home")
        .classList.replace("d-none", "d-inline-block");
      document.querySelector("#navbar").classList.replace("d-none", "d-flex");
      clearForm(currentUserEmail, currentUserPassword);
    } else {
      document.querySelector(
        "#notify"
      ).innerHTML = `<p class="error"> incorrect email or password </p>`;
    }
  }
}

document.querySelector("#logoutBtn").addEventListener("click", function () {
  document.querySelector("#home").classList.replace("d-inline-block", "d-none");
  document.querySelector("#navbar").classList.replace("d-flex", "d-none");
  document
    .querySelector(".logincard")
    .classList.replace("d-none", "d-inline-block");
});

function clearForm(formLogin, formPassword) {
  formLogin.value = "";
  formPassword.value = "";
}

signinform();
