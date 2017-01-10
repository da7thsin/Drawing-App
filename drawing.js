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

  function relativePos(event, el){
    var rect = el.getBoundingClientRect();
    return {x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top)};
  }

  function line(ctx, mouseCurr, mousePrev){
    ctx.lineWidth = 5;
    ctx.lineCap = "round";


    ctx.beginPath();
    ctx.moveTo(mousePrev.x, mousePrev.y);
    ctx.lineTo(mouseCurr.x, mouseCurr.y);
    mousePrev.x = mouseCurr.x;
    mousePrev.y = mouseCurr.y;
    ctx.stroke();
  }


  function draw(ctx, mouseCurr, mousePrev){
    switch(this.type){
      case "line":
        line(ctx,event);
      break;
      default:
        line(ctx, mouseCurr, mousePrev);
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
        mouse.curr.x = event.layerX;
        mouse.curr.y = event.layerY;
        tool.draw(ctx, mouse.curr, mouse.prev);
      }
    }

    ctx.canvas.addEventListener("mousedown", mouseDownEv);
  });
})();
