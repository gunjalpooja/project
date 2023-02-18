
let data;
const button = document.getElementById("button")
//const pid = document.getElementById("empid")
const dname = document.getElementById("name")
const speciality=document.getElementById("speciality")
const visiting_day=document.getElementById("vday")
const visiting_time=document.getElementById("vtime")
const landline=document.getElementById("mbno")
const demail = document.getElementById("email")
const password = document.getElementById("password")

button.addEventListener('click', (event) => {

  event.preventDefault();

  postData('http://localhost:8000/api/v1/doctor/logindoctor', {
   // "pid": pid.value,
    "dname": dname.value,
    "speciality":speciality.value,
    "visiting_day":visiting_day.value,
    "visiting_time":visiting_time.value,
    "landline": landline.value,
    "pemail": pemail.value,
    "password": password.value

  })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      //window.location.href = 'login.html';
    });

})

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
