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

function Trajectory(point){
    this.path = new Path({
			segments: [point],
			strokeColor: "#FC5185",
			strokeWidth: 3
			// Select the path, so we can see its segment points:
			// fullySelected: true
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



var poop = new Path(pathData);
poop.strokeColor = "#364F6B";
poop.strokeWidth = 2;
poop.position = view.center;
poop.scale(0.5);
poop.rotate(-180)

var startPoint = poop.getPointAt(0)


for(var j = 0;j < numBalls;j++){
	// balls.push(new Ball(startPoint, 0.1 * (j*0.8 + 0.5)));
	balls.push(new Ball(startPoint, 0.5 * (j*0.8 + 0.5)));
}

var midPoint = new MidPoint(startPoint);
// var line = new MyLine(new Point(0, 0), startPoint);
var myLine = new MyLine(startPoint, startPoint);
var trajectory = new Trajectory(startPoint, startPoint);

console.log(myLine);

function onFrame(event){
	var offset, point;
	for(var i = 0;i < numBalls;i++){
	    offset = poop.length * (event.count * balls[i].speed  % 100) / 100;

	    point = poop.getPointAt(offset);

	    balls[i].path.position = point;
	}

	var p1 = balls[0].path.position;
	var p2 = balls[1].path.position;
	midPoint.path.position = (p1 + p2) / 2;

	if(offset < poop.length) {
		trajectory.path.add(midPoint.path.position);
	}

	myLine.path.remove();
	myLine = new MyLine(p1, p2);
	myLine.path.insertAbove(poop)
}
