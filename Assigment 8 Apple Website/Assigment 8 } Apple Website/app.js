let thumbData = [
    {
        pre:"./images/thumb7.jpg",
        img:"./images/thumb1.jpg",
        nex:"./images/thumb2.jpg",
    },
    {
        pre:"./images/thumb1.jpg",
        img:"./images/thumb2.jpg",
        nex:"./images/thumb3.jpg",
    },
    {
        pre:"./images/thumb2.jpg",
        img:"./images/thumb3.jpg",
        nex:"./images/thumb4.jpg",
    },
    {
        pre:"./images/thumb3.jpg",
        img:"./images/thumb4.jpg",
        nex:"./images/thumb5.jpg",
    },
    {
        pre:"./images/thumb4.jpg",
        img:"./images/thumb5.jpg",
        nex:"./images/thumb6.jpg",
    },
    {
        pre:"./images/thumb5.jpg",
        img:"./images/thumb6.jpg",
        nex:"./images/thumb1.jpg",
    },
    {
        img:"./images/thumb7.jpg"
    }
]

// get 
let thumbBox = document.getElementById('thumbBox')


let thumbPoint = 0;


let setTime =() => setTimeout(() => {
    thumbBox.innerHTML = `<div class="thumbCom">
    <img src=${thumbData[thumbPoint].pre} alt="">
    </div>
    <div class="thumbImg">
    <img src=${thumbData[thumbPoint].img} alt="">
    </div>
    <div class="thumbCom">
    <img src=${thumbData[thumbPoint].nex} alt="">
    </div>`;    
    thumbPoint++
    if(thumbPoint == 6 ){
        thumbPoint = 0;
    }
    setTime()
}, 5000);
setTime()