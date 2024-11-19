function createStar() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.classList.add("star")

    // Star properties
    let starSize = 5;
    let maxStarSize = Math.random() * 12 + 20;
    let minStarSize = Math.random() * 1 + 7;;
    let pulseSpeed = Math.random() * 0.15 + 0.05; // Initial random speed between 0.05 and 0.2
    let rotationSpeed = Math.random() * 0.03 + 0.01; // Initial random rotation speed between 0.01 and 0.04
    let growing = true;
    let rotationAngle = Math.random() * Math.PI * 2;

    const maxPulseSpeed = 0.3;  // Max speed limit for pulsation
    const minPulseSpeed = 0.05; // Min speed limit for pulsation
    const maxRotationSpeed = 0.05; // Max speed limit for rotation
    const minRotationSpeed = 0.01; // Min speed limit for rotation

    function resizeCanvas() {
        canvas.width = maxStarSize * 2;
        canvas.height = maxStarSize * 2;
        randomPositionCanvas();
    }

    // Random position for the canvas, avoiding central and bottom areas
    function randomPositionCanvas() {
        const maxX = window.innerWidth - canvas.width;
        const maxY = window.innerHeight - canvas.height;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const restrictedSquareSize = Math.min(window.innerWidth, window.innerHeight);
        const bottomRestrictedY = window.innerHeight * 0.8;

        let x, y;

        do {
            x = Math.random() * maxX;
            y = Math.random() * maxY;
        } while (
            x > centerX - restrictedSquareSize / 2 &&
            x < centerX + restrictedSquareSize / 2 &&
            y > centerY - restrictedSquareSize / 2 &&
            y < centerY + restrictedSquareSize / 2 ||
            y > bottomRestrictedY
        );

        canvas.style.left = `${x}px`;
        canvas.style.top = `${y}px`;
        canvas.addEventListener('click', () => { newDemonPanel(x, y) }, false)

    }


    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawStar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        ctx.translate(cx, cy);
        ctx.rotate(rotationAngle);

        ctx.beginPath();
        const outerRadius = starSize;
        const innerRadius = starSize / 2;
        const points = 9;

        for (let i = 0; i < points * 2; i++) {
            const angle = (i * Math.PI) / points;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();

        ctx.restore();

        // Update star size for pulsation
        if (growing) {
            starSize += pulseSpeed;
            if (starSize >= maxStarSize) growing = false;
        } else {
            starSize -= pulseSpeed;
            if (starSize <= minStarSize) growing = true;
        }

        // Update rotation angle
        rotationAngle += rotationSpeed;

        // Randomly adjust speeds slightly, within limits
        pulseSpeed += (Math.random() - 0.5) * 0.01; // Small random change
        pulseSpeed = Math.max(minPulseSpeed, Math.min(maxPulseSpeed, pulseSpeed)); // Limit speed

        rotationSpeed += (Math.random() - 0.5) * 0.002; // Small random change
        rotationSpeed = Math.max(minRotationSpeed, Math.min(maxRotationSpeed, rotationSpeed)); // Limit speed

        requestAnimationFrame(drawStar);
    }

    drawStar();
}

