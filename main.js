let cw = windowWidth, ch = windowHeight, background = "black";
window.onload = ()=>{createCanvas(cw, ch, background)}

let x = cw/2 - 16, y = 300,
	xs = 0, xs2 = cw,
	xe = 0,
	xm = cw, xm2 = cw,

	cameraY = 0,

	gravity = 0, speed = 0.3,
	bspeed = 8,
	bulletSpeed = 12,
	blockSpeed = 8, enemySpeed = 8,

 	score = 0, maxScore = score,
 	health = 100, hcolor = "white",
 	loading = 0,

 	onground = false, space = false,
	gameover = false, start = false,
	cubeBosseWinned = false, mbBosseWinned = false,
	cubeBosseSpawned = false, mbBosseSpawned = false,
	giantBosseSpawned = false, giantBosseWinned = false,
	pause = false,
 	blocks = [], enemy = [], bullet = [],
 	hearts = [], mountinsType = ["goraZ", "gora", "lugGora"],

 	ran = Math.random()*8+5,
 	enemysNum = Math.floor(Math.random()*5+1),
 	bulletsNum = Math.floor(Math.random()*3+1),
 	blocksNum = Math.floor(Math.random()*9+1),

 	player = new SpriteAnimation(0, 0, 15, 16, 2, 16, true),
 	cube = new Bosses("CubeBosse"),
 	misterbullet = new Bosses("MisterBullet"),
 	giant = new Bosses("Giant"),
 	jump = new Audio("jump.wav"),
 	music = new Audio("music.wav");

window.onresize = ()=>{
	location.reload();
}
function update() {
	events1();
	requestAnimationFrame(update);
}

