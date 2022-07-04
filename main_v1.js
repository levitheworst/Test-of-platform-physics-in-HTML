const gameDisplay = document.getElementById('display');
const ctx = gameDisplay.getContext('2d');

//configurações físicas
const defaultGravity = 0.6;
gameDisplay.width = 800;
gameDisplay.height = 600;

alert("w a s d ou setinhas")

class Sprite
{
    //coleta e divide todos os argumentos de posição, velocidade e tamanho como parâmetros
    constructor({position, velocity, size, gravity})
    {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.gravity = gravity;
    }
    //dá um "rosto" ao player
    draw()
    {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update()
    {
        this.draw();

        //limites de espaço (x)
        if(this.position.x > gameDisplay.width-this.size.y)
        {
            this.velocity.x = 0;
            this.position.x = gameDisplay.width-this.size.y;
        }
        else if(this.position.x < 0)
        {
            this.velocity.x = 0;
            this.position.x = 0;
        }
        //interligando posição com velocidade
        else{
            this.position.x += this.velocity.x;
        }
        
        //limites de espaço (y)
        if(this.position.y < gameDisplay.height-this.size.y)
        {
            //intensificando velocidade com a gravidade (aceleração)
            this.velocity.y += this.gravity;
            //definindo posição com a velocidade
            this.position.y += this.velocity.y;
        }
        //pulo bonitinho (não relacionei com a velocidade, tenho sono... e preguiça)
        else if(this.position.y == gameDisplay.height-this.size.y && ctrl.up.activity == true)
        {
            this.position.y += -80
        }
        else if(this.position.y > gameDisplay.height-this.size.y)
        {
            this.velocity.y = 0;
            this.position.y = gameDisplay.height-this.size.y;
        }

        //resultado do mapeamento de teclas
        if(ctrl.left.activity == true)
        {
            this.velocity.x = -10;
        }
        else if(ctrl.right.activity == true)
        {
            this.velocity.x = 10;
        }
        else
        {
            this.velocity.x = 0;
        }

    }
}

//constante do jogador
const player = new Sprite({
    position:{x:0, y:0},
    velocity:{x:0, y:0},
    size: {x:50, y:50},
    gravity: defaultGravity
})

//base do mapeamento de teclas
const ctrl = {
    left:
    {
        activity: false
    },
    right:
    {
        activity: false
    },
    up:
    {
        activity: false
    }
}

//função para repetir os frames do sprite
function anim()
{
    window.requestAnimationFrame(anim);
    ctx.clearRect(0, 0, gameDisplay.height*4, gameDisplay.width*4);
    player.update();
}

anim();

//entrada de teclas (pressionadas)
window.addEventListener('keydown', (event) => {

    switch(event.key)
    {
        case 'a':
        case 'ArrowLeft':
            ctrl.left.activity = true
            break;
        case 'd':
        case 'ArrowRight':
            ctrl.right.activity = true
            break;
        case 'w':
        case 'ArrowUp':
            ctrl.up.activity = true
            console.log("sus")
            break;
    }

})

//entrada de teclas (soltas)
window.addEventListener('keyup', (event) => {

    switch(event.key)
    {
        case 'a':
        case 'ArrowLeft':
            ctrl.left.activity = false
            break;
        case 'd':
        case 'ArrowRight':
            ctrl.right.activity = false
            break;
        case 'w':
        case 'ArrowUp':
            ctrl.up.activity = false
            break;
    }

})
