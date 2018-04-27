var circleCount = 8;
var scale = 10;
var IMG = [
    //{"id":'&#x1F602;': values:{""}},
     '&#x1F602;',
    '&#x1F449',
    '&#x2764',
    '&#x1F602',
    '&#x1F644',
    '&#x1F60D',
    '&#x1F602',
    '&#x1F629',
    '&#x1F495',
    '&#x1F495',
    '&#x1F495'
]

class Circle {
  constructor(id,diameter, highlighted, image,x,y){
    this.id = ''+id;
    this.diameter = 60;
    this.x = x || 0;
    this.y = y || 0;
    this.highlighted = highlighted;
    this.image = image;
    return this;
  }
  
  // Find a random non overlapping space for the circle to reside
  randomOffsetFrom(previousCircle){
    this.x = 30;
    this.y = 0
  }
  
  render($parent,time=0){
    let $circle = $('<li><i data-attr="'+ this.image +'">'+ this.image +'<i/></li>')
      $circle.addClass('circle');
      if (this.highlighted) {
        $circle.addClass('red');
      }
      var trueSize = this.diameter/scale + 'em'
      $circle.css({
        width: trueSize,
        height: time ? 0 : trueSize,
        marginTop: this.y/scale + 'em',
        marginLeft: this.x/scale + 'em',
        opacity: time ? 0 : 1
      });
    $parent.append($circle);
    setTimeout(()=>{
        $circle.animate({
        width: trueSize,
        height: trueSize,
        opacity: 1
      },time/2);
    }, (+this.id * (time / circleCount)));

    $circle.click(function(d) {
        console.log(this)
    });

    $parent.data(this.id,$circle)
  }
 
}

function circles() {
  let previousCircle = {diameter:20,x:-25,y:-50};
  let circles = []
  for (var i = 0; i < 11; i++) {
    if (i == 0) circles.push(new Circle(i, 20, true, IMG[i]))
    else circles.push(new Circle(i, 20, false,IMG[i]))
  }
  function renderCircles($parent,circles,time){
    circles.forEach(circle => circle.render($parent,time))
  }
  
  circles = _.shuffle(circles);
  
  circles.forEach(circle => {
    circle.randomOffsetFrom(previousCircle)
    previousCircle = circle;
  })
  
  let $random = $('#random');
  let [bad,good] = _.partition(circles,'highlighted')
  good.sort(function(a,b){
      a.x = b.x = 15;
      a.y = b.y = 0;
    return a.diameter - b.diameter;
   }).reverse()
  good.splice(0, 0, bad[0])

  renderCircles($random,good, 2400);


  
}
