function navfun(link) {

    window.location.href = link

}

var hours = document.getElementById('hours')
var minutes = document.getElementById('minutes')
var seconds = document.getElementById('seconds')
var display = document.getElementById('display')
var sdisplay = document.getElementById('sdisplay')
var clockCircle = document.getElementById('clockCircle')
var dhrs = document.getElementById('dhrs')
var dmin = document.getElementById('dmin')
var dsec = document.getElementById('dsec')
var startBtn = document.getElementById('startBtn')

var hrs = 0;
var min = 0;
var sec = 0;



var run = false;
var interval;


function fixedNum(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return num
    }
}


function picker() {

    for (var i = 0; i < 24; i++) {
        var option = document.createElement('option')
        option.value = fixedNum(i)
        option.text = fixedNum(i)
        hours.appendChild(option)
    }

    for (var i = 0; i < 60; i++) {
        var option = document.createElement('option')
        option.value = fixedNum(i)
        option.text = fixedNum(i)
        minutes.appendChild(option)
    }

    for (var i = 0; i < 60; i++) {
        var option = document.createElement('option')
        option.value = fixedNum(i)
        option.text = fixedNum(i)
        seconds.appendChild(option)
    }
}
function startfun(ele) {
    if (!run) {
        run = true;

        ele.innerHTML = '<i class="fa-solid fa-pause"></i>'

        hrs = hours.value;
        min = minutes.value;
        sec = seconds.value


        display.style.display = 'flex';
        sdisplay.style.display = 'none';

        interval = setInterval(function () {

            if(sec == 0 && min == 0 && hrs == 0){
                display.style.display = 'none';
                sdisplay.style.display = 'flex';
        ele.innerHTML = '<i class="fa-solid fa-play"></i>'
                
            }

            if (sec > 0) {
                sec--
                dsec.innerHTML = fixedNum(sec)

                clockCircle.style.background = `conic-gradient(blue ${(sec / 60) * 360}deg,#fff 0deg)`;

            }
            else if (min > 0) {
                min--
                sec = 59
                dmin.innerHTML = fixedNum(min)
            }
            else if (hrs > 0) {
                hrs--
                min = 59
                dhrs.innerHTML = fixedNum(hrs)

            }

        }, 1000);



    } else {
        run = false;
        clearInterval(interval)
        ele.innerHTML = '<i class="fa-solid fa-play"></i>'
        console.log("sd")
    }



}

function stopfun() {
    run = false;
    clearInterval(interval)
    sec = 0
    hrs = 0
    min = 0


    hours.value = fixedNum(0)
    minutes.value = fixedNum(0)
    seconds.value = fixedNum(0)

    dsec.innerHTML = fixedNum(0)
    dmin.innerHTML = fixedNum(0)
    dhrs.innerHTML = fixedNum(0)

    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>' 

    clockCircle.style.background = `conic-gradient(blue 360deg,#fff 0deg)`;

    display.style.display = 'none';
    sdisplay.style.display = 'flex';

}





window.onload = picker()