/*
 * Flocking simulation 
 * 
 * Code adapted from: JavaScript Creativity
 * 
 * Leah Ruisenor
 * TCSS 491
 * Winter 2018
*/

//var socket = io.connect("http://24.16.255.56:8888");

// socket.on("load", function (data) {
//     console.log(data);
// });

// socket.emit("save", { studentname: "Leah Ruisenor", statename: "aState", data: flock });
// socket.emit("load", { studentname: "Leah Ruisenor", statename: "aState" });


var Flocking = (function () {

	var canvas = document.getElementById("flocking");
	var ctx = canvas.getContext('2d');
	
	canvas.height = 800;
	canvas.width = 1280;

	var flock = [];
	var flockRadius = 250;

	var Boid = function (x, y, z, front, size) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.front = front;
		this.size = size;
	};

	function start() {

		for (var i = 0; i < 50; i++) {
			flock.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 350, Math.random() * 360, 10));
		}
		setInterval(boidLogic, 1000/60);
	}

	function boidLogic() {

		for (var i = 0; i < flock.length; i++) {
			var count = 0;
			var centerX = 0;
			var centerY = 0;
			var centerZ = 0;
			var singleBoid = flock[i];

			for (var j = 0; j < flock.length; j++) {
				var distance = distanceBetween(singleBoid, flock[j]);
				if (distance < flockRadius) {
					centerX += flock[j].x;
					centerY += flock[j].y;
					centerZ += flock[j].z;
					count++;
				}
			}

			if (count > 1) {
				centerX = centerX / count;
				centerY = centerY / count;
				centerZ = centerZ / count;
			} else {
				centerX = Math.random() * canvas.width;
				centerY = Math.random() * canvas.height;
				centerZ = Math.random() * 350;
			}

			var angleToCenter = angleBetween(singleBoid.x, singleBoid.y, singleBoid.z, centerX, centerY, centerZ);
			var lerpangle = angleDifference(singleBoid.front, angleToCenter);

			singleBoid.front += lerpangle * 0.06; //0.01 0.05

			frontOfX = directionOfX(2, singleBoid.front);
			frontOfY = directionOfY(2, singleBoid.front);

			singleBoid.x += frontOfX;
			singleBoid.y += frontOfY;

			if (singleBoid.x < 0) {
				singleBoid.x = canvas.width;
			}
			if (singleBoid.y < 0) {
				singleBoid.y = canvas.height;
			}
			if (singleBoid.z < 0) {
				singleBoid.z = 350;
			}
			if (singleBoid.x > canvas.width) {
				singleBoid.x = 0;
			}
			if (singleBoid.y > canvas.height) {
				singleBoid.y = 0;
			}
			if (singleBoid.z > 350) {
				singleBoid.z = 0;
			}
		}
		requestAnimationFrame(draw);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < flock.length; i++) {
			var boid = flock[i];
			ctx.beginPath();
			ctx.arc((boid.x + (boid.size / 2)), (boid.y + (boid.size / 2)), 3, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(boid.x + (boid.size / 2), boid.y + (boid.size / 2));
			ctx.lineTo((boid.x + (boid.size / 2)) - directionOfX(9, flock[i].front), (boid.y + (boid.size / 2)) - directionOfY(9, flock[i].front));
			ctx.strokeStyle = "black" // tail
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(boid.x + (boid.size / 2), boid.y + (boid.size / 2));
			ctx.lineTo((boid.x - (boid.size / 2)) - directionOfX(5, flock[i].front), (boid.y - (boid.size / 2)) - directionOfY(5, flock[i].front));
			ctx.strokeStyle = "black" // first wing
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(boid.x + (boid.size / 2), boid.y + (boid.size / 2));
			ctx.lineTo((boid.x - (boid.size / 2)) - directionOfX(5, flock[i].front), (boid.y + (boid.size / 2)) - directionOfY(5, flock[i].front));
			ctx.strokeStyle = "black" // next wing
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(boid.x + (boid.size / 2), boid.y + (boid.size / 2));
			ctx.lineTo((boid.x + (boid.size / 2)) - directionOfX(5, flock[i].front), (boid.y - (boid.size / 2)) - directionOfY(5, flock[i].front));
			ctx.strokeStyle = "black" // next wing
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(boid.x + (boid.size / 2), boid.y + (boid.size / 2));
			ctx.lineTo((boid.x + (boid.size / 2)) + directionOfX(5, flock[i].front), (boid.y + (boid.size / 2)) + directionOfY(5, flock[i].front));
			ctx.strokeStyle = "black" // head
			ctx.stroke();
		}
	}

	function distanceBetween(boid1, boid2) {
		var distX = (boid1.x - boid2.x);
		var distY = (boid1.y - boid2.y);
		var distZ = (boid1.z - boid2.y);
		return Math.sqrt(distX ^ 2 + distY ^ 2 + distZ ^ 2);
	}

	function angleBetween(x1, y1, z1, x2, y2, z2) {
		return Math.atan2(y1 - y2, x1 - x2) * (180.0 / Math.PI);
	}

	function angleDifference(angle1, angle2) {
		return ((((angle1 - angle2) % 360) + 540) % 360) - 180;
	}

	function degreesToRadians(degrees) {
		return degrees * (Math.PI / 180);
	}

	function directionOfX(length, angle) {
		return length * Math.cos(degreesToRadians(angle));
	}

	function directionOfY(length, angle) {
		return length * Math.sin(degreesToRadians(angle));
	}
	
	start();

})();