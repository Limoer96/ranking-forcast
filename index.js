var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
function drawBackground(step){
  ctx.lineWidth  = 0.5;
  ctx.strokeStyle='lightgray';
  for(var i = 0; i < canvas.width; i += step){
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for(var j = 0; j < canvas.height; j += step){
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }
}

function drawXY(){
  // 先画上XY轴，再补精度标号
  ctx.beginPath();
  ctx.moveTo(200,550);
  ctx.lineTo(200, 200);
  ctx.strokeStyle='#000000';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(600, 550);
  ctx.stroke();
  ctx.fillText(0, 197, 570);
  ctx.beginPath();
  ctx.moveTo(190, 210);
  ctx.lineTo(200, 200);
  ctx.moveTo(200, 200);
  ctx.lineTo(210, 210);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(590, 560);
  ctx.lineTo(600, 550);
  ctx.moveTo(600, 550);
  ctx.lineTo(590, 540);
  ctx.stroke();


  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.moveTo(100, 700);
  ctx.lineTo(800, 700);
  ctx.stroke();

}

function drawBaseline(){
  ctx.beginPath();
  ctx.strokeStyle = 'pink';
  ctx.moveTo(200, 550);
  ctx.lineTo(550, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(600, 350);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(400, 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(600, 250);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(500, 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(700, 150);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(600, 50);
  ctx.stroke();
  
  
}

function drawDis(step){
  ctx.strokeStyle='grey';
  ctx.lineWidth = 2;
  ctx.font = '14px serif';
  var n = 5;
  var m = 5;
  for(var i = 550-step; i > 200; i -= step){
    ctx.beginPath();
    ctx.moveTo(195, i);
    ctx.lineTo(205, i);
    ctx.stroke();
    ctx.fillText(n, 175, i);
    n += 5;
  }
  for(j =200 + step; j < 600; j += step ){
    ctx.beginPath();
    ctx.moveTo(j, 545);
    ctx.lineTo(j, 555);
    ctx.stroke();
    ctx.fillText(m, j-5, 570);
    m += 5;
  }
}
var points;
function getPointsAndDraw(){
  fetch('http://localhost:8889/post', {method: 'get', mode: 'cors'}).then(function(response){
    return response.json();
  }).then(function(text){
    drawPoints(text);
    drawOneDimension(text);
  })
}


// 准确率分布（一维）


function drawOneDimension(points){  
  for(let i = 0; i < 14; i++){
    ctx.beginPath();
    ctx.strokeStyle = '#232323';
    ctx.moveTo(100+i*50, 695);
    ctx.lineTo(100+i*50, 705);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillText((0.5+i*0.05).toFixed(2), 100+i*50-5, 680);
  }
  console.log('ok!')
  for(var item_ of points){
    ctx.beginPath();
    ctx.fillStyle = 'pink';
    let score = (item_[1]/item_[0]).toFixed(2);
    var x_ = (score-0.5)/0.05*50 + 100;
    ctx.arc(x_, 700, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}


function drawPoints(points){
  for(item of points){
    ctx.beginPath();
    ctx.fillStyle='red';
    var x = 200+Number.parseFloat(item[0])*50;
    var y = 550-Number.parseFloat(item[1])*50;
    ctx.arc(x, y, 2, 0, Math.PI*2);
    ctx.fill();
  }
}

function draw(){
  drawBackground(10);
  drawXY();
  drawBaseline();
  getPointsAndDraw();
}
draw();














































