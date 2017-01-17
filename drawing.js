var canvas = (function(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.width = 800;
  var height = ctx.canvas.height = 600;

  function draw(callback){
    ctx.clearRect(0, 0, width, height);
    callback(ctx);
  }

  function getDimension(){
    return {x: width, y: height};
  }

  return {
    draw: draw,
    getDim: getDimension
  }
})();



function MirrorPoint(x, y){
  this.x = x;
  this.y = y;

  this.drawMirrored = function(ctx, paths){
    var start = paths[0];

    if(start.x > this.x && start.y > this.y){
      ctx.moveTo(start.x, start.y);
    }

    if(start.x < this.x && start.y < this.y){
      ctx.moveTo(-start.x, -start.y);
    }

    ctx.beginPath();
    for(var i = 1; i < paths.length; i++){
      var end = paths[i];

      if(start.x > this.x && start.y > this.y){
        ctx.lineTo(this.x - (end.x - this.x), this.y + (end.y - this.y));
      }

      if(start.x < this.x && start.y < this.y){
        ctx.lineTo(this.x + (this.x - end.x), this.y - (this.y - end.y));
      }
    }

    ctx.stroke();
  }
}


function mirrorLine(ctx, posX, posY, start, end){
  var points = [];
  ctx.moveTo(posX, posY);

  for(let newY = start; newY < end; newY++){
    points.push(new MirrorPoint(posX, newY));
    ctx.lineTo(posX, newY);
    ctx.moveTo(posX, newY);
    ctx.stroke();
  }

  return points;
}


function drawLine(ctx, paths, mirrorPoints){
  ctx.beginPath();
  ctx.moveTo(paths[0].x, paths[0].y);

  for(var i = 1; i < paths.length; i++){
    ctx.lineTo(paths[i].x, paths[i].y);
  }

  ctx.stroke();
}


(function(){
  var paths = [];


  canvas.draw(function(ctx){
    var strokeCP = document.querySelector('input[type=color]');
    var dimension = canvas.getDim();

    var mirrorPoints = mirrorLine(ctx, dimension.x/2, 0, 0, dimension.y);

    ctx.lineJoin = ctx.lineCap = "round";
    ctx.lineWidth = 5;

    ctx.strokeStyle = strokeCP.value;

    strokeCP.onchange = function(){
      ctx.strokeStyle = strokeCP.value;
    }

    function mouseDownEv(event){
      if(event.which == 1){
        paths.push({x: event.layerX, y: event.layerY});
        ctx.canvas.addEventListener("mousemove", mouseMoveEv);
      }
    }

    function mouseUpEv(){
      paths = [];
    }

    function mouseMoveEv(event){
      if(event.buttons == 0 || event.which == 0){
        ctx.canvas.removeEventListener("mousemove", mouseMoveEv);
      }
      else{
        paths.push({x: event.layerX, y: event.layerY});
        drawLine(ctx, paths);

        mirrorPoints.forEach(function(point){
          point.drawMirrored(ctx, paths);
        });
      }
    }


    ctx.canvas.addEventListener("mouseup", mouseUpEv);
    ctx.canvas.addEventListener("mousedown", mouseDownEv);
  });
})();
