// Create pet element
function createPetElement(spriteSheetPath, frameSize) {
    const pet = document.createElement('div');
    pet.id = 'pet';
    pet.style.width = `${frameSize}px`;
    pet.style.height = `${frameSize}px`;
    pet.style.position = 'fixed';
    pet.style.pointerEvents = 'none';
    pet.style.backgroundImage = `url('${spriteSheetPath}')`;
    pet.style.imageRendering = 'pixelated';
    pet.style.zIndex = '999';
    document.body.appendChild(pet);
    return pet;
}

// Animation states
const STATES = {
    STANDING: { y: 8, frames: 2 },
    N: { y: 0, frames: 2 },
    NE: { y: 1, frames: 2 },
    E: { y: 2, frames: 2 },
    SE: { y: 3, frames: 2 },
    S: { y: 4, frames: 2 },
    SW: { y: 5, frames: 2 },
    W: { y: 6, frames: 2 },
    NW: { y: 7, frames: 2 },
}

// PetController class - constructor, handleMouseMove, determineState, updatePosition, animate
export class PetController {
    constructor(spriteSheetPath, frameSize = 128) {
        this.frameSize = frameSize;
        this.pet = createPetElement(spriteSheetPath, frameSize);
        this.x = frameSize;
        this.y = frameSize;
        this.currentFrame = 0;
        this.currentState = 'STANDING';
        this.frameCount = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        // Bind event listeners
        this.handleMouseMove = this.handleMouseMove.bind(this);
        document.addEventListener('mousemove', this.handleMouseMove);

        // Start animation loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }
    handleMouseMove(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    determineState() {
        const dx = this.mouseX - this.x;
        const dy = this.mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.frameSize / 2) {
            return 'STANDING'
        }

        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        // Convert angle to 8-direction state
        if (angle < -157.5) return 'W';
        if (angle < -112.5) return 'NW';
        if (angle < -67.5) return 'N';
        if (angle < -22.5) return 'NE';
        if (angle < 22.5) return 'E';
        if (angle < 67.5) return 'SE';
        if (angle < 112.5) return 'S';
        if (angle < 157.5) return 'SW';
        return 'W';
    }

    updatePosition() {
        const dx = this.mouseX - this.x;
        const dy = this.mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 1) {
            // Scale movement speed based on frame size
            const speed = this.frameSize / 32 * 4;
            this.x += (dx / distance) * speed;
            this.y += (dy / distance) * speed;
        }

        // Center the sprite
        this.pet.style.left = `${this.x - this.frameSize/2}px`
        this.pet.style.top = `${this.y - this.frameSize/2}px`
    }

    updateAnimation() {
        this.frameCount++;

        // Update frame every 15 animation frames
        if (this.frameCount >= 15) {
            this.frameCount = 0;
            this.currentFrame = (this.currentFrame + 1) % STATES[this.currentState].frames;
        }

        const frameX = this.currentFrame * this.frameSize;
        const frameY = STATES[this.currentState].y & this.frameSize;
        this.pet.style.backgroundPosition = `-${frameX}px -${frameY}px`;
    }

    animate() {
        const newState = this.determineState();
        if (newState !== this.currentState) {
            this.currentState = newState;
            this.currentFrame = 0;
            this.frameCount = 0;
        }
        this.updatePosition();
        this.updateAnimation();
        requestAnimationFrame(this.animate);
    }

    // Cleanup
    destroy() {
        document.removeEventListener('mousemove', this.handleMouseMove)
        this.pet.remove();
    }
}
