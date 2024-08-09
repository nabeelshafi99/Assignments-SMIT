import { collection, getDocs, getDoc, addDoc, setDoc, doc, db, ref, storage, uploadBytes, getDownloadURL } from "./js/firebase.js";


const data = [];


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

        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            const obj = {
                doc: doc.id,
                ...doc.data()
            }
            data.push(obj)
        });
        if (localStorage.getItem("user")) {
            const prMdImg = document.querySelector("#prMdImg")
            const userProfileImage = document.querySelector("#userProfileImage")
            const docSnap = await getDoc(doc(db, "users", localStorage.getItem("user")));
            userProfileImage.innerHTML = `<img src=${docSnap.data().primg} />`
            prMdImg.innerHTML = `<img src=${docSnap.data().primg} />`
        }
            homeUi.innerHTML = ""
            if (data.length) {
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].isPrivate || data[i].userid == localStorage.getItem("user")) {
                        homeUi.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                  <div onclick=postView("${data[i].doc}") class="card" style="width: 16rem;">
                    <img src=${data[i].blogImage} class="card-img-top" alt="...">
                    <div class="card-body">
                      <h6 class="card-title">${data[i].title.slice(0, 20)}...</h6>
                      <p class="card-text">${data[i].description.slice(0, 25)}...</p>
                      <div class="card-text my-0 py-0 fw-semibold d-flex gap-3 align-items-center">
                        <div class="pr-sm-img"><img src=${data[i].userPost} class="blogUserImg" /></div>
                        <div class="">${data[i].userName.split(" ")[0]}</div>
                        <div class="">${data[i].date}</div>
                      </div>
                    </div>
                  </div>
                </div>`
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

const testPost = () => {
    const postTitle = document.querySelector("#postTitle").value
    const postDescription = document.querySelector("#postDescription").value
    const category = document.querySelector("#category").value
    const imgName = document.querySelector("#imgName")
    const UploadImage = document.querySelector("#UploadImage")
    const postBtn = document.querySelector("#postBtn")
    const isPrivate = document.getElementsByName("isPrivate")
    let flag = false;
    if (UploadImage.value) {
        imgName.innerHTML = UploadImage.value
    }
    for (var i = 0; i < isPrivate.length; i++) {
        if (isPrivate[i].checked) {
            flag = isPrivate[i].value
        }
    }


    if (postTitle.length > 5 && postDescription.length > 15 && category && flag && UploadImage.value) {
        postBtn.disabled = false;
    } else {
        postBtn.disabled = true;
    }

}

const posted = async () => {

    try {

        const btn_close = document.querySelector("#btn-close")
        const postTitle = document.querySelector("#postTitle").value
        const postDescription = document.querySelector("#postDescription").value
        const category = document.querySelector("#category").value
        const UploadImage = document.querySelector("#UploadImage").files[0]
        const isPrivate = document.getElementsByName("isPrivate")
        let flag = false;
        const dateTime = new Date().toString().split(" ")

        for (var i = 0; i < isPrivate.length; i++) {
            if (isPrivate[i].checked) {
                console.log(isPrivate[i].value)
                flag = true
            }
        }

        const docSnap = await getDoc(doc(db, "users", localStorage.getItem("user")));

        const blogObj = {
            userid: localStorage.getItem("user"),
            title: postTitle,
            description: postDescription,
            category: category,
            isPrivate: flag,
            date: `${dateTime[2]}-${dateTime[1]}-${dateTime[3]}`,
            time: `${dateTime[4]} `,
            userPost: docSnap.data().primg,
            userName: docSnap.data().fullname
        }


        // Create file metadata including the content type
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg',
        };

        const docRef = await addDoc(collection(db, "blogs"), blogObj);
        const storageRef = ref(storage, `images/blogs/${docRef.id}`);
        const uploadTask = await uploadBytes(storageRef, UploadImage, metadata);
        const downloadUrl = await getDownloadURL(storageRef);
        blogObj.blogImage = downloadUrl;
        const res = await setDoc(doc(db, "blogs", docRef.id), blogObj);
        location.reload()
    } catch (error) {
        console.log(error.message)
    }

}


const imgInvoke = () => {
    const UploadImage = document.querySelector("#UploadImage").click()
}

const postView = (doc) => {
    localStorage.setItem("docRef",doc)
    if (location.href.indexOf("blog") != -1) {
        window.location.href = "./postview.html"
    }else{
        window.location.href = "./pages/postview.html"
    }
}
const filterData = (related) => {
    if(related == "all"){
        window.location.reload()
    }
    const homeUi = document.querySelector("#homeUi")
    homeUi.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].category == related) {
            homeUi.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
            <div onclick=postView("${data[i].doc}") class="card" style="width: 16rem;">
              <img src=${data[i].blogImage} class="card-img-top" alt="...">
              <div class="card-body">
                <h6 class="card-title">${data[i].title.slice(0, 20)}...</h6>
                <p class="card-text">${data[i].description.slice(0, 25)}...</p>
                <div class="card-text my-0 py-0 fw-semibold d-flex gap-3 align-items-center">
                  <div class="pr-sm-img"><img src=${data[i].userPost} class="blogUserImg" /></div>
                  <div class="">${data[i].userName.split(" ")[0]}</div>
                  <div class="">${data[i].date}</div>
                </div>
              </div>
            </div>
          </div>`
    
        }
    }
}


window.signOut = signOut;
window.posted = posted;
window.testPost = testPost;
window.imgInvoke = imgInvoke;
window.postView = postView;
window.filterData = filterData;