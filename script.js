const cvs=document.getElementById("can");
const context=cvs.getContext("2d");
var bgma=document.getElementById("bgm");
var fooda=document.getElementById("food");
var deada=document.getElementById("dead");
var scr=document.getElementById("sc");
console.log(cvs.offsetWidth);
var unit=Math.floor(cvs.offsetWidth/50);
if (cvs.offsetWidth!=1500) {
    unit=2*unit;
}
let d;
var score=0;
var newhead;
var snake=[];
snake[0]={
    x:0,
    y:0
}
var food={
    x:(cvs.offsetWidth==1500)?Math.floor(Math.random() * 50)*unit:Math.floor(Math.random() * 25)*unit,
    y:(cvs.offsetWidth==1500)?Math.floor(Math.random() * 20)*unit:Math.floor(Math.random() * 50)*unit
}
var stop=0;
var speed=500;
function bgmplay() {
    bgma.play();
    bgma.loop=true;
    right();
    if (stop==1) {
        location.reload();
    }

}
function up() {
    if (d!=3) {
       d=1; 
    }
     
   
}
function right() {
    if(d!=4){
    d=2;}
   
}
function down() {
    if(d!=1){
    d=3;}
    
}
function left() {
    if(d!=2){
    d=4;}
}
function col(head,snake) {
    console.log(snake);
    console.log(head);
    for (let index = 0; index < snake.length; index++) {
        if (snake[index].x==head.x) {
            return true;
        }
    }
 }

function draw() {
   
    context.fillStyle="black";
    context.fillRect(0,0,cvs.offsetWidth,cvs.offsetHeight);
    for(let i=0;i<snake.length;i++){
        
        context.fillStyle=(i==0)?"blue":"green";
        context.fillRect(snake[i].x,snake[i].y,unit,unit);
        context.strokeStyle="#FF0000";
        context.strokeRect(snake[i].x,snake[i].y,unit,unit);
    }
    context.fillStyle="yellow";
    context.fillRect(food.x,food.y,unit,unit);
    context.strokeStyle="red";
        context.strokeRect(food.x,food.y,unit,unit);
        if(snake[0].x<0||snake[0].x==cvs.offsetWidth||snake[0].y<0||snake[0].y==cvs.offsetHeight){
            deada.play();
            bgma.pause();
            stop=1;
            clearInterval(game);
        }
        var snakex=snake[0].x;
        var snakey=snake[0].y;
       
        //console.log(food.x);
        if ((snake[0].x==food.x)&&(snake[0].y==food.y)) {
            
                food.x=(cvs.offsetWidth==1500)?Math.floor(Math.random() * 50)*unit:Math.floor(Math.random() * 25)*unit;
                food.y=(cvs.offsetWidth==1500)?Math.floor(Math.random() * 20)*unit:Math.floor(Math.random() * 50)*unit;
                fooda.play();
                if(speed!=100){
                speed-=20;}
                score++;
           }
        else{
        snake.pop();
        }
        scr.innerHTML=score;
        //if(snake[0].x<0||snake[0].x==cvs.offsetWidth||snake[0].y<0||snake[0].y==600){
         //   deada.play();
        //    clearInterval(game);
        //}
    if (d==1) {
        snakey-=unit;
    }
    if (d==2) {
        snakex+=unit;
    }
    if (d==3) {
        snakey+=unit;
    }
    if (d==4) {
        snakex-=unit;
    }
    //console.log(snake.length);
     newhead={
        x:snakex,
        y:snakey
    }
    snake.unshift(newhead);
   
}

let game=setInterval(draw,speed);