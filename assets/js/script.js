document.addEventListener('DOMContentLoaded', () => {
    // Define the text samples for each difficulty level
    const textsDifficulty = {
        easy: [
            "The cat sat on the mat.",
            "All that glitters is not gold.",
            "Hello world!",
            "Typing is fun.",
            "Practice makes perfect."
        ],
        medium: [
            "To be or not to be, that is the question.",
            "The quick brown fox jumps over the lazy dog.",
            "A journey of a thousand miles begins with a single step.",
            "The very early bird catches the worm.",
            "Actions can speak much louder than words."
        ],
        hard: [
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
            "In the beginning God created the heavens and the earth.",
            "It was the best of times, but also, it was the worst of times.",
            "In a galaxy far, far away, a young jedi takes his first step in the path of the force.",
            "The only thing we have to fear is fear itself."
        ]
    };

    // Get references to the DOM elements
    const chooseDifficulty = document.getElementById('chooseDifficulty');
    const sampleText = document.getElementById('sampleText');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const timeDisplay = document.getElementById('time');

    let startTime, endTime;

    // Function to get a random text based on the selected difficulty
    function getRandomText(difficulty) {
        const options = textsDifficulty[difficulty];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    // Event listener for when the difficulty selection changes
    function updateSampleText() {
        const selectedDifficulty = chooseDifficulty.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleText.textContent = randomText;
    }

    // Function to start the typing test
    function startTest() {
        startTime = new Date(); // Record the start time
        startBtn.disabled = true; // Disable the start button
        stopBtn.disabled = false; // Enable the stop button
        document.getElementById('textInput').value = ''; // Clear the text input field
    }

    // Function to stop the typing test
    function stopTest() {
        endTime = new Date(); // Record the end time
        const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds
        timeDisplay.textContent = timeTaken.toFixed(2); // Display the time taken
        startBtn.disabled = false; // Enable the start button
        stopBtn.disabled = true; // Disable the stop button
    }

    // Add event listeners
    chooseDifficulty.addEventListener('change', updateSampleText); // Update sample text when difficulty changes
    startBtn.addEventListener('click', startTest); // Start the test when start button is clicked
    stopBtn.addEventListener('click', stopTest); // Stop the test when stop button is clicked

    // Initialize with the default difficulty level
    const initialDifficulty = chooseDifficulty.value;
    sampleText.textContent = getRandomText(initialDifficulty); // Set initial sample text
    stopBtn.disabled = true; // Disable the stop button initially
});