const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
var fps = 1000 / 60; //Gives you the math for 60 frames per seccond
var timer = setInterval(game, fps);
var x = 50;
var y = 50;
var moveX = 2;
var moveY = 2;
var y = canvas.width / 2 - 50; 
var x = canvas.height / 2 - 50;
var moveX = setRandomDirection();
var moveY = setRandomDirection();
var color = "rgb(255,0,0)";

function game() {
    //we clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 50);

    //we update its values
    //y += 2;
    x += moveX;
    y += moveY;


    //logix fpr tje object
    if (x > canvas.width - 50) {
        moveX = -2;
        color = setRandomColor();

    }
    if (x < 0) {
        moveX = 2
        color = setRandomColor();
    }
    
    //bottom boundry
    if (y > canvas.height - 50){
        moveY = -2;
        color = setRandomColor();
    }
    //top boundry
    if (y < 0) {
        moveY = 2;
        color = setRandomColor();
    }
}
    function setRandomColor(){
        return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }

    function setRandomDirection(){
        var Dir = Math.random();
        if(Dir> 0.5){
            return 2;
        }else{
            return -2;
        }
    }
