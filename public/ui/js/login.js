
let user;

const button = document.getElementById("cf-submit");

const pemail = document.getElementById("uname");

const password = document.getElementById("pass");
button.addEventListener('click', (event) => {

  event.preventDefault();

  postData('http://localhost:8000/api/v1/patient/login', {
    "pemail": pemail.value,
    "password": password.value,
  })
    .then(data => {
      if (data.status) {
        console.log(data);
        window.location.href = "index.html";
        alert("login successfully");
      }
      else {
        const errSpan = document.getElementById("login_failed");
        if(errSpan){
          errSpan.innerHTML = "Login Failed.";
        }
      }
    });

})

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
