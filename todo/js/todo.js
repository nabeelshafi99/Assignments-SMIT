import { storage, ref, getMetadata, getDownloadURL, uploadBytes, db, getDocs, addDoc, collection, doc, deleteDoc, updateDoc } from "./config.js";

if (!localStorage.userid) {
    window.location.replace("../index.html")
}


const additems = async () => {
    const todoinput = document.querySelector("#todoinput")
    if (todoinput.value.trim()) {
        try {
            let todoObj = {
                id: localStorage.getItem("userid"),
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
        const userName = document.querySelector("#userName")
        const userEmail = document.querySelector("#userEmail")
        const userGender = document.querySelector("#userGender")
        const todoGet = await getDocs(collection(db, "todo"));
        const userGet = await getDocs(collection(db, "users"));
        const todoData = []
        const userData = []
        todoGet.forEach((doc) => {
            if (doc.data().id == localStorage.getItem("userid")) {
                const obj = {
                    doc: doc.id,
                    ...doc.data()
                }
                todoData.push(obj)
            }
        });
        for (let todoItems of todoData) {
            const list = ` <li class="list my-2 d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    <div><input type="text" class="form-control" id="listinput" disabled value="${todoItems.value}" ></div>
                    <div><button class="btn btn-outline-primary btnMS" id=${todoItems.doc} onclick = "editbtn(this)">Edit</button>
                    <button class="btn btn-outline-danger btnMS" id=${todoItems.doc} onclick ="deltetodo(this)">Delete</button></div>
                </li>`
            listitems.innerHTML += list
        }

        userGet.forEach((doc) => {
            if (doc.id == localStorage.getItem("userid")) {
                const obj = {
                    doc: doc.id,
                    ...doc.data()
                }
                userData.push(obj)
            }
        });
        for (let user of userData) {
            userName.innerHTML = user.fullname;
            userEmail.value = user.email;
            userGender.value = user.gender;
        }
        getPrImg()

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

let pr_ed_st = false;
const up_pr = async (res) => {
    try {
        if (!pr_ed_st) {
            res.innerHTML = "<i class='fa-solid fa-arrow-up'></i>"
            res.parentNode.children[1].children[0].className = "form-control"
            res.parentNode.children[1].children[0].disabled = false;
            res.parentNode.children[1].children[0].focus()
            pr_ed_st = true
        }
        else {
            res.innerHTML = "<i class='fa-solid fa-pencil'></i>"
            res.parentNode.children[1].children[0].disabled = true
            res.parentNode.children[1].children[0].className = "form-control-plain-text"
            await updateDoc(doc(db, "users", localStorage.getItem("userid")), {
                gender: res.parentNode.children[1].children[0].value
            });
            getTodo()
            pr_ed_st = false
        }
    } catch (error) {
        alert(error.message)
    }

}

const uploadImg = async (e) => {
    try {
    
        const storageRef = ref(storage, `images/${localStorage.getItem("userid")}`);

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg',
    };

    // Upload the file and metadata
    let uploadTask = await uploadBytes(storageRef, e.target.files[0], metadata)

    window.location.reload()
        
    } catch (error) {
        alert(error.message)
    }
    

}

const getPrImg = async () => {
    try {
        const prImage1 = document.querySelector("#prImage1")
        const prImage2 = document.querySelector("#prImage2")
        const storageRef = ref(storage, `images/${localStorage.getItem("userid")}`);
        const url = await getDownloadURL(storageRef)
        prImage1.src = `${url}`
        prImage2.src = `${url}`


    } catch (error) {
        prImage1.classList.add("d-none")
        prImage1.parentNode.style.background = "green"
        prImage2.classList.add("d-none")
        prImage2.parentNode.style.background = "green"
    }
}

const inputInvoke = () => {
    const fileInput = document.querySelector("#fileInput")
    fileInput.click()
}

window.addEventListener("load", getTodo)

window.additems = additems
window.deleteall = deleteall
window.deltetodo = deltetodo
window.editbtn = editbtn
window.signoutBtn = signoutBtn
window.up_pr = up_pr
window.uploadImg = uploadImg
window.getPrImg = getPrImg
window.inputInvoke = inputInvoke