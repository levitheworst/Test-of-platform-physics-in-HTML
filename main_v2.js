const gameDisplay = document.getElementById('display');
const ctx = gameDisplay.getContext('2d');

//configurações físicas
const defaultGravity = 0.6;
gameDisplay.width = 800;
gameDisplay.height = 600;

alert("w a s d ou setinhas")

class Sprite
{
    constructor({position, velocity, size, gravity})
    {
        this.position = position
        this.velocity = velocity
        this.size = size
        this.gravity = gravity
    }
    draw()
    {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
    update()
    {

        this.draw();

            this.velocity.y += this.gravity
            this.position.y += this.velocity.y

            this.position.x += this.velocity.x

            //limites de cenário (topo e chão)
            if(this.velocity.y + this.gravity + this.position.y > gameDisplay.height-this.size.y)
            {
                this.velocity.y = 0
                this.position.y = gameDisplay.height-this.size.y
            }
            else if(this.velocity.y + this.gravity + this.position.y < 0)
            {
                this.position.y = 0
            }

            //limites de cenário (lados)
            if(this.position.x + this.velocity.x > gameDisplay.width-this.size.x)
            {
                this.position.x = gameDisplay.width-this.size.x
            }
            else if(this.position.x + this.velocity.x < 0)
            {
                this.position.x = 0
            }

            //função final de controles
                //esquerda
            if(keyState.left.isPressed == true)
            {
                this.velocity.x = -15
            }
                //direita
            else if(keyState.right.isPressed == true)
            {
                this.velocity.x = 15
            }
            else
                //(direção nula)
            {
                this.velocity.x = 0
            }
                //cima (salto)
            if(this.position.y == gameDisplay.height-this.size.y && keyState.up.isPressed == true)
            {
                this.velocity.y += -20
            }

    }
}

//entrada de controles
    //tecla pressionada
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.up.isPressed = true
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.left.isPressed = true
            break;
        case 's':
        case 'ArrowDown':
            keyState.down.isPressed = true
            break;
        case 'd':
        case 'ArrowRight':
            keyState.right.isPressed = true
            break;
    }
})
    //tecla solta
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.up.isPressed = false
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.left.isPressed = false
            break;
        case 's':
        case 'ArrowDown':
            keyState.down.isPressed = false
            break;
        case 'd':
        case 'ArrowRight':
            keyState.right.isPressed = false
            break;
    }
})

//estado das teclas
const keyState = {
    up: {isPressed: false},
    left: {isPressed: false},
    down: {isPressed: false},
    right: {isPressed: false}
}

//jogador
const player = new Sprite({
    position:{x:0, y:0},
    velocity:{x:0, y:0},
    size: {x:50, y:50},
    gravity: defaultGravity
})

//função para repetir os frames do sprite
function anim()
{
    window.requestAnimationFrame(anim);
    ctx.clearRect(0, 0, gameDisplay.height*4, gameDisplay.width*4);
    player.update();
}

anim();
