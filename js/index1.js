document.querySelector("#login-submit").addEventListener('click', function(event){
  // debugger
  const usernameInput = this.parentElement.querySelector("#input-4")
  this.parentElement.parentElement.parentElement.querySelector("h5").innerText = `Welcome to BBB ${usernameInput.value}`
  usernameInput.value = ""

  //Hide Log In Form
  document.querySelector("#loginForm").style.display = "none"
  document.querySelector("#logoutForm").style.display = "block"

  //Enable Nav Links
  document.querySelector("#bookListNavLink").href = "#process"
  document.querySelector("#bookSearchNavLink").href = "#features"

  //Allow Scrolling
  document.querySelector("body").style.overflow = "auto"
});

document.querySelector("#logoutForm").addEventListener('click', function(event) {
  document.querySelector("#loginForm").style.display = "block"
  document.querySelector("#logoutForm").style.display = "none"

  //Disable Nav Links
  document.querySelector("#bookListNavLink").href = ""
  document.querySelector("#bookSearchNavLink").href = ""

  //Allow Scrolling
  document.querySelector("body").style.overflow = "hidden"
})
