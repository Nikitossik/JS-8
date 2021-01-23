var squarePosition_x = 10;
var context;
var s = 1;
var timer;

var drawingCanvas = document.getElementById('ship');
if (drawingCanvas && drawingCanvas.getContext) {
  context = drawingCanvas.getContext('2d');
  timer = setInterval(drawFrame,30,s);
}

function drawFrame(s) {
 context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

 context.beginPath();
  context.fillStyle = "#fc0";
  context.moveTo(squarePosition_x + 20, 70);
  context.lineTo(squarePosition_x + 60, 20);
  context.lineTo(squarePosition_x + 60, 70);
  context.fill();

  context.beginPath();
  context.fillStyle = "#ccf";
  context.moveTo(squarePosition_x + 0, 70);
  context.lineTo(squarePosition_x + 30, 100);
  context.lineTo(squarePosition_x + 70, 100);
  context.lineTo(squarePosition_x + 100, 70);
  context.fill();

  context.beginPath();
  context.fillStyle = "#a60";
  context.fillRect(squarePosition_x + 60, 5, 5, 65);

  context.beginPath();
  context.fillStyle = "#e49";
  context.fillRect(squarePosition_x + 40, 5, 20, 10);

  context.fillStyle = '#00f';
  context.font = 'italic 20px sans-serif';
  context.textBaseline = 'top';
  context.fillText('KIT', squarePosition_x + 25, 75);
  squarePosition_x += s;
  
}

function stop(){
    clearInterval(timer);
}

function start(){
    clearInterval(timer);
    timer = setInterval(drawFrame, 30, 1);
}

function reverse(){
    clearInterval(timer);
    timer = setInterval(drawFrame, 30, -1);
}