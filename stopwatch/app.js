var thrsget = document.getElementById('thrs')
var uhrsget = document.getElementById('uhrs')
var tminget = document.getElementById('tmin')
var uminget = document.getElementById('umin')
var tsecget = document.getElementById('tsec')
var usecget = document.getElementById('usec')
var start = document.getElementById('start')

var thrs = 0;
var uhrs = 0;
var tmin = 0;
var umin = 0;
var tsec = 0;
var usec = 0;
var run = false;
var startInt;
var lapCount = 0 ;


function watchFun() {

    usec++
    usecget.innerHTML = usec

    if (usec > 9) {
        tsec++
        tsecget.innerHTML = tsec
        usec = 0
        usecget.innerHTML = 0

        if (tsec > 5) {
            umin++
            uminget.innerHTML = umin
            tsec = 0
            tsecget.innerHTML = 0
        }

    } else if (umin > 9) {
        tmin++
        tminget.innerHTML = tmin
        umin = 0
        uminget.innerHTML = 0

        if (tmin > 5) {
            uhrs++
            uhrsget.innerHTML = uhrs
            tmin = 0
            tminget.innerHTML = 0

            if (uhrs > 9) {
                thrs++
                thrsget.innerHTML = thrs
                uhrs = 0
                uhrsget.innerHTML = 0
            }

        }

    }


}


function startFun() {
    if (!run) {
        startInt = setInterval(watchFun, 1000)
        start.innerHTML = '<i class="fa-solid fa-pause"></i>'
        run = true;
    } else {
        start.innerHTML = '<i class="fa-solid fa-play"></i>'
        clearInterval(startInt)
        run = false;
    }

}


function resetFun() {
    clearInterval(startInt)
    start.innerHTML = '<i class="fa-solid fa-play"></i>'
    thrsget.innerHTML = 0 ;
    uhrsget.innerHTML = 0 ;
    tminget.innerHTML = 0 ;
    uminget.innerHTML = 0 ;
    tsecget.innerHTML = 0 ;
    usecget.innerHTML = 0 ;
    thrs = 0 ;
    uhrs = 0 ;
    tmin = 0 ;
    umin = 0 ;
    tsec = 0 ;
    usec = 0 ;
    run = false;
}



function lap(){
    alert("add on feature")
}


