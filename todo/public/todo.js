import { db, getDocs, addDoc, collection, doc, deleteDoc, updateDoc } from "./config.js";

const getid = document.getElementById('listitems')

if(!localStorage.userid){
    window.location.replace("./index.html")
}


const additems = async () => {
    const todoinput = document.querySelector("#todoinput")
    if (todoinput.value.trim()) {
        try {
            let todoObj = {
                value: todoinput.value
            }
            const res = await addDoc(collection(db, "todo"), todoObj)
            todoinput.value = ""
            getTodo()
        } catch (error) {
            alert(error.message)
        }
    }

}

const getTodo = async () => {

    try {

        const listitems = document.querySelector("#listitems")
        listitems.innerHTML = ""
        const querySnapshot = await getDocs(collection(db, "todo"));
        const todoData = []


        querySnapshot.forEach((doc) => {

            const obj = {
                doc: doc.id,
                ...doc.data()
            }
            todoData.push(obj)
        });
        for (let todoItems of todoData) {
            const list = ` <li class="list my-2 d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    <div><input type="text" class="form-control" id="listinput" disabled value="${todoItems.value}" ></div>
                    <div><button class="btn btn-outline-primary btnMS" id=${todoItems.doc} onclick = "editbtn(this)">Edit</button>
                    <button class="btn btn-outline-danger btnMS" id=${todoItems.doc} onclick ="deltetodo(this)">Delete</button></div>
                </li>`
            listitems.innerHTML += list
        }
    } catch (error) {
        alert(error.message)
    }
}

const deltetodo = async (elem) => {
    try {
        await deleteDoc(doc(db, "todo", elem.id));
        getTodo()
    } catch (error) {
        alert(error.code)
    }
}

let edit = false;
const editbtn = async (elem) => {
    try {
        if (edit) {
            elem.parentNode.parentNode.children[0].children[0].disabled = true
            elem.parentNode.parentNode.children[0].children[0].blur()
            elem.innerHTML = "Edit"
            edit = false
            await updateDoc(doc(db, "todo", elem.id), {
                value: elem.parentNode.parentNode.children[0].children[0].value
            });
            getTodo()
        }
        else {
            elem.parentNode.parentNode.children[0].children[0].disabled = false
            elem.parentNode.parentNode.children[0].children[0].focus()
            elem.innerHTML = "Update"
            edit = true
        }
    } catch (error) {
        alert(error.message)
    }
}

const deleteall = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "todo"));
        querySnapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
            });
        getTodo()
        
    } catch (error) {
        alert(error.message)
    }
   
}


const signoutBtn = () => {
    localStorage.removeItem("userid")
    alert("Signout Successfully")
    window.location.reload()
}



window.addEventListener("load", getTodo)

window.additems = additems
window.deleteall = deleteall
window.deltetodo = deltetodo
window.editbtn = editbtn
window.signoutBtn = signoutBtn