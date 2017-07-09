function Ball(point, speed){
	this.path = new Path.Circle({
		center:point,
		radius:10,
		fillColor: "#3FC1C9"
	});
	this.speed = speed;
}

function MidPoint(point){
	this.path = new Path.Circle({
		center:point,
		radius:10,
		fillColor: "#FC5185"
	});
}

function Locus(point){
	this.path = new Path({
		segments: [point],
		strokeColor: "#FC5185",
		strokeWidth: 3
	});

	this.path.simplify(10);
}

function MyLine(from, to){
	this.path = new Path.Line({
		from: from,
		to: to,
		strokeColor: "#364F6B",
		strokeWidth: 3
	});
}

var balls = [],
    numBalls = 2;

var svgPath = new Path(pathData);
svgPath.strokeColor = "#364F6B";
svgPath.strokeWidth = 2;
svgPath.position = view.center;
// svgPath.scale(0.5);
// svgPath.rotate(-180)

var startPoint = svgPath.getPointAt(0)

for(var j = 0;j < numBalls;j++){
	// balls.push(new Ball(startPoint, 0.1 * (j*0.8 + 0.5)));
	balls.push(new Ball(startPoint, 0.5 * (j*0.8 + 0.5)));
}

var midPoint = new MidPoint(startPoint);
var myLine = new MyLine(startPoint, startPoint);
var locus = new Locus(startPoint, startPoint);


function onFrame(event){
	var offset, point;
	for(var i = 0;i < numBalls;i++){
		offset = svgPath.length * (event.count * balls[i].speed  % 100) / 100;

		point = svgPath.getPointAt(offset);

		balls[i].path.position = point;
	}

	var p1 = balls[0].path.position;
	var p2 = balls[1].path.position;

	midPoint.path.position = (p1 + p2) / 2;

	myLine.path.remove();
	myLine = new MyLine(p1, p2);
	myLine.path.insertAbove(svgPath)

	if(offset < svgPath.length) {
		locus.path.add(midPoint.path.position);
	}
}
