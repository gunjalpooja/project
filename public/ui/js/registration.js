
let data;
const button = document.getElementById("cf-submit")
//const pid = document.getElementById("empid")
const pname = document.getElementById("firstname")
const pemail = document.getElementById("email")
const mobile = document.getElementById("phone_number")
const password = document.getElementById("pass")

button.addEventListener('click', (event) => {

  event.preventDefault();

  postData('http://localhost:8000/api/v1/patient/register', {
   // "pid": pid.value,
    "pname": pname.value,
    "pemail": pemail.value,
    "mobile": mobile.value,
    "password": password.value,

  })
    .then(data => {
      if(data.status) {
      console.log(data); // JSON data parsed by `data.json()` call
      window.location.href = 'login.html';
      alert("successfully registered ");
      }
      else {
      const errSpan=document.getElementById("registration_failed");
  if(errSpan)
{
  errSpan.innerHTML ="registration failed .";
}
      }
    });

})

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
   // mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
