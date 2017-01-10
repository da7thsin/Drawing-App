var canvas = (function(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.width = 800;
  var height = ctx.canvas.height = 400;

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

  return{
    getCanvasDim: getCanvasDim,
    setCanvasDim: setCanvasDim,
    draw: draw
  }
})();


canvas.draw(function(ctx){
  ctx.arc(50, 50, 100, 0, Math.PI);
  function mouseDownEv(event){
    if(event.which == 1){
      ctx.canvas.addEventListener("mousemove", mouseMoveEv);
    }
  }

  function mouseMoveEv(event){
    var x = event.layerX;
    var y = event.layerY;

    if(event.buttons == 0 || event.which == 0){
      ctx.canvas.removeEventListener("mousemove", mouseMoveEv);
    }
    else{
      console.log(x , y);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  ctx.canvas.addEventListener("mousedown", mouseDownEv);
});
