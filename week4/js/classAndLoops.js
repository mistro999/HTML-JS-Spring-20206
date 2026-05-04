var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var interval = 1000 / 60;
setInterval(game, 1000 / 60);

var acceleration = 0.6;
var friction = 0.88;
var maxspeed = 0.0;
var gameobject = function () {
    var ball = {
        x: randomnumber(115, canvas.width - 115),
        y: randomnumber(15, canvas.height - 15),
        moveX: setRandomDirection(),
        moveY: setRandomDirection(),
        velocityX: 0,
        velocityY: 0,
        color: `rgb(${randomnumber(0, 255)},${randomnumber(0, 255)},${randomnumber(0, 255)})`,
        radius: 15,
        width: 15,
        height: 15,
        drawBall: function () {
            //draw objects
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();

        },
        drawSqaure: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    return ball
}


function randomnumber(low, heigh) {
    return Math.random() * (heigh - low) + low;
}

function setRandomDirection() {
    var Dir = Math.random();
    if (Dir > 0.5) {
        return 2;
    } else {
        return -2;
    }
}

var myball = gameobject();
var player = gameobject();
player.x = canvas.width / 2;
player.y = canvas.height / 2;
player.width = 30;
player.height = 30;
player.color = "purple"
player.drawSqaure();

var myballs = gameobject();
var myballs = [];
var numberOfDots = 10;
for (var i = 0; i < numberOfDots; i++) {
    myballs[i] = gameobject();
    myballs[i].moveY += 10;
    myballs[i].y = myballs[i].y;

}
var bullets = [];
var canShoot = true;


function shoot() {
    bullet = gameobject();
    bullet.y = player.y;
    bullet.x = player.x + player.width/2 - 4;
    bullet.width = 8;
    bullet.height = 10;
    bullet.color = "green";
    bullet.velocityY = -10;
    canShoot = false;
    bullets.push(bullet);
    setTimeout(function () { canShoot = true }, 500);

}

function game() {
    //clear game screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (w == true || up == true) {
        //player.y -= 2;
        player.velocityY -= acceleration;
    }
    if (a == true || left == true) {
        //player.x -=  2;
        player.velocityX -= acceleration;
    }
    if (s == true || down == true) {
        //player.y += 2;
        player.velocityY += acceleration;
    }
    if (d == true || right == true) {
        // player.x += 2;
        player.velocityX += acceleration;
    }
    if (space == true && canShoot) {
        shoot();
    }


    player.velocityY *= friction;
    player.velocityX *= friction;


    player.x += player.velocityX
    player.y += player.velocityY

    player.drawSqaure();

    //myball.drawBall();



    for (var i = 0; i < myballs.length; i++) {
        myballs[i].drawBall();
        if (myballs[i].x > canvas.width - myballs[i].radius - 100) {

            myballs[i].moveX *= -1;
            //myballs[i].color = `rgb(${randomnumber(0,255)},${randomnumber(0,255)},${randomnumber(0,255)})`; 
            myballs[i].y += myballs[i].radius * 3;

        }
        if (myballs[i].y > canvas.height + myballs[i].radius) {
            // myballs[i].moveY *= -1;
            //  myballs[i].color = `rgb(${randomnumber(0,255)},${randomnumber(0,255)},${randomnumber(0,255)})`;
            //myballs.y+=myballs[i].radius*3;
            myballs[i].y = 0;//-randomnumber(0,canvas.height);
        }
        if (myballs[i].x < myballs[i].radius + 100) {
            myballs[i].moveX *= -1;
            myballs[i].color = `rgb(${randomnumber(0, 255)},${randomnumber(0, 255)},${randomnumber(0, 255)})`;
            myballs[i].y += myballs[i].radius * 3;
        }
        //if(myballs[i].y < myballs[i].radius){
        //myballs[i].moveY *= -1;
        //myballs[i].color = `rgb(${randomnumber(0,255)},${randomnumber(0,255)},${randomnumber(0,255)})`;
        //myballs.y+=myballs[i].radius*3;
        //}
        myballs[i].x += myballs[i].moveX;
       // myballs[i].y += myballs[i].moveY;
    }
    for (var b = bullets.length - 1; b >= 0; b--) {
        bullets[b].x += bullets[b].velocityX;
        bullets[b].y += bullets[b].velocityY;
        if (bullets[b].y + bullets[b].height < 0) {
            bullets.splice(b, 1);
        }
        for(var e = 0; e<myballs.length; e--){
            console.log(bullets[b].x , myballs[e].x);
            var distX = bullets[b].x - myballs[e].x;
            var distY = bullets[b].y - myballs[e].y;
            var dist = Math.sqrt((distX*distX) + (distY*distY));
            // if(dist < myballs[e].radius){
            //     myballs.splice(e, 1);
        

            // }
        }
        bullets[b].drawSqaure();
    }


}
