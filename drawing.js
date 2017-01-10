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

  function relativePos(event, el){
    var rect = el.getBoundingClientRect();
    return {x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top)};
  }

  function line(ctx, event){
    mouse.curr.x = event.layerX;
    mouse.curr.y = event.layerY;

    ctx.beginPath();
    ctx.moveTo(mouse.prev.x, mouse.prev.y);
    ctx.lineTo(mouse.curr.x, mouse.curr.y);
    mouse.prev.x = mouse.curr.x;
    mouse.prev.y = mouse.curr.y;
    ctx.stroke();
  }


  function draw(ctx, event){
    switch(this.type){
      case "line":
        line(ctx,event);
      break;
      default:
        line(ctx, event);
      break;
    }
  }

  return {
    type: null,
    draw: draw
  }
})();



var mouse = {
  prev: {x: 0, y: 0},
  curr: {x: 0, y: 0}
};


(function(){
  canvas.draw(function(ctx){
    var strokeCP = document.querySelector('input[type=color]');

    ctx.lineJoin = ctx.lineCap = "round";
    ctx.lineWidth = 5;

    ctx.strokeStyle = strokeCP.value;

    strokeCP.onchange = function(){
      ctx.strokeStyle = strokeCP.value;
    }

    function mouseDownEv(event){
      if(event.which == 1){
        mouse.prev.x = event.layerX;
        mouse.prev.y = event.layerY;
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
