var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')
const myNewsteller = document.getElementById('newsteller')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})

myNewsteller.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        myNewsteller.submit()
    }
})

var check = function () {
    if (document.getElementById('password').value ==
        document.getElementById('password-confirmation').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }
}

// TEXTAREA RESIZING
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}