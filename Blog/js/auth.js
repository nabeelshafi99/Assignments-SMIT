
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDoc, db, collection, addDoc, setDoc, doc, storage, ref, uploadBytes, getDownloadURL } from "./firebase.js";
window.addEventListener("load",async () => {
  if(localStorage.getItem("user")){
    window.location.replace("../index.html")
  }
})


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const testEmail = () => {
 const btn = document.querySelector("#btn")
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  if (emailRegex.test(email) && password.length > 7) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

const loginHandle = async () => {
  try {
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')

    const user = await signInWithEmailAndPassword(auth, email.value, password.value)
    localStorage.clear()
    localStorage.setItem("user", user.user.uid)

    window.location.reload()

  } catch (e) {
    console.log('error', e)
  }

}


const setProfileImg = () => {
  const prImg = document.querySelector('#prImg').click()
}

const setImg = () => {
  const prImg = document.getElementById('prImg').files
  if (prImg) {
    const prMdImg = document.getElementById('prMdImg')
    prMdImg.innerHTML = `<img src=${URL.createObjectURL(prImg[0])} class='prMdImg' />`
    localStorage.setItem('primg', prImg[0])
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }

}


const createaccount = async () => {
  try {
    const password = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const prImg = document.getElementById('prImg').files[0]
    const userObj = {
      fullname: localStorage.getItem('fullname'),
      email: email,
      gender: localStorage.getItem("gender"),
      dob: localStorage.getItem("dob"),
      country: localStorage.getItem("country"),
      city: localStorage.getItem("city"),
    }

    const userres = await createUserWithEmailAndPassword(auth, email, password)

    const storageRef = ref(storage, `images/profile/${userres.user.uid}`);

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };

    // Upload the file and metadata
    const uploadTask = await uploadBytes(storageRef, prImg, metadata);
    const downloadUrl = await getDownloadURL(storageRef);
    userObj.primg = downloadUrl;

    const res = await setDoc(doc(db, "users", userres.user.uid), userObj);
    window.location.href = "./stage5.html"

  } catch (error) {
    console.log(error)
  }
}


window.loginHandle = loginHandle;
window.setProfileImg = setProfileImg;
window.setImg = setImg;
window.createaccount = createaccount;
window.testEmail = testEmail;
