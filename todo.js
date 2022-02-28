
function loadList()  {
    var count = localStorage.getItem("todoCount")
    if (count == null) 
        return

    for (var number = 0; number <= count; number++) {
        var todoTask = localStorage.getItem("todo" + number + "text")
        var todoDone = parseBool(localStorage.getItem("todo" + number + "done"))
        if (todoTask == null) {
            continue;
        }

        addItem(number, todoTask, todoDone)
    }
}

// https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript#comment52868347_263965
function parseBool(val) {
    return val === true || val === "true"
}

function clearList() {
    localStorage.clear();
    location.reload()
}

function validateInput() {
    var feedback = document.getElementById('feedback')
    var inputField = document.forms["input"]["task"]
    var input = inputField.value
    if (input == null || input.length < 2) {
        
        inputField.style.borderColor = "red"; 
        feedback.innerHTML = "<b>*Tehtävässä tulee olla vähintään kaksi merkkiä!</b>"
        return false;
    }

    inputField.style.borderColor = "black";
    feedback.innerHTML = ""
    inputField.value = ""

    var list = document.getElementById('list')
    // numerointi alkaa nollasta, kun tyhjän listan element count on 0
    var number = list.childElementCount

    var done = false
    addItem(number, input, done)
    saveItem(number, input, done)

    return false
}

function addItem(number, text, done) {

    var list = document.getElementById('list')

    var li = document.createElement("li")
    var div = document.createElement("div")
    div.id = "div" + number
    li.appendChild(div)

    var todoItem = document.createTextNode(text);
    div.appendChild(todoItem)

    var doneButton = document.createElement("button")
    doneButton.id = "done" + number
    doneButton.className = "done"
    doneButton.onclick = function() {
        var isDone = parseBool(localStorage.getItem("todo" + number + "done"))
        markAsDone(number, !isDone)
    }
    div.appendChild(doneButton)


    var deleteButton = document.createElement("button")
    deleteButton.textContent = "Poista"
    deleteButton.className = "delete"
    deleteButton.onclick = function() {
        list.removeChild(li)
        removeItem(number)
    }
    div.appendChild(deleteButton)

    list.appendChild(li)
    markAsDone(number, done)
}

function markAsDone(number, done) {
    localStorage.setItem("todo" + number + "done", done)
    var div = document.getElementById("div" + number)
    var doneButton = document.getElementById("done" + number)
    if (done) {
        div.className = "done"
        doneButton.textContent = "Merkitse tekemättömäksi"
    }
    else {
        div.className = ""
        doneButton.textContent = "Merkitse tehdyksi"
    }
}

function saveItem(number, text, done) {
    localStorage.setItem("todo" + number + "text", text)
    localStorage.setItem("todo" + number + "done", done)
    // talletetaan kokonaislukumäärä
    var count = document.getElementById('list').childElementCount
    localStorage.setItem("todoCount", number)
}

function removeItem(number) {
    localStorage.removeItem("todo" + number + "text")
    localStorage.removeItem("todo" + number + "done")
}