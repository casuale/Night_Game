

////////Create canvas////////


var can = document.createElement("canvas"),
    con = can.getContext("2d"),

    mouseMoveX = 0,mouseMoveY = 0,
    mouseDownX = 0,mouseDownY = 0,
    touchDownX = 0,touchDownY = 0,
    touchMoveX = 0,touchMoveY = 0,
 
    windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,

    keyCode,
    up = false,
	  down = false,
	  left = false,
	  right = false,

    keys = {

      w:87,
      s:83,
      a:65,
      d:68,
      r:82,

      leftarrow:37,
      rightarrow:39,
      uparrow:38,
      downarrow:40,

      space:32,

    },
    body=document.querySelector("body");

function createCanvas(w,h,color){

    body.appendChild(can);

    body.style.background = "black";
    can.width=w;
    can.height=h;
    can.style.background=color;
    can.style.position="absolute";
    
    // if (windowWidth > 800) {
    // 	can.style.marginLeft = 364 +"px";
    // 	can.style.marginTop = (-8) +"px";
    // }
    // else 
    can.style.margin = (-8) +"px";
    
    setInterval(function(){con.clearRect(0,0,w,h)},1000/60)
}



//////////Collisions///////////



function objCollision(obj,obj2,f,p) {
    if(obj.x+obj.w>=obj2.x&&obj.x<=obj2.x+obj2.w
      &&obj.y+obj.h>=obj2.y&&obj.y<=obj2.y+obj2.h){
    if(f)f();
    else p();
  }
}
function rectCollision(x,y,w,h,dx,dy,dw,dh){
  if(x+w>=dx
    &&x<=dx+dw
    &&y+h>=dy
    &&y<=dy+dh){
     return true;
  }else {
     return false;
  }
}

function arcCollision(x,y,dx,dy,r){
  if(getDistance(x,y,dx,dy)<=r){
    return true;
  }else {
    return true;
  }
}

function lineCollision(x,y,dx,dy,x1,y1,w,h,func,plys){
  if(x1+w >= x && x1+w >= x 
    && y1+h >= y && y1+h >= y){
    if(func)func()
  }else {
    if(plys)plys()
  }
}


/////////Get distances/////////


function getDistance(x,y,dx,dy) {
  let xDistance = x - dx,
      yDistance = y - dy;

  return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}

function getDistanceX(x,dx) {
  let xDistance = x - dx;
  return Math.sqrt(Math.pow(xDistance,2));
}

function getDistanceY(y,dy) {
  let yDistance = y - dy;

  return Math.sqrt(Math.pow(yDistance,2));
}



///////////Draw////////////



function drawImage(x, y, w, h, src, a, type) {
  if (type) con.globalCompositeOperation = type;
  con.imageSmoothingEnabled=false;
  let img = new Image();
  img.src = src;
  let dx = x + w / 2,
      dy = y + h / 2;

  if (a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(dx, dy);
    con.rotate(a);
    con.translate(-dx, -dy);
  }
  con.drawImage(img,x, y, w, h);
  if(a)con.restore();
}
function drawSprite(xs, ys, ws, hs, x, y, w, h, src,a) {
  con.imageSmoothingEnabled=false;
  let img = new Image();
  img.src = src;
  let dx = x + w / 2,
      dy = y + h / 2;

  if (a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(dx, dy);
    con.rotate(a);
    con.translate(-dx, -dy);
  }
  con.drawImage(img,xs, ys, ws, hs, x, y, w, h);
  if(a)con.restore();
}
function SpriteAnimation(xs, ys, ws, hs, frames, speed, offsetX, offsetY) {
  this.xs = xs;
  this.ys = ys;
  this.frames = frames;

  let img = new Image();
  var time = 0;
 
  this.update = (x, y, w, h, src, a, type)=>{
    let dx = x + w / 2,
    dy = y + h / 2;
    img.src = src;
    con.imageSmoothingEnabled=false;
    time++;

  if (a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(dx, dy);
    con.rotate(a);
    con.translate(-dx, -dy);
  }
   if (type) con.globalCompositeOperation = type;
  con.drawImage(img,this.xs,this.ys,ws,hs,x, y, w, h);
  if(a)con.restore();
    if (time > speed&&offsetX) {
      this.xs+=ws;
      time = 0;
    }
    if (time > speed&&offsetY) {
      this.ys+=hs;
      time = 0;
    }
    if (this.xs >= this.frames*ws&&offsetX) {
      this.xs = xs;
    }
    if (this.ys >= this.frames*hs&&offsetY) {
      this.ys = ys;
    }
  }
}
function RepeatImage(x, y, w, h, src, a) {
  con.imageSmoothingEnabled=false;
  let img = new Image();
  img.src = src;
  let patt = con.createPattern(img, "repeat"),
      dx = x + w / 2,
      dy = y + h / 2;

  con.fillStyle = patt;
  if (a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(dx, dy);
    con.rotate(a);
    con.translate(-dx, -dy);
  }
  con.fillRect(x, y, w, h);
  if(a)con.restore();
}
function RepeatSpriteImage(dx, dy, x, y, w, h, src) {
  con.imageSmoothingEnabled=false;
  let img = new Image();
  img.src = src;
  var
  patt = con.createPattern(img, "repeat");
  con.fillStyle = patt;
  con.fillRect(x, y, w, h);
}
function line(x,y,dx,dy,s,color){
  con.strokeStyle=color;
  con.beginPath();
  con.lineWidth=s;
  con.moveTo(x,y);
  con.lineTo(dx,dy);
  con.stroke(); 
  con.closePath();
}
function strokeArc(x,y,r,color,w){
  if (w);
  else w=1;
  con.strokeStyle=color;
  con.beginPath();
  con.lineWidth=w;
  con.arc(x,y,r,0,Math.PI*2);
  con.stroke();
}
function fillArc(x,y,r,color){
  con.fillStyle=color;
  con.beginPath();
  con.arc(x,y,r,0,Math.PI*2);
  con.fill();
}
function fillRect(x,y,w,h,color,a){
   let dfx = x +  w / 2,
      dfy = y + h / 2;
  if(a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(dfx, dfy);
    con.rotate(a);
    con.translate(-dfx, -dfy);
  }
 con.fillStyle=color;
 con.beginPath();
 con.fillRect(x,y,w,h);
 con.fill();
 if(a){
    con.restore();
  }
}
function strokeRect(x,y,w,h,color,s,a){ 
  let dfx = x +  w / 2,
      dfy = y + h / 2;
  if(a) {
    a = a * (Math.PI / 100);
    con.save();
    con.translate(x, y);
    con.rotate(a);
    con.translate(-x, -y);
  }
  if (s);
  else s=1;
  con.strokeStyle=color;
  con.beginPath();
  con.lineWidth=s;
  con.strokeRect(x,y,w,h);
  con.stroke();
  if(a){
    con.restore();
  }
}
function fillText(text,color,font,x,y) {
  con.fillStyle=color;
  con.font=font;
  con.fillText(text,x,y);
  con.fill();
}
function strokeText(text,color,font,x,y) {
  con.strokeStyle=color;
  con.font=font;
  con.strokeText(text,x,y);
  con.stroke();
}

