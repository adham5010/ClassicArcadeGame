// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 0;
    this.speed = Math.floor(Math.random() * Math.floor(500));
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.detectCollosion = function (person) {

    //(this.x + 101) >= person.x && person.y<=(this.y+83)&&this.x<505) {
    if (this.x < person.x + 83 && this.x + 101 > (person.x + 30) &&
        this.y < person.y + 56 && (this.y + 41) > (person.y)) {
        player = new Player();
        player.render();
    }
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        if (dt > 0) {
            this.x += ((this.speed > 100 ? this.speed : 100) * dt);
        }
        this.detectCollosion(player);
        this.render();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
}

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function () {

};

// Draw the Player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all Player objects in an array called allEnemies
var allEnemies = [];
var lastRandomizer = 0;
setInterval(() => {
    var realTimeEnimies = allEnemies.filter(a => a.x < 505);
    if (realTimeEnimies.length < 3) {
        var enemy = new Enemy();
        var randomizer = 0;
        do {
            randomizer = Math.floor(Math.random() * Math.floor(4));
        } while (randomizer <= 0)
        enemy.y = randomizer * 76;
        allEnemies.push(enemy);
        lastRandomizer = randomizer;
    }
}, 750);

// Place the player object in a variable called player
var player = new Player();
Player.prototype.handleInput = function (direction) {
        switch (direction) {
            case 'left':
                (this.x > 0) ? this.x -= 101: this.x = this.x;
                break;
            case 'up':
                this.y>56?this.y -= 83:this.y=this.y;
                break;
            case 'right':
                (this.x < 404) ? this.x += 101: this.x = this.x;
                break;
            case 'down':
                (this.y < 404) ? this.y += 83: this.y = this.y;
                break;
        }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
        player.handleInput(allowedKeys[e.keyCode]);
        if(player.y<56){
            var WonButton = document.getElementById("resetGame");
            WonButton.parentElement.removeAttribute('style');
        }
});


document.addEventListener('DOMContentLoaded',function(){
    var WonButton = document.getElementById("resetGame");
    WonButton.addEventListener('click',function(){
        player= new Player();
        allEnemies = [];
        WonButton.parentElement.style.display = 'none';
    });

});