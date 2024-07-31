import { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword , setDoc,doc ,db } from "./config.js";

if(localStorage.userid){
    window.location.replace("../pages/homepage.html")
}

const authBtn = (authFlag) => {
    if(!authFlag){
        window.location.href = "../index.html"
    }else{
        window.location.href = "../pages/signup.html"
    }
}


const signupBtn = async () => {
    try {
        const fullName = document.querySelector("#fullName")
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")
        const gender = document.getElementsByName("gender")

        let userObj = {
            fullname : fullName.value,
            email : email.value,
        }

        for(let g of gender){
            if(g.checked){
                userObj.gender = g.value
            }
        }

    const signUp =await createUserWithEmailAndPassword(auth, email.value, password.value)
    const res = await setDoc(doc(db, "users",signUp.user.uid), userObj)
    fullName.value = "";
    email.value = "";
    password.value = "";
    alert("Signup Successfully")
    window.location.href = "../index.html"

    } catch (error) {
        alert(error.message)
    }
}

const logInBtn = async () => {
    try {
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")
     
       const res = await signInWithEmailAndPassword(auth, email.value, password.value)
       localStorage.setItem("userid",res.user.uid)
       email.value = "";
       password.value = "";
        alert("Login Successfully")
       window.location.replace("../pages/homepage.html")
        
    } catch (error) {
       alert(error.message)
    }
}



window.authBtn = authBtn
window.logInBtn = logInBtn
window.signupBtn = signupBtn
