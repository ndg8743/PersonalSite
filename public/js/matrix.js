// Get the canvas element
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Function to set the canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;
}

// Set the initial canvas size
setCanvasSize();

// Create an array of characters
const characters = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
    "A", "B", "C", "D", "E", "F", 
    "あ", "い", "う", "え", "お", 
    "カ", "キ", "ク", "ケ", "コ"
];
// Create an array of columns
let columns = Math.floor(canvas.width / 20);

// Initialize the y positions of the columns
let yPositions = [];

function initializeYPositions() {
    yPositions = [];
    for (let i = 0; i < columns; i++) {
        yPositions[i] = Math.random() * canvas.height;
    }
}

// Initialize y positions
initializeYPositions();

// Update the matrix animation
function updateMatrix() {
    // Set the background color
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font
    ctx.fillStyle = "green";
    ctx.font = "12px consolas";

    // Loop through each column
    for (let i = 0; i < columns; i++) {
        // Select a random character from the array
        const character = characters[Math.floor(Math.random() * characters.length)];

        // Set the y position of the current column
        const y = yPositions[i];

        // Draw the character at the current position
        ctx.fillText(character, i * 20, y);

        // Move the column down by 20 units
        yPositions[i] += 20;

        // Reset the position if it reaches the bottom of the canvas
        if (yPositions[i] > canvas.height && Math.random() > 0.98) {
            yPositions[i] = 0;
        }
    }
}

// Render the matrix animation
function renderMatrix() {
    requestAnimationFrame(renderMatrix);
    updateMatrix();
}

// Handle window resize
window.addEventListener("resize", () => {
    setCanvasSize();
    columns = Math.floor(canvas.width / 20);
    initializeYPositions();
});

// Start the animation
renderMatrix();