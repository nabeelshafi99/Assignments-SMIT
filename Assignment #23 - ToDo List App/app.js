
function addTask() {
    var input = document.getElementById('input')
    if (input.value.trim()) {
        var todoList = document.getElementById('todoList')
        var li = document.createElement('li')
        var listInput = document.createElement('input')
        var span = document.createElement('span')
        span.innerHTML = `<button onclick='editItem(this)'>Edit</button> <button onclick='removeItem(this)' id='removeBtn' >Delete</button>`
        listInput.setAttribute("value", input.value)
        listInput.setAttribute("disabled", true)
        li.appendChild(listInput)
        li.appendChild(span)
        todoList.appendChild(li)
        input.value = ""
    }
}

function deleteAll() {
    var todoList = document.getElementById('todoList')
    todoList.innerHTML = ""
    console.log("Delete Working", todoList)
}


function removeItem(element) {
    element.parentNode.parentNode.remove()
}

function editItem(element) {

    if (element.innerHTML == "Edit") {
        element.parentNode.parentNode.firstElementChild.disabled = false
        element.innerHTML = 'Update'
    } else {
        element.parentNode.parentNode.firstElementChild.disabled = true
        element.innerHTML = 'Edit'
    }
}

