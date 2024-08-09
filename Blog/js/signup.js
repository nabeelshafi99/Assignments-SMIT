const btn = document.getElementById('btn')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkFullname = () => {
  const firstname = document.querySelector('#firstname').value
  const lastname = document.querySelector('#lastname').value

    if (firstname.length > 2 && firstname.trim() && lastname.length > 2 && lastname.trim()) {
      
      let fullname = `${firstname.charAt(0).toUpperCase()}${firstname.slice(1).toLowerCase()} ${lastname.charAt(0).toUpperCase()}${lastname.slice(1).toLowerCase()}`;

    localStorage.setItem('fullname', fullname)
  
      
    btn.disabled = false;
    
}else{
  btn.disabled = true;
}
}

const stages = () => {
    const firstname = document.querySelector('#firstname').value
  const lastname = document.querySelector('#lastname').value

  
    window.location.href = './signup/stage1.html'

}

const emailPasswordCheck = () => {
    const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  if (emailRegex.test(email) && password.length > 7) {

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

btn.disabled = false;

  }else{
    btn.disabled = true ;
  }
}

const stageOne = () => {
window.location.href = './stage2.html';
}

const stageTwo = () => {
  window.location.href = './stage3.html'
}


const checkdob = () => {
    const gender = document.querySelector('#gender').value;
  const dob = document.querySelector('#dob').value
  if (gender && dob) {
    localStorage.setItem('gender', gender)
    localStorage.setItem('dob', dob)
    btn.disabled = false ;
  }else{
    btn.disabled = true;
  }
}

const stageThree = () => {
window.location.href = './stage4.html'
}

const countryCity = () => {
    const country = document.querySelector('#country').value;
  const city = document.querySelector('#city').value
  
  console.log('country',country)
  console.log('city',city)
  if (country && city) {
    localStorage.setItem('country', country)
    localStorage.setItem('city', city)

  btn.disabled = false;
  }else{
    btn.disabled = true ;
  }
}
