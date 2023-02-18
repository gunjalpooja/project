let data;
const button = document.getElementById("cf-submit")
const appointment_number= document.getElementById("number")
const pemail = document.getElementById("email")
const dname = document.getElementById("name")
const select_date = document.getElementById("date")
const select_time =document.getElementById("time")
const speciality =document.getElementById("department")
const message=document.getElementById("message")
    

button.addEventListener("click", () => {
    event.preventDefault();

//     var data = JSON.stringify({
//         //"pid": pid.value,
//        "appointment_number":appointment_number.value,
//         "pemail": pemail.value,
//         "dname": dname.value,
//         "select_date":select_date.value,
//          "select_time":select_time.value,
//      "speciality":speciality.value,
//         "message": message.value,
//      });
        
//     console.log(data);
//    alert("appointment book")
//     window.location.href = "index.html";
// });

postData('http://localhost:8000/api/v1/appointment/bookappointment', {
    "appointment_number":appointment_number.value,
             "pemail":pemail.value ,
            "dname": dname.value,
             "select_date":select_date.value,
           "select_time":select_time.value,
             "speciality":speciality.value,
            "message":message.value,
             
  })
    .then(data => {
      if(data.status) {
      console.log(data); // JSON data parsed by `data.json()` call
      window.location.href = 'index.html';
      alert("successfully booked ");
      }
      else {
      const errSpan=document.getElementById("booking_failed");
  if(errSpan)
{
  errSpan.innerHTML ="booking failed .";
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





















//     postData('http://localhost:8000/api/v1/appointment/bookappointment',  {
    
//         "appointment_number":appointment_number.value,
//         "pemail":pemail.value ,
//         "dname": dname.value,
//         "select_date":select_date.value,
//         "select_time":select_time.value,
//         "speciality":speciality.value,
//         "message":message.value,
//         //"appointment_number": "111",
//         // "pemail": "bhagatkaveri750@gmail.com",
//         // "dname": "Dr.Uday Kulkarni",
//         // "select_date": "2022-12-12T08:00:00.000Z",
//         // "select_time": "15:30:00",
//         // "speciality": "Surgeon",
//         // "message": "i have fever"
        
//          })
//      .then(data => {
//        // if (data.status) {
//          console.log(data);
// alert("Appointment Book Successfully")
// window.location.href = "index.html";
//         // }
//         // else {
//         //     const errSpan = document.getElementById("booking_failed");
//         //     if(errSpan){
//         //       errSpan.innerHTML = "booking  Failed.";
//         //     }

// //          }
//          });
// });
// async function postData(url='', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       // mode: 'cors', // no-cors, *cors, same-origin
//       // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       // credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       // redirect: 'follow', // manual, *follow, error
//       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }

