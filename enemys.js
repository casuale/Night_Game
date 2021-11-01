
function Blocks(x2, y2) {
	this.x = x2;
	this.y = y2;

	this.update = ()=>{
		
		if (pause) ;
		else
		{
		 this.x  -= blockSpeed;
		
		if (this.x<-128)blocksNum = Math.floor(Math.random()*4+1),
		 	this.x=cw+512,	
			this.y = Math.random()*300+128;
		}
		if(rectCollision(x, y - cameraY, 32, 32,
			this.x, this.y- cameraY, 32, 32)){
			x-=ran;
			if(y - cameraY + 16 < this.y - cameraY) onground=true;
		}
		drawImage(this.x, this.y - cameraY, 32, 32, "block.png");
	}
}
function Bullet(x2, y2) {
	this.x = x2;
	this.y = y2;
	let bgravity = 0, spd = 5;

	this.update = ()=>{
		drawImage(this.x, this.y - cameraY, 32, 32, "bullet.png", this.y/bgravity);
		
		if (pause) ;
		else this.x -= bulletSpeed;

	if (this.x<0) this.x = cw + 128,
	 	this.y = Math.random()*464,
	 	bulletsNum = Math.floor(Math.random()*3+1);

		if (this.x<0) this.x=cw+512,
			this.y = Math.random()*300+128;
		if (this.y- cameraY>600- cameraY) {
			spd = 0;
			bgravity = 0;
			this.y = Math.random()*464, this.x = cw + 512;
		}
		if(rectCollision(x, y - cameraY, 32, 32,
			this.x, this.y - cameraY, 32, 32)){
			if(health<1);
			else health-=5;
	}
	}
}

function Enemy(x2, y2) {
	this.x = x2;
	this.y = y2;
	let gravity = 6,
		speed = 0.2,
		onground = false,
		enemy = new SpriteAnimation(0, 0, 16, 16, 4, 16, true);

	this.update = ()=>{
 		
 		if (pause) ;
		else {
		this.x -= enemySpeed;
		gravity -= speed;
		this.y -= gravity; 

		if (this.y - cameraY >= 432- cameraY) onground = true;
		if (onground) {
			gravity = 0;
			speed = 0;
			onground = false;
			gravity = 12;
			speed = 0.2;
		}
		if (this.x<-128)
			ran = Math.random()*5+2,
			enemysNum = Math.floor(Math.random()*5+1),
			this.y = (Math.random()*400+128) - cameraY,
			this.x=cw*3;
		}
		if(rectCollision(x, y - cameraY, 32, 32, this.x, this.y - cameraY, 32, 32)){
			if (y - cameraY < this.y-  cameraY) onground = true;
			x-=ran+2;
			if(health<1);
			else health -=1;
		}
		enemy.update(this.x, this.y - cameraY, 32, 32, "enemy.png", this.y/gravity);
	}
}

function Heart(x2, y2) {
	this.x = x2;
	this.y = y2;

	this.update = ()=>{
		if (pause) ;
		else this.x -= bspeed;

		if (this.x<-32)
			this.x = Math.random()*(cw+128)+cw,
			this.y = Math.random()*(y-128 - cameraY)+(y - cameraY);

		if (rectCollision(this.x, this.y, 32, 32, x, y, 32, 48)){
		  if (health<=100) health+=5;
		}
		drawImage(this.x, this.y - cameraY, 32, 32, "heart.png");
	}
}

