
var display = document.getElementById("display")
var clockCircle = document.getElementById("clockCircle")

var second  = 0 ;

setInterval(function () {
    var now = new Date().toTimeString()
    var time = now.split(" ")[0]
    second = time.split(":")[2]

    if(second == 60){
        second = 0 ;
    }
    // console.log(second)
    clockCircle.style.background = `conic-gradient(blue ${(second/60)*360}deg,#fff 0deg)`;
    display.innerHTML = time
}, 10);



function navfun(link){

    window.location.href = link

}