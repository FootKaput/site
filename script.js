/* script.js */

// Game Data
const gameData = {
    chapter1: {
        title: "The Lost Tail",
        scenes: [
            {
                text: "Once upon a time, in the deep space...",
                image: 'images/comet-sad.jpg',
                choices: [
                    { text: "Follow the Twinkling Stars", nextScene: 1 },
                    { text: "Ask the Moon for Help", nextScene: 2 },
                    { text: "Search in the Milky Way", nextScene: 3 }
                ]
            },
            // Additional scenes...
        ],
        locked: false
    },
    // Additional chapters...
};

// Game State
let currentChapter = 'chapter1';
let currentScene = 0;

// Start Game
window.onload = function() {
    loadProgress();
    showScene();
};

// Load Progress
function loadProgress() {
    // Your existing code...
}

// Save Progress
function saveProgress() {
    // Your existing code...
}

// Show Scene
function showScene() {
    const chapter = gameData[currentChapter];
    if (!chapter) {
        console.error(`Chapter "${currentChapter}" not found in gameData.`);
        return;
    }

    const scene = chapter.scenes[currentScene];
    if (!scene) {
        console.error(`Scene "${currentScene}" not found in chapter "${currentChapter}".`);
        return;
    }

    // Update Text
    document.getElementById('story-text').innerText = scene.text;

    // Update Image
    if (scene.image) {
        document.getElementById('story-image').style.backgroundImage = `url('${scene.image}')`;
    } else {
        document.getElementById('story-image').style.backgroundImage = '';
    }

    // Display Choices
    displayChoices(scene);
}

// Display Choices
function displayChoices(scene) {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.classList.add('choice-button');
            button.onclick = function() {
                currentScene = choice.nextScene;
                saveProgress();
                showScene();
            };
            choicesDiv.appendChild(button);
        });
    } else {
        // No choices available
        const nextButton = document.getElementById('next-button');
        nextButton.style.display = 'block';
        nextButton.onclick = function() {
            // Logic to handle end of scenes
            unlockNextChapter();
        };
    }
}

// Unlock Next Chapter
function unlockNextChapter() {
    // Your existing code...
}
