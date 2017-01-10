var canvas = (function(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  ctx.canvas.width = 800;
  ctx.canvas.height = 600;

  function draw(callback){
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

console.log(canvas);