function draw() {
	drawImage(xm, 410 - cameraY-8, 2048, 80, "paralaxBackground1.png");
	drawImage(xm2, 400 - cameraY, 2048, 80, "paralaxBackground2.png");
	
	drawSprite(xe, 0, 16, 16, xs2, 64 - cameraY, 64, 64, "eclipse.png");

	player.update(x, y- cameraY, 32, 48, "player.png", gravity);

	//drawImage(x, y - cameraY, 32, 48, "player.gif", gravity);

	strokeRect(0, 464 - cameraY, cw,ch, "white", 5);
	fillRect(0, 464 - cameraY, cw,ch, "black");

	//strokeRect(x, y - cameraY, 32, 48, "red", 2);
}
function events1() {
	if (cw > 665) {
		bspeed = 8;
		bulletSpeed = 12;
		blockSpeed = 8;
		enemySpeed = 8;
	}
	else {
		bspeed = 6;
		bulletSpeed = 10;
		blockSpeed = 6;
		enemySpeed = 6;
	}
	//music.play();
	drawImage(xs, (-228)- cameraY+2, cw, ch+128, "stars.png");
	drawImage(xs2, (-228)- cameraY+2, cw, ch+128, "stars2.png");
	draw();	

	if (rectCollision(mouseDownX, mouseDownY, 1, 1, cw/2.2, ch/2.5, 64, 64)) 
	start = true;
	else {
		if(!start){
		fillText("NIGHT", "#909090", "100px Small Fonts", cw/3.5, ch/3.5);
		drawImage(cw/2.2, ch/2.5, 64, 64, "play.png");
		}}
	if (pause) music.pause(), jump.pause();
	else {
		if (xs2+cw<0) xs2 = cw, xe+=16;
		if (xs+cw<0) xs = cw;
		
		if (xm+2048<0) xm = cw;
		if (xm2+2048<0) xm2 = cw;

		xs-=bspeed;
		xs2-=bspeed;

		xm -= bspeed-0.5;
		xm2 -= bspeed+0.5;

		gravity -= speed;
		y -= gravity; 
		cameraY -= gravity;
	
		if (onground) {
			gravity = 0;
			speed = 0;
			animation = 0;
		if (space) {
			jump.play();
			onground = false;
			gravity = 6;
			speed = 0.2;
			}
		}
	
		if (y - cameraY >= 416 - cameraY) onground = true;
		}
	if(start){
		if (gameover) {
			fillText("Game Over...", "white", "40px small-fonts",
			 cw/3, ch/3);
			fillText("Max score: "+maxScore, "white", "30px small-fonts",
			 cw/3, ch/2.5);
			fillText("Press R||К key for restart", "white", "20px small-fonts",
			 cw/3, ch/1.5);
		}
		else events2();
		if (gameover&&keyCode == keys.r||gameover&&space){
		 	gameover = false;
		 	onground = false;
		 	space = false;
			gameover = false;
			start = false;
			cubeBosseWinned = false;
			mbBosseWinned = false;
			pause = false;

		 	x = cw/2 - 16,
		 	y = 300;
			xs = 0;
			xs2 = cw;
			xe = 0;
			xm = cw;
			xm2 = cw;

			cameraY = 0;

			gravity = 0;
			speed = 0.3;
			bspeed = 8;
			bulletSpeed = 12;
			blockSpeed = 8;
			enemySpeed = 8;

		 	score = 0; maxScore = score;
		 	health = 100; hcolor = "white";
		 	loading = 0;

		 	
		 	blocks = []; enemy = []; bullet = [];
		 	hearts = []; mountinsType = ["goraZ", "gora", "lugGora"];

		 	ran = Math.random()*8+5;
		 	enemysNum = Math.floor(Math.random()*5+1);
		 	bulletsNum = Math.floor(Math.random()*3+1);
		 	blocksNum = Math.floor(Math.random()*9+1);

		 	player = new SpriteAnimation(0, 0, 15, 16, 2, 16, true);
		 	cube = new Bosses("CubeBosse");
		 	misterbullet = new Bosses("MisterBullet");
		 	jump = new Audio("jump.wav");
		 	music = new Audio("music.wav");
		}
	if (loading >= cw / 2.1) ;
	else {
		fillRect(0, 0, cw, ch, "black");
		fillRect(cw / 4.2, ch/2, loading, 64, "white");
		loading += 10;
		}
	}

}
function events2() {
	spawn();

	strokeRect(0, 464 - cameraY, cw,ch, "white", 5);
	fillRect(0, 464 - cameraY, cw,ch, "black");

	if (rectCollision(cw-48, 16, 32, 32, mouseDownX, mouseDownY, 1, 1)) pause = true;
	else pause = false;
	
	if (pause) drawImage(cw/2.3, ch/2.3, 128, 128, "play.png");
	else {
		if (health<1||x<-16)hcolor = "rgba(0,0,0,0)", gameover = true;
		else gameover = false, score++;

		if (x<0) left = false;
		else if (x+32>cw) right = false;
		
		if (xe>=96) xe = 0;

		if (right) x+=2;
		if (left) x-=3;

		if (score == 0);
		else{ 
			if(maxScore<score)maxScore = score;
			else maxScore = maxScore
		}

}

	strokeRect(32, 32, 100, 16, "white", 2);
	fillRect(32, 32, health, 16, hcolor);
	fillText("Score: " + score, "white", "20px small-fonts", 32, 64);
	fillText("Max score: " + maxScore, "white", "20px small-fonts", 32, 80);

	drawImage(cw-48, 16, 32, 32, "pause.png");
}
function spawn() {

	for (var i = 0; i < 1; i++) {
		hearts.push(new Heart(cw, 400));
		hearts[i].update();
	}

	if (!giantBosseSpawned)
		for (var i = 0; i < blocksNum; i++) {
		blocks.push(new Blocks(
		Math.random()*cw,
		Math.random()*300+128));
		blocks[i].update();
	}
	if (score > 4000) cube.update();
	if (score > 14000&&cubeBosseWinned) misterbullet.update();
	if (score > 20000&& mbBosseWinned ) giant.update();
	
	if (cubeBosseSpawned||mbBosseSpawned||giantBosseSpawned);
	else {
	if (score > 1000) {
 		for (var i = 0; i < enemysNum; i++) {
			enemy.push(new Enemy(Math.random()*cw+512,  Math.random()*400+128));
			enemy[i].update();
		}
	}
	 if (score > 500) {
	 	for (var i = 0; i < bulletsNum; i++) {
			bullet.push(new Bullet(cw+512,  Math.random()*400+128));
			bullet[i].update();
		}}
	}
}
keyPressed(()=>{
	if (keyCode == keys.space) space = true;
	if (keyCode == keys.w) onground = true;
	});
keyRelesed(()=>{space = false});
update();