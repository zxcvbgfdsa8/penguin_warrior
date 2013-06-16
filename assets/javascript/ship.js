var playerWidth = 96; 
var playerHeight = 96;
var PLAYER_MAX_VELOCITY	= 15.0;
var PLAYER_MIN_VELOCITY	= -10.0;
var PI = 3.14;
var imgShip = new Image();
imgShip.src = "assets/images/fighter.png";

function updatePlayer(player) {
	
    player.velocity += player.accel * window.timeScale;
    if (player.velocity > PLAYER_MAX_VELOCITY) player.velocity = PLAYER_MAX_VELOCITY;
    if (player.velocity < PLAYER_MIN_VELOCITY) player.velocity = PLAYER_MIN_VELOCITY;
	
    player.worldX += player.velocity * Math.cos(player.angle*PI/180.0) * window.timeScale;
    player.worldY += player.velocity * -Math.sin(player.angle*PI/180.0) * window.timeScale;
				
    /* Make sure the player doesn't slide off the edge of the world. */
    if (player.worldX < 0) player.worldX = 0;
    if (player.worldX >= 2000) player.worldX = 2000-1;
    if (player.worldY < 0) player.worldY = 0;
    if (player.worldY >= 2000) player.worldY = 2000-1;
}
function drawPlayer(player) {
    var angle;

    /* Calculate the player's new screen coordinates. */
    player.screenX = player.worldX - window.cameraX;
    player.screenY = player.worldY - window.cameraY;

    /* If the player isn't on the screen, don't draw anything. */
    if (player.screenX < -playerWidth/2 || player.screenX >= 640+playerWidth/2)
        return;

    if (player.screenY < -playerHeight/2 || player.screenY >= 480+playerHeight/2) {
        return;
    }

    /* Calculate drawing coordinates. */
    angle = player.angle;
    if (angle < 0) {
        angle += 360;
    }

    /* Draw the sprite. */
    var srcrect = {};
    srcrect.x = playerWidth * Math.floor(angle / 4);
    srcrect.y = 0;
    srcrect.w = playerWidth;
    srcrect.h = playerHeight;

    var destrect = {};
    destrect.x = player.screenX - playerWidth/2;
    destrect.y = player.screenY - playerHeight/2;
    destrect.w = playerWidth;
    destrect.h = playerHeight;			
    window.ctx.drawImage(imgShip, srcrect.x, srcrect.y, srcrect.w, srcrect.h, destrect.x, destrect.y, destrect.w, destrect.h);
}