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