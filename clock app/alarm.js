function navfun(link) {

    window.location.href = link

}


var time = document.getElementById('time')
var count = 0
var interval ;

function alarmfun(ele) {
    if(ele.checked){
        interval =  setInterval(function(){
            var parent = ele.parentNode.parentNode.children[0].children[0].value
            var now = new Date()
            var time = now.toTimeString().slice(0,5)
            console.log(time , parent)
            if(time == parent){
                count++
                alert("Alarm Bell")
                if(count == 20){
                    clearInterval(interval)
                }
            }
        },100)
    }else{
        clearInterval(interval)
    }
}