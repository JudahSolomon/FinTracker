const forgottenPassword = document.querySelector(".forgot-pass").value;
const loginButton = document.querySelector(".login-button");
const signUp = document.querySelector(".form-link span").value;
const facebookLogin = document.querySelector(".field facebook");
const googleLogin = document.querySelector(".field google");


//  form registration
























// storing the values in the local storage

loginButton.addEventListener("click", (event) => {
  const email = document.querySelector(".input").value;
  const password = document.querySelector(".password").value;
  // storing email and password in localStorage
  const EmailtoLs = localStorage.setItem("Email", JSON.stringify(email));
  const PasswordtoLs = localStorage.setItem(
    "Password",
    JSON.stringify(password)
  );

  // getting the email and password from localStorage
  const userEmail = localStorage.getItem("userEmail", EmailtoLs);
  const userPassword = localStorage.getItem("userPassword", PasswordtoLs);

  // writing an if statement to chec

  if (email == "" && password == "") {
    // Swal.fire(
    //     'Opps..!',
    //     'input field has no value!',
    //     'error'
    // );
    return alert("Please enter and password");
  } else {
    if (email == EmailtoLs && password == PasswordtoLs) {
      // Swal.fire(
      //     'Good job!',
      //     'login successful!',
      //     'success'
      // );
      return alert("login successful!");
      setTimeout(() => {
        location.href = "./index.html";
      }, 1000);
    } else {
      // Swal.fire("Opps..!", "Something is wrong!", "error");
      return alert("Something is wrong!");
    }
  }
});

/*Steps
1. get reference to the the html elements, as well as the value of the firlds
2. set the value to the local storage
3. get the value from the local storage again 
4. compare the entered value to the value stored in the local storage
5. apply some conditions to the value entered in the local storage


 */
