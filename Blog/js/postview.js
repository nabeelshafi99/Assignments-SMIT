import { collection, getDocs, getDoc, addDoc, setDoc, doc, db, ref, storage, uploadBytes, getDownloadURL } from "./firebase.js";


const data = [];
console.log(data)


const guestFooterUI = () => {
    if (location.href.indexOf("blog")) {
        return ` <a href="./login.html" class="btn btn-outline-light rounded-0 fw-semibold">LOGIN</a>
            <a href="./signup.html" class="btn btn-outline-light rounded-0 fw-semibold">SIGNUP</a>`
    } else {
        return ` <a href="./pages/login.html" class="btn btn-outline-light rounded-0 fw-semibold">LOGIN</a>
            <a href="./pages/signup.html" class="btn btn-outline-light rounded-0 fw-semibold">SIGNUP</a>`
    }
}
const guestUi = () => {
    if (location.href.indexOf("blog") != -1) {
        return ` <a href="./login.html" class="btn rounded-0 fw-semibold">Login</a>
              <a href="./signup.html" class="btn btn-dark rounded-0 fw-semibold">Signup</a>`

    } else {
        return ` <a href="./pages/login.html" class="btn rounded-0 fw-semibold">Login</a>
              <a href="./pages/signup.html" class="btn btn-dark rounded-0 fw-semibold">Signup</a>`
    }
}


const userUi = () => {
    return `
          <button data-bs-toggle="modal" data-bs-target="#createPost" class="btn rounded-0 fw-semibold">Create Post</button>
          <button id="userProfileImage" class="user p-0" data-bs-toggle="offcanvas" data-bs-target="#canvaRight" aria-controls="canvaRight" ></button>`
}

const userFooterUi = () => {
    return `
          <button data-bs-toggle="modal" data-bs-target="#createPost" class="btn btn-outline-light rounded-0 fw-semibold">Create Post</button>
          <button onclick="signOut()" class="btn btn-outline-light rounded-0 fw-semibold">Signout</button>`
}


window.addEventListener("load", () => {
    getData()

    const footerBtn = document.querySelector("#footerBtn")
    const navDes = document.querySelector("#navDes")
    if (localStorage.getItem("user")) {
        footerBtn.innerHTML = userFooterUi()
        navDes.innerHTML = userUi()
    } else {
        footerBtn.innerHTML = guestFooterUI()
        navDes.innerHTML = guestUi()
    }
})

const getData = async () => {
    try {

        const homeUi = document.querySelector("#homeUi")
        const relatedPost = document.querySelector("#relatedPost")

        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            const obj = {
                doc: doc.id,
                ...doc.data()
            }
            data.push(obj)
        });
        homeUi.innerHTML = ""
        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].doc == localStorage.getItem("docRef")) {
                    homeUi.innerHTML += `<div class="postViewImg">
                    <img src=${data[i].blogImage} class="card-img-top w-100" alt="...">
                    </div>
          <div class="my-4">
            <h5>${data[i].title}</h5>
            <p>${data[i].description}</p>
          </div>`
                }

            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].doc == localStorage.getItem("docRef")) {

                    const related = []
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].category == data[i].category)
                            related.push(data[i])
                    }
                    for (var i = 0; i < 5; i++) {
                        relatedPost.innerHTML += `<div>
      <div class="card" style="width: 16rem;">
        <img src=${related[i].blogImage} class="card-img-top" alt="...">
        <div class="card-body">
          <h6 class="card-title">${related[i].title.slice(0, 20)}...</h6>
          <p class="card-text">${related[i].description.slice(0, 25)}...</p>
         
        </div>
      </div>

  </div>`
                    }
                }
            }


        }


    } catch (error) {
        console.log(error.message)
    }

}

const signOut = () => {
    localStorage.clear()
    window.location.reload()
}

const relatedInvoke = () => {

}

window.signOut = signOut;

window.relatedInvoke = relatedInvoke;