function block(x, y, w, h, xp, yp, wp, hp) {
	fillRect(x, y, w, h, "gray");

	rectCollision(x, y, w, h,
	 			xp, yp, wp, hp, ()=>{
		if (x>xp) right = false;
		if (x<xp) left = false;

		if (y<yp) up = false;
		if (y>yp) down = false;
		});
}

function keyPressed(fun) {document.addEventListener("keydown",()=>{fun()})}
function keyRelesed(fun) {document.addEventListener("keyup",()=>{fun()})}

function touchstart(fun) {document.addEventListener("touchstart",()=>{fun()})}
function touchend(fun) {document.addEventListener("touchend",()=>{fun()})}
function touchmove(fun) {document.addEventListener("touchmove",()=>{fun()})}


function mouseup(fun) {document.addEventListener("mouseup",()=>{fun()})}
function mousedown(fun) {document.addEventListener("mousedown",()=>{fun()})}
function mousemove(fun) {document.addEventListener("mousemove",()=>{fun()})}

document.addEventListener("keydown",(e)=>{keyCode = e.keyCode});

document.addEventListener("mousemove",(e)=>{
  mouseMoveX=e.clientX;
  mouseMoveY=e.clientY;
});

document.addEventListener("touchstart",(e)=>{
  touchDownX=e.clientX;
  touchDownY=e.clientY;
});

document.addEventListener("touchmove",(e)=>{
  let touch = e.targetTouches[0];
  touchMoveX=touch.pageX;
  touchMoveY=touch.pageY;
});

document.addEventListener("mouseup",(e)=>{
  mouseDownX=e.clientX;
  mouseDownY=e.clientY;
});

keyPressed(()=>{
	if (keyCode == keys.w && keyCode == keys.d)
	 right = true, up = true;

	if (keyCode == keys.w && keyCode == keys.a)
	 left = true, up = true;

	if (keyCode == keys.w || keyCode == keys.uparrow) up = true;
	if (keyCode == keys.s || keyCode == keys.downarrow) down = true;

	if (keyCode == keys.d) right = true, left = false;
	if (keyCode == keys.a) left = true, right = false;

});
keyRelesed(()=>{
	down = false;
	up = false;
	right = false;
	left = false;
});

function anglefrommouse(x, y) {
	//top down shooter mechanics
	return Math.atan(mouseMoveY-y,mouseMoveX-x) * 36;
}
function touchController() {
  let touchControllerX1 = 32,
    touchControllerY1 = ch-128,
    touchControllerX2 = 128,
    touchControllerY2 = ch-128;
  drawSprite(0, 0, 17, 16, touchControllerX1, touchControllerY1, 64, 64, "controllersprite.png");
  drawSprite(17, 0, 17, 16, touchControllerX2, touchControllerY2, 64, 64, "controllersprite.png");

  touchstart(()=>{
    if (rectCollision(touchControllerX1, touchControllerY1, 64, 64,
     mouseDownX, mouseDownY, 1, 1)) left = true;
    else left = false,space = true;
    if (rectCollision(touchControllerX2, touchControllerY2, 64, 64,
     mouseDownX, mouseDownY, 1, 1)) right = true;
    else right = false,space = true;
  });
  touchend(()=>{
    left = false;
    right = false;
    space = false;
  });
}