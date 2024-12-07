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
    const retryBtn = document.getElementById('retryBtn');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const difficultyDisplay = document.getElementById('difficulty');
    const textInput = document.getElementById('textInput');

    let timerInterval;
    let startTime, endTime;
    let timerStarted = false;

    // Function to get a random text based on the selected difficulty
    function getRandomText(difficulty) {
        const texts = textsDifficulty[difficulty];
        return texts[Math.floor(Math.random() * texts.length)];
    }

    // Event listener for when the difficulty selection changes
    function updateSampleText() {
        const selectedDifficulty = chooseDifficulty.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleText.textContent = randomText;

        // Clear the textInput area and resultsArea
        textInput.value = '';
        timeDisplay.textContent = '';
        wpmDisplay.textContent = '';
        difficultyDisplay.textContent = '';
    }

    // Function to update the time display
    function updateTimeDisplay() {
        const currentTime = new Date();
        const timeTaken = (currentTime - startTime) / 1000; // Calculate the time taken in seconds
        timeDisplay.textContent = `${timeTaken.toFixed(2)} seconds`; // Display the time taken
    }

    // Function to start the typing test
    function startTest() {
        startBtn.disabled = true; // Disable the start button
        stopBtn.disabled = true; // Disable the stop button initially
        retryBtn.disabled = true; // Disable the retry button
        textInput.disabled = false; // Enable the text input field
        textInput.value = ''; // Clear the text input field
        textInput.focus(); // Set focus on the text input field
        timerStarted = false; // Reset the timer started flag
    }

    // Function to count the number of correctly typed words
    function countCorrectWords(sample, input) {
        const sampleWords = sample.split(' ');
        const inputWords = input.split(' ');
        let correctWords = 0;

        for (let i = 0; i < inputWords.length; i++) {
            if (inputWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        return correctWords;
    }

    // Function to stop the typing test
    function stopTest() {
        clearInterval(timerInterval); // Clear the timer interval
        endTime = new Date(); // Record the end time
        const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds
        timeDisplay.textContent = `${timeTaken.toFixed(2)} seconds`; // Display the time taken

        const sample = sampleText.textContent;
        const input = textInput.value;
        const correctWords = countCorrectWords(sample, input);
        const wpm = Math.round((correctWords / timeTaken) * 60); // Calculate WPM

        wpmDisplay.textContent = `${wpm}`; // Display the WPM
        difficultyDisplay.textContent = `${chooseDifficulty.value.toUpperCase()}`; // Display the difficulty level

        startBtn.disabled = false; // Enable the start button
        stopBtn.disabled = true; // Disable the stop button
        textInput.disabled = true; // Disable the text input field
        retryBtn.disabled = false; // Enable the retry button
    }

    // Function to reset the typing test
    function resetTest() {
        const difficulty = chooseDifficulty.value;
        sampleText.textContent = getRandomText(difficulty); // Load a new sample text
        textInput.value = ''; // Clear the text input field
        textInput.disabled = false; // Enable the text input field
        textInput.focus(); // Set focus on the text input field
        timeDisplay.textContent = ''; // Reset the time display
        wpmDisplay.textContent = ''; // Reset the WPM display
        difficultyDisplay.textContent = ''; // Reset the difficulty display
        startBtn.disabled = false; // Enable the start button
        stopBtn.disabled = true; // Disable the stop button
        retryBtn.disabled = true; // Disable the retry button
        timerStarted = false; // Reset the timer started flag
        clearInterval(timerInterval); // Clear any existing timer interval
    }

    // Function to provide real-time feedback on typing accuracy
    function provideRealTimeFeedback() {
        if (!timerStarted) {
            startTime = new Date(); // Record the start time
            timerInterval = setInterval(updateTimeDisplay, 100); // Start the timer interval to update the time display every 100 milliseconds
            timerStarted = true; // Set the timer started flag
        }

        const sampleWords = sampleText.textContent.split(' ');
        const inputWords = textInput.value.split(' ');

        let highlightedText = '';
        let allCorrect = true;

        for (let i = 0; i < sampleWords.length; i++) {
            if (inputWords[i] === undefined) {
                highlightedText += `<span>${sampleWords[i]}</span> `;
                allCorrect = false;
            } else if (inputWords[i] === sampleWords[i]) {
                highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
                allCorrect = false;
            }
        }

        sampleText.innerHTML = highlightedText.trim();

        // Enable the stop button only if all words are correct
        stopBtn.disabled = !allCorrect;
    }

    // Add event listeners
    chooseDifficulty.addEventListener('change', updateSampleText); // Update sample text when difficulty changes
    startBtn.addEventListener('click', startTest); // Start the test when start button is clicked
    stopBtn.addEventListener('click', stopTest); // Stop the test when stop button is clicked
    retryBtn.addEventListener('click', resetTest); // Reset the test when retry button is clicked
    textInput.addEventListener('input', provideRealTimeFeedback); // Provide real-time feedback as the user types

    // Add event listener for Enter key to stop the test
    textInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !stopBtn.disabled) {
            stopTest();
        }
    });

    // Initialize with the default difficulty level
    const initialDifficulty = chooseDifficulty.value;
    sampleText.textContent = getRandomText(initialDifficulty); // Set initial sample text
    textInput.disabled = true; // Disable the text input field initially
    retryBtn.disabled = true; // Disable the retry button initially
});

