const canvas = document.getElementById('tetris');
// The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a <canvas> element.
const context = canvas.getContext('2d');
// Scaling everything 20times
context.scale(20, 20);

// Rotation, translation, and scaling are all accomplished using a transformation matrix—a set of nine numbers that are used to transform a two-dimensional array, such as a bitmap, using linear algebra. 
const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];
// we check the player matrix on index y and x and if it's not 0 we continue and we check if the arena has a row and has a column and if it has both them and they are not zero it return true
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
	const matrix = [];
	while(h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function draw() {
	
	//Once you have the 2D rendering context for a canvas, you can draw within it like this: 
	//Color black
	context.fillStyle = '#000';
	// height and width
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(player.matrix, player.pos);
}


// Now i want to wrap this matrix into a function
function drawMatrix(matrix, offset) {
// creating tetris pieces
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0) {
			context.fillStyle = "red";
			context.fillRect(x + offset.x, 
							 y + offset.y,
							 1, 1 )
			}
		});
	});
}

function merge(arena, player) {
	player.matrix.forEach((row, y ) => {
		row.forEach((value, x) => {
			if(value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		})
	})
}

function playerDrop() {
	player.pos.y++;
	if(collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		player.pos.y = 0;
	}
	dropCounter = 0;
}

let dropCounter = 0;
// every one second we want to drop the piece
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if ( dropCounter > dropInterval) {
		playerDrop();
	}
	draw();
	requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);


const player = {
	pos: {x:5, y:5},
	matrix: matrix,
}

document.addEventListener('keydown', event => {
	if(event.keyCode === 37) {
		player.pos.x--;
	}

	else if(event.keyCode === 39) {
		player.pos.x++;
	} 

	else if(event.keyCode === 40){
		playerDrop();
	}
});



update();