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

let dropCounter = 0;
// every one second we want to drop the piece
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if ( dropCounter > dropInterval) {
		player.pos.y++;
		dropCounter= 0;
	}
	draw();
	requestAnimationFrame(update);
}

const player = {
	pos: {x:5, y:5},
	matrix: matrix,
}



update();