function Bosses(type) {
	let sspeed = 5,
		cubeBosse = {
			x: -128,
			y: 200,
			w: 64,
			h: 64,
			moveX: 3, 
			moveY: 0,
			gravity: 6,
			speed: 0.2,
			onground: false,
			cubeBosseHealth: 300,
			cubeBosseSprite: new SpriteAnimation(0, 0, 16, 16, 4, 16, true),
		},
		misterBullet = {
			x: cw,
			y: 256,
			w: 80,
			h: 80,
			moveX: 3, 
			moveY: 0,
			bullet1: {y: y},
			bullet2: {y: y},
			misterBulletHealth: 300,
			misterBulletSprite: new SpriteAnimation(0, 0, 16, 16, 4, 16, true),
		},
		misterBullet2 = {
			x: cw-90,
			y: 256,
			w: 80,
			h: 80,
			moveX: 3, 
			moveY: 0,
			bullet1: {y: y},
			bullet2: {y: y},
			misterBulletSprite: new SpriteAnimation(0, 0, 16, 16, 4, 16, true),
		},
		giant = {
			x: cw-128,
			y: 2000,
			w: 128,
			h: 128,
			bullet: {
				x: x,
				y: y,
			},
			gravity: 6,
			speed: 0.2,
			onground: false,
			health: 200,
			sprite: new SpriteAnimation(0, 0, 16, 16, sspeed, 10, true),
		},
		bossePlayerDetected = false;

	this.update = ()=>{
	if (type == "CubeBosse") {
		if (cubeBosse.cubeBosseHealth <= 0) cubeBosseWinned = true, cubeBosseSpawned = false;
		else {
			cubeBosseSpawned = true;
			 cubeBosseWinned = false;
			cubeBosse.cubeBosseSprite.update(cubeBosse.x, cubeBosse.y - cameraY, cubeBosse.w, cubeBosse.h, "enemy.png",cubeBosse.y/cubeBosse.gravity);
			
			strokeRect(cw/3, 64, 300, 24, "white");
			fillRect(cw/3, 64, cubeBosse.cubeBosseHealth, 24, "white");
			
			if (pause) ;
			else
			cubeBosse.x += cubeBosse.moveX,
			cubeBosse.gravity -= cubeBosse.speed,
			cubeBosse.y -= cubeBosse.gravity; 

			if (cubeBosse.x+cubeBosse.w>=cw) cubeBosse.moveX = -cubeBosse.moveX;
			if (cubeBosse.x<=0) cubeBosse.moveX = 3;

			if (cubeBosse.y - cameraY >= 400- cameraY) cubeBosse.onground = true;
			if (cubeBosse.onground) {
				cubeBosse.gravity = 0;
				cubeBosse.speed = 0;
				cubeBosse.onground = false;
				cubeBosse.gravity = 8;
				cubeBosse.speed = 0.1;
			}
			if (rectCollision(cubeBosse.x, cubeBosse.y, cubeBosse.w, cubeBosse.h, x, y, 32, 48)) {
				if (cubeBosse.y+32<y) health -= 5;
				if (cubeBosse.y>y) onground = true, cubeBosse.cubeBosseHealth -= 2.5;
			}
		}}
	else if (type == "MisterBullet") {
		if (misterBullet.misterBulletHealth <= 0) mbBosseWinned = true,mbBosseSpawned = false;
		else {
			mbBosseSpawned = true;
			strokeRect(cw/3, 64, 300, 24, "white");
			fillRect(cw/3, 64, misterBullet.misterBulletHealth, 24, "white");
			
			if (pause) ;
			else misterBullet.x -= misterBullet.moveX,
			misterBullet2.x -= misterBullet2.moveX;

			if (misterBullet.x>=cw+64) 
				misterBullet.moveX = -misterBullet.moveX;
			if (misterBullet.x<=0) misterBullet.moveX = -3;

			if (misterBullet.y<y&&misterBullet.x-64<x+32
				&&misterBullet.x+misterBullet.w+64>x) {
				bossePlayerDetected = true;
			}
			if (bossePlayerDetected) {
				drawImage(misterBullet.x+48, misterBullet.bullet1.y- cameraY, 32, 32, "bullet.png", 150);
				drawImage(misterBullet.x, misterBullet.bullet2.y- cameraY, 32, 32, "bullet.png", 150);
				misterBullet.bullet1.y+=5;
				misterBullet.bullet2.y+=5;
			}
			if (rectCollision(misterBullet.x, misterBullet.bullet1.y - cameraY, 32, 32, x, y, 32, 48)||
				rectCollision(misterBullet.x, misterBullet.bullet2.y - cameraY, 32, 32, x, y, 32, 48)) {
				health -= 5;
				misterBullet.bullet1.y = misterBullet.bullet2.y = 256;
				bossePlayerDetected = false;
			}
			if (misterBullet.bullet1.y+32 - cameraY>= ch) misterBullet.bullet1.y = misterBullet.y;
			if (misterBullet.bullet2.y+32 - cameraY>= ch) misterBullet.bullet2.y = misterBullet.y;

			if (rectCollision(misterBullet.x, misterBullet.y, misterBullet.w, misterBullet.h, x, y, 32, 48)) {
				if (misterBullet.y>y) onground = true, misterBullet.misterBulletHealth -= 2.5;
			}

			misterBullet.misterBulletSprite.update(misterBullet.x, misterBullet.y - cameraY, misterBullet.w, misterBullet.h, "enemy.png", misterBullet.moveX);
			if (misterBullet2.x>=cw+64) 
				misterBullet2.moveX = -misterBullet2.moveX;
			if (misterBullet2.x<=0) misterBullet2.moveX = -3;

			if (misterBullet2.y<y&&misterBullet2.x-64<x+32
				&&misterBullet2.x+misterBullet2.w+64>x) {
				bossePlayerDetected = true;
			}
			if (bossePlayerDetected) {
				drawImage(misterBullet2.x+48, misterBullet2.bullet1.y- cameraY, 32, 32, "bullet.png", 150);
				drawImage(misterBullet2.x, misterBullet2.bullet2.y- cameraY, 32, 32, "bullet.png", 150);
				misterBullet2.bullet1.y+=5;
				misterBullet2.bullet2.y+=5;
			}
			if (rectCollision(misterBullet2.x, misterBullet2.bullet1.y - cameraY, 32, 32, x, y, 32, 48)||
				rectCollision(misterBullet2.x, misterBullet2.bullet2.y - cameraY, 32, 32, x, y, 32, 48)) {
				health -= 10;
				misterBullet2.bullet1.y = misterBullet2.bullet2.y = 256;
				bossePlayerDetected = false;
			}
			if (misterBullet2.bullet1.y+32 - cameraY>= ch) misterBullet2.bullet1.y = misterBullet2.y;
			if (misterBullet2.bullet2.y+32 - cameraY>= ch) misterBullet2.bullet2.y = misterBullet2.y;
			if (rectCollision(misterBullet2.x, misterBullet2.y, misterBullet2.w, misterBullet2.h, x, y, 32, 48)) {
				if (misterBullet2.y>y) onground = true;
				 misterBullet.misterBulletHealth -= 1;
			}
			misterBullet2.misterBulletSprite.update(misterBullet2.x, misterBullet2.y - cameraY, misterBullet2.w, misterBullet2.h, "enemy.png", misterBullet2.moveX);
		}
	}
	else if (type == "Giant") {
		if (giant.health <= 0)
			giantBosseWinned = true,
			giantBosseSpawned = false;
		else {
			giantBosseSpawned = true;
			
			drawImage(giant.bullet.x, giant.bullet.y - cameraY, 64, 64, "bullet.png");	
			giant.sprite.update(giant.x, giant.y  - cameraY, giant.w, giant.h, "giantAgro.png");
			
			if (pause) ;
			else {
				giant.gravity -= giant.speed,
				giant.y -= giant.gravity;
				giant.x += 6;
				giant.bullet.x -= 64;
			}
			if (giant.bullet.x <= -64)
				giant.bullet.x = giant.x,
				giant.bullet.y = giant.y;

			if (giant.y - cameraY >= 332- cameraY)
				 giant.onground = true;
			if (giant.onground) {
				space = true;
				
				giant.gravity = 0;
				giant.speed = 0;
				giant.onground = false;
				giant.gravity = 10;
				giant.speed = 0.1;

				cameraY = Math.random()*50+(-50);
			}
			else space = false;
 	
			if (giant.x > cw) giant.x = 0;

			strokeRect(cw/3, 24, 200, 28, "white");
			fillRect(cw/3, 24, giant.health, 28, "white");
			
			if (rectCollision(giant.x, giant.y - cameraY, giant.w, giant.h, x, y, 32, 48)) {
				if (giant.y<y) health -= 2.5;
				giant.health -= 1;
			}
			if (rectCollision(giant.bullet.x, giant.bullet.y - cameraY, 64, 64, x, y, 32, 48)) {
				health -= 1;
			}

	}}
}}