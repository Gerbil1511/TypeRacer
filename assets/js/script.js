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

    chooseDifficulty.addEventListener('change', updateSampleText);

    // Initialize with the default difficulty level
    const initialDifficulty = chooseDifficulty.value;
    sampleText.textContent = getRandomText(initialDifficulty);
});