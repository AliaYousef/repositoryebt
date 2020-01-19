const inputfile = document.getElementById("fileInput"),
    imgInp = document.getElementById('imgInp'),
    d64 = "";

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imgInp").setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
inputfile.addEventListener("change", function () {
    readURL(this);
});
imgInp.addEventListener('click', () => {
    inputfile.click()
});
inputfile.onchange = function () {
    var file = inputfile.files[0],
        img = new FileReader();
    img.onloadend = function () {
        b64 = img.result.replace(/^data:.+;base64,/, '');
    };
    img.readAsDataURL(file);
};

const name = document.getElementById("inputName"),
    position = document.getElementById("inputPosition"),
    mobile = document.getElementById("inputMobile"),
    email = document.getElementById("inputEmail2"),
    save = document.getElementById("savePage2");

save.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addcontact();
    }
});

save.addEventListener("click", addcontact);

function addcontact() {
    const myheader = new Headers();
    myheader.append('Content-Type', 'application/json');
    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: myheader,
        body: JSON.stringify({
            name: name.value,
            position: position.value,
            mobile: mobile.value,
            photo: b64,
            email: email.value
        })
    }).then(response => response.json()).then((data) => {
        console.log(data);
    });
};