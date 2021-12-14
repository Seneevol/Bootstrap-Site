var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')
const myNewsteller = document.getElementById('newsteller')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})

myNewsteller.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        myNewsteller.submit()
    }
})

