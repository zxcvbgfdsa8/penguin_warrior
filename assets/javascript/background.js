var frontTiles = [];
var backTiles = [];
var parallaxGridWidth = 100;
var parallaxGridHeight = 100;
var parallaxBackFactor = 4;
var parallaxFrontFactor = 2;
var tileWidth = 64;
var tileHeight = 64;

var imgBackTiles = new Image();
var imgFrontTiles = new Image();

var numStarTiles = 4;

function initBackground() {  
    imgBackTiles.src = "assets/images/back-stars.png";
    imgFrontTiles.src = "assets/images/front-stars.png";
    for (var x = 0; x < parallaxGridWidth; x++) {
        frontTiles[x] = [];
        backTiles[x] = [];
        for (var y = 0; y < parallaxGridHeight; y++) {
            frontTiles[x][y] = Math.floor(Math.random()*numStarTiles) % numStarTiles;
            backTiles[x][y] = Math.floor(Math.random()*numStarTiles) % numStarTiles;
        }
    }
}
function drawBackground() {
    var drawX, drawY;
    var startDrawX, startDrawY;
    var tileX, tileY;
    var startTileX, startTileY;
    
    startTileX = (Math.floor(Math.floor(window.cameraX / parallaxBackFactor) / tileWidth)) % parallaxGridWidth;
    startTileY = (Math.floor(Math.floor(window.cameraY / parallaxBackFactor) / tileHeight)) % parallaxGridHeight;
	
    startDrawX = -(Math.floor(window.cameraX/parallaxBackFactor) % tileWidth);
    startDrawY = -(Math.floor(window.cameraY/parallaxBackFactor) % tileHeight);
    /* Use nested loops to scan down the screen, drawing rows of tiles. */
    tileY = startTileY;
    drawY = startDrawY;
    while (drawY < 480) {
	tileX = startTileX;
	drawX = startDrawX;
	while (drawX < 640) {
            // draw image to screen drawImage(imageObject, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
            var srcrect = {};
	    srcrect.x = tileWidth * backTiles[tileX][tileY];
	    srcrect.y = 0;
	    srcrect.w = tileWidth;
	    srcrect.h = tileHeight;
            
            var destrect = {};
	    destrect.x = drawX;
	    destrect.y = drawY;
	    destrect.w = tileWidth;
	    destrect.h = tileHeight;			
	    window.ctx.drawImage(imgBackTiles, srcrect.x, srcrect.y, srcrect.w, srcrect.h, destrect.x, destrect.y, destrect.w, destrect.h);
                        
	    tileX++;	
	    tileX %= parallaxGridWidth;
	    drawX += tileWidth;
	}
	tileY++;
	tileY %= parallaxGridHeight;
	drawY += tileHeight;
    }
}
function drawParallax() {
    var drawX, drawY;
    var startDrawX, startDrawY;
    var tileX, tileY;
    var startTileX, startTileY;
    
    startTileX = (Math.floor(Math.floor(window.cameraX / parallaxFrontFactor) / tileWidth)) % parallaxGridWidth;
    startTileY = (Math.floor(Math.floor(window.cameraY / parallaxFrontFactor) / tileHeight)) % parallaxGridHeight;
	
    startDrawX = -(Math.floor(window.cameraX/parallaxFrontFactor) % tileWidth);
    startDrawY = -(Math.floor(window.cameraY/parallaxFrontFactor) % tileHeight);    
    /* Use nested loops to scan down the screen, drawing rows of tiles. */
    tileY = startTileY;
    drawY = startDrawY;
    while (drawY < 480) {
	tileX = startTileX;
	drawX = startDrawX;
	while (drawX < 640) {
            // draw image to screen drawImage(imageObject, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
            srcrect = {};
	    srcrect.x = tileWidth * backTiles[tileX][tileY];
	    srcrect.y = 0;
	    srcrect.w = tileWidth;
	    srcrect.h = tileHeight;
            
            destrect = {};
	    destrect.x = drawX;
	    destrect.y = drawY;
	    destrect.w = tileWidth;
	    destrect.h = tileHeight;			
	    window.ctx.drawImage(imgFrontTiles, srcrect.x, srcrect.y, srcrect.w, srcrect.h, destrect.x, destrect.y, destrect.w, destrect.h);
                        
	    tileX++;	
	    tileX %= parallaxGridWidth;
	    drawX += tileWidth;
	}
	tileY++;
	tileY %= parallaxGridHeight;
	drawY += tileHeight;
    }
}