const inputfile = document.getElementById("fileInput"),
    imgInp = document.getElementById('imgInp'),
    title = document.getElementById('title'),
    location1 = document.getElementById('location'),
    date = document.getElementById('date'),
    d64 = "";
let  home = {};
function readURL(input) {
    console.log(input.files && input.files[0]);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgInp.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

inputfile.addEventListener("change", function () {
    readURL(this);
});
imgInp.addEventListener('click', () => {
    inputfile.click()
})

inputfile.onchange = function () {
    var file = inputfile.files[0],
        img = new FileReader();
    img.onloadend = function () {
        b64 = img.result.replace(/^data:.+;base64,/, '');
    };
    img.readAsDataURL(file);
};
let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
console.log(token);
const myheader = new Headers();
myheader.append('Content-Type', 'application/json');
myheader.append('Authorization', `Bearer ${token}`);
fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: myheader
    })
    .then(response => response.json())
    .then((data) => {
        home = data[0];
        console.log(home);
        renderhome(home);
    });
document.getElementById('buttonSave').addEventListener('click', add);

function add() {
    console.log(b64);
    const myheader = new Headers();
    myheader.append('Content-Type', 'application/json');
    myheader.append('Authorization', `Bearer ${token}`);
    fetch('http://localhost:3000/home', {
            method: 'PUT',
            headers: myheader,
            body: JSON.stringify({
                photo: b64,
                title: title.value,
                location: location1.value,
                date: date.value
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            // renderhome() 
        })
}

function renderhome(home) {

    imgInp.src ='http://localhost:3000' + home.homeimg;
    title.value = home.hometitle;
    location1.value = home.homelocation;
    date.value = home.homedate;


}