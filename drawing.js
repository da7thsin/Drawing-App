var canvas = (function(){
  var sketchDiv = document.querySelector('.sketch');
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

  return{
    getCanvasDim: getCanvasDim,
    setCanvasDim: setCanvasDim,
    draw: draw
  }
})();


var tools = (function(){
  function changeColor(){

  }

  return {
    changeColor: changeColor
  }
})();




var init = (function(){

  canvas.draw(function(ctx){
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
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.canvas.addEventListener("mousedown", mouseDownEv);
  });
})();
