var playerWidth = 96; 
var playerHeight = 96;
var imgShip = new Image();
imgShip.src = "assets/images/fighter.png";
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