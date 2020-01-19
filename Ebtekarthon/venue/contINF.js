document.getElementById('buttonSave').addEventListener('click', add);
let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
console.log(token);
rendercontINF();
 function add() {
     const location = document.getElementById('location').value,
     email = document.getElementById('email').value,
     phone = document.getElementById('phone').value ;
     const myheader = new Headers();
     myheader.append('Content-Type', 'application/json');
     myheader.append('Authorization', `Bearer ${token}`);
     fetch('http://localhost:3000/contINF', {
             method: 'PUT',
             headers: myheader,
             body: JSON.stringify({
                 location, 
                 phone,
                 email
             })
         })
         .then(response => response)
         .then((data) => {
             console.log(data);
             rendercontINF();
         })
 }
 function rendercontINF(){
    
    const myheader = new Headers();
    myheader.append('Content-Type', 'application/json');
    myheader.append('Authorization', `Bearer ${token}`);
    fetch('http://localhost:3000/contINF', {
            method: 'GET',
            headers: myheader
        })
        .then(response => response.json())
        .then((data) => {
        console.log(data[0]);
      document.getElementById('add').innerHTML = `<input name="text" type="text" id="location" placeholder="  Venu  " value="${data[0].location}"/>
      <br> <br><input name="text" type="tel" id="phone" placeholder=" Phone  " value="${data[0].numphone}" />
      <br><br> <input name="text" type="email" id="email" placeholder=" email  " value="${data[0].email}"/>
      `
        });
        
 }