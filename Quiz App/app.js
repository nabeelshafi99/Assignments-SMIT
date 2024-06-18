var javascriptQuiz = [
    {
        question: 'What will be the output of the following code?',
        code: 'console.log(typeof null);',
        option1: 'object',
        option2: 'null',
        option3: 'undefined',
        option4: 'function',
        correct: 'object',
    },
    {
        question: 'How do you create a function in JavaScript?',
        option1: 'def myFunction() {}',
        option2: 'function myFunction() {}',
        option3: 'create myFunction() {}',
        option4: 'function: myFunction() {}',
        correct: 'function myFunction() {}',
    },
    {
        question: 'Which of the following is not a JavaScript data type?',
        option1: 'Number',
        option2: 'String',
        option3: 'Boolean',
        option4: 'Character',
        correct: 'Character',
    },
    {
        question: 'What is the correct way to declare a variable in JavaScript?',
        option1: 'let x = 10;',
        option2: 'int x = 10;',
        option3: 'x = 10;',
        option4: 'variable x = 10;',
        correct: 'let x = 10;',
    },
    {
        question: 'What does the `===` operator do in JavaScript?',
        option1: 'Compares values and types',
        option2: 'Compares only values',
        option3: 'Assigns a value',
        option4: 'Performs bitwise AND',
        correct: 'Compares values and types',
    },
];


var mainBox = document.getElementById('mainBox');
var preBtn = document.getElementById('preBtn');
mainBox.innerHTML = loginUi();

var count = 0;
var sec = 60;
var correctAns = 0
var incorrectAns = 0
var per = 0
var interval ;


function fixedNum(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return num
    }
}

function resultUi() {
    return `<div> 
    <h1 class="my-4 text-center">Result</h1>
    <div class="d-flex justify-content-center align-items-center flex-column">
        <h3>Accurate</h3>
        <h3>${Math.floor(per)}%</h3>
        <h3>Correct Answer</h3>
        <h3>${correctAns}</h3>
        <h3>Incorrect Answer</h3>
        <h3>${incorrectAns}</h3>
        </div>
        <div class="buttons my-4 d-flex justify-content-center">
            <button class="btn btn-primary px-4" onclick="tryAgain()">Try again</button>
        </div>
    </div>`
}

function contentUi() {
    return `
    <div class="container shadow p-4" id="content">
        <div class="content px-4 d-flex justify-content-between align-items-center">
            <div>
                <h4>${localStorage.getItem('username')}</h4>
                <h6>${localStorage.getItem('email')}</h6>
            </div>
            <div>
                <h3>
                    <span id="displayTimer">00</span>
                </h3>
            </div>
        </div>
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0"
            aria-valuemax="100">
            <div class="progress-bar" id="progress" style="width: 100%"></div>
        </div>
        <div class="my-4" id="contentBox">
  
            <h4 class="my-4"><span>Q:${count + 1} </span> <span id="question"> ${javascriptQuiz[count].question} </span></h4>
  
            <div class="form-check p-2 my-2 d-flex align-items-center gap-3" id="formCheck">
                <input onchange='checkAns(this)' class="form-check-input ms-2" type="radio" name="options" value='1' id="option1">
                <label class="form-check-label fs-5" for="option1">${javascriptQuiz[count].option1}</label>
            </div>
            <div class="form-check p-2 my-2 d-flex align-items-center gap-3" id="formCheck">
                <input onchange='checkAns(this)' class="form-check-input ms-2" type="radio" name="options" value='2' id="option2">
                <label class="form-check-label fs-5" for="option2">${javascriptQuiz[count].option2}</label>
            </div>
            <div class="form-check p-2 my-2 d-flex align-items-center gap-3" id="formCheck">
                <input onchange='checkAns(this)' class="form-check-input ms-2" type="radio" name="options" value='3' id="option3">
                <label class="form-check-label fs-5" for="option3">${javascriptQuiz[count].option3}</label>
            </div>
            <div class="form-check p-2 my-2 d-flex align-items-center gap-3" id="formCheck">
                <input onchange='checkAns(this)' class="form-check-input ms-2" type="radio" name="options" value='4' id="option4">
                <label class="form-check-label fs-5" for="option4">${javascriptQuiz[count].option4}</label>
            </div>
  
  
        </div>
        <div class="buttons my-4 d-flex justify-content-center">
            <button class="btn btn-primary px-4" disabled id='nextBtn' onclick="navQuiz()">Next</button>
        </div>
  
    </div>
    `
}

function loginUi() {
    return `<div class="formBox shadow p-4">
            <h2>Login</h2>
            <div class="w-100">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <button class="btn btn-primary w-100 mt-4 fw-bold" onclick='login()'>Login</button>
              <button class="btn btn-outline-success fw-bold w-100 my-4" onclick='authUi(false)'>Signup</button>

              </div>
            
        </div>`
}

function signupUi() {
    return `  <div class="formBox shadow p-4">
            <h2>Signup</h2>
            <div class="w-100">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="username" placeholder="Enter username">
                <label for="floatingInput">Username</label>
              </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <button class="btn btn-primary w-100 mt-4 fw-bold" onclick='signUp()'>Signup</button>
              <button class="btn btn-outline-success fw-bold w-100 my-4" onclick='authUi(true)'>Login</button>

              </div>
            
        </div>`
}


function signUp() {
    var username = document.getElementById('username')
    var email = document.getElementById('email')
    var password = document.getElementById('password')

    localStorage.setItem('username', username.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('password', password.value)

    username.value = '';
    email.value = '';
    password.value = '';

    mainBox.innerHTML = loginUi()
}

function login() {
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    if (email.value == localStorage.getItem('email') && password.value == localStorage.getItem('password')) {
        mainBox.innerHTML = contentUi()
        interval = setInterval(function () {
    timer()
}, 1000);
    } else {
        email.parentNode.style.outline = '1px solid red'
        password.parentNode.style.outline = '1px solid red'
        email.focus()
    }

}

function checkAns(check) {
    var radio = document.getElementsByName('options')
    var nextBtn = document.getElementById('nextBtn');
    for (var i = 0; i < radio.length; i++) {
        radio[i].disabled = true
    }
    nextBtn.disabled = false
    if (javascriptQuiz[count][`option${check.value}`] == javascriptQuiz[count].correct) {
        check.parentNode.style.background = 'green'
        check.parentNode.style.color = '#fff'
        correctAns++
    } else {
        check.parentNode.style.background = 'red'
        incorrectAns++
    }
}

function navQuiz() {
    sec = 60;
    per = (correctAns / javascriptQuiz.length) * 100
    if (count == javascriptQuiz.length - 1) {
        clearInterval(interval)
        mainBox.innerHTML = resultUi()

    } else {
        count++
        mainBox.innerHTML = contentUi()
    }
}


function timer() {
    var displayTimer = document.getElementById('displayTimer')
    var progress = document.getElementById('progress')
    sec--
    progress.style.width = `${(sec/60)*100}%`
    displayTimer.innerHTML = fixedNum(sec)
    if (sec == 0) {
        sec = 60
        progress.style.width = `100%`
        count++
        navQuiz()
    }
}

function authUi(ins){
    if(!ins){
        mainBox.innerHTML = signupUi()
    }else{
        mainBox.innerHTML = loginUi()

    }
}

function tryAgain(){
    window.location.reload()
}

