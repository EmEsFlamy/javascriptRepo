const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const balls = [];
const ballCount = 10;
const minDistance = 100;
let mouseX = 0;
let mouseY = 0;
const attractionForce = 0.05;

function startSimulation() {
  for (let i = 0; i < ballCount; i++) {
    balls.push(createBall());
  }
  canvas.addEventListener('mousemove', updateMousePosition);
  animate();
}

function resetSimulation() {
  balls.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.removeEventListener('mousemove', updateMousePosition);
}

function createBall() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 20 + 10,
    color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    mass: Math.random() * 5 + 1,
    speed: Math.random() * 5 + 1,
  };
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawLine(ball1, ball2) {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.closePath();
}

function updateMousePosition(event) {
  mouseX = event.clientX - canvas.getBoundingClientRect().left;
  mouseY = event.clientY - canvas.getBoundingClientRect().top;
}

function applyAttraction(ball) {
  const distance = Math.sqrt((mouseX - ball.x)**2 + (mouseY - ball.y)**2);
  const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
  const forceX = Math.cos(angle) * attractionForce;
  const forceY = Math.sin(angle) * attractionForce;

  ball.dx += forceX;
  ball.dy += forceY;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    drawBall(ball);

    if (mouseX !== 0 && mouseY !== 0) {
      applyAttraction(ball);
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }

    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt((otherBall.x - ball.x)**2 + (otherBall.y - ball.y)**2);

      if (distance < minDistance) {
        drawLine(ball, otherBall);
      }
    }
  }

  requestAnimationFrame(animate);
}
