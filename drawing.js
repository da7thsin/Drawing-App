var canvas = (function(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.width = 800;
  var height = ctx.canvas.height = 600;

  function draw(callback){
    ctx.clearRect(0, 0, width, height);
    callback(ctx);
  }

  function getCanvasDim(){
    return {width: ctx.canvas.width, height: ctx.canvas.height};
  }

  function setCanvasDim(width, height){
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }

  return {draw: draw}
})();

var tool = (function(){
  var paths = [];

  function multiRay(ctx, event){
    var x = event.layerX;
    var y = event.layerY;

    var paths = [];

    paths.push({x: x, y: y})

    console.log(paths);
  }

  function line(ctx,event){
    var x = event.layerX;
    var y = event.layerY;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }


  function draw(ctx, event){
    switch(this.type){
      case "line":
        line(ctx,event);
      break;
      case "ray":
        multiRay(ctx,event);
      break;
      default:
        line(ctx,event);
      break;
    }
  }

  return {
    type: null,
    draw: draw
  }
})();



(function(){

  canvas.draw(function(ctx){
    var strokeCP = document.querySelector('#stroke');
    var fillCP = document.querySelector('#fill');

    ctx.strokeStyle = strokeCP.value;
    ctx.fillStyle = fillCP.value;

    strokeCP.onchange = function(){
      ctx.strokeStyle = strokeCP.value;
    }

    fillCP.onchange = function(){
      ctx.fillStyle = fillCP.value;
    }

    function mouseDownEv(event){
      if(event.which == 1){
        ctx.canvas.addEventListener("mousemove", mouseMoveEv);
      }
    }

    function mouseMoveEv(event){
      if(event.buttons == 0 || event.which == 0){
        ctx.canvas.removeEventListener("mousemove", mouseMoveEv);
      }
      else{
        tool.draw(ctx, event);
      }
    }

    ctx.canvas.addEventListener("mousedown", mouseDownEv);
  });
})();
