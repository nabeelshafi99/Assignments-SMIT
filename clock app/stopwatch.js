function navfun(link) {

    window.location.href = link

}


// stopwatch

var stopwatchDisplay = document.getElementById('stopwatchDisplay')

var hours = document.getElementById('hours')
var minutes = document.getElementById('minutes')
var seconds = document.getElementById('seconds')
var milliseconds = document.getElementById('milliseconds')
var table = document.getElementById('table')
var playbtn = document.getElementById('playbtn')


var hrs = 0;
var min = 0;
var sec = 0;
var millisec = 0;
var startInterval;
var run = false;
var arr = [];
var lapcounter = 0;

function startfun() {
    if (!run) {
        playbtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
        startInterval = setInterval(function () {
            millisec++
            milliseconds.innerHTML = millisec
            if (millisec == 100) {
                sec++
                if (sec < 10) {
                    seconds.innerHTML = '0' + sec
                }
                millisec = '00'

                if (sec > 59) {
                    min++
                    if (sec < 10) {
                        minutes.innerHTML = '0' + min
                    }
                    sec = '00'
                }
                if (min > 59) {
                    hrs++
                    if (sec < 10) {
                        hours.innerHTML = '0' + hrs
                    }
                    min = '00'
                }
            }
        }, 10)

        run = true;
    } else {
        playbtn.innerHTML = '<i class="fa-solid fa-play"></i>'
        clearInterval(startInterval)
        run = false;
    }

}


function resetfun() {
    clearInterval(startInterval)
    hrs = '00';
    min = '00';
    sec = '00';
    millisec = '00';
    milliseconds.innerHTML = '00';
    seconds.innerHTML = '00'
    minutes.innerHTML = '00'
    hours.innerHTML = '00'
    table.innerHTML = "";
    run = false;
    playbtn.innerHTML = '<i class="fa-solid fa-play"></i>'

}

function lapfun() {
    arr.push(hours.innerHTML + " : " + minutes.innerHTML + " : " + seconds.innerHTML)
    table.innerHTML += `<tr> <td>${lapcounter}</td> 
    <td> ${arr[lapcounter]} </td> </tr>`
    lapcounter++
}