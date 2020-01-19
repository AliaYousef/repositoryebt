
const users=[];

function header() {
			const email = document.getElementById('email').value,
			password = document.getElementById('password').value;
			const user = {
				email,
				password
			};
			console.log(user);
			const myHeaderS = new Headers();
			myHeaderS.append('Content-Type', 'application/json');
			
			fetch('http://localhost:3000/users/login', {
				method: 'POST',
				headers: myHeaderS,
				body: JSON.stringify(user)
			})
			 .then (response => response.json())
			.then(data =>{
				console.log(data);
				document.cookie =`token=${data.token} ;path=/`;
				location.replace("http://127.0.0.1:5500/Ebtekarthon/headerLogo/headerlogo.html");
			
		});
		
		};
		


function adduser (){
	const username = document.getElementById('username').value,
	email = document.getElementById('email').value,
	password = document.getElementById('password').value;
	const user = {
		username ,
		email,
		password,
	};
	console.log(user);
	const myHeaderS = new Headers();
	myHeaderS.append('Content-Type', 'application/json');
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: myHeaderS,
        body: JSON.stringify(user)
    })
     .then (response => response)
    .then(data => console.log(data) );
};

