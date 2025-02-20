/* script.js */

// Game Data
const gameData = {
    chapter1: {
        title: "The Lost Tail",
        scenes: [
            // Scene 0
            {
                text: "Once upon a time, in the deep darkness of space, a little comet realized it had lost its sparkling tail.",
                image: 'images/comet-sad.jpg',
                choices: [
                    { text: "Follow the Twinkling Stars", nextScene: 1 },
                    { text: "Ask the Moon for Help", nextScene: 2 },
                    { text: "Search in the Milky Way", nextScene: 3 }
                ]
            },
            // Scene 1
            {
                text: "You decide to follow the twinkling stars. They dance around you, leading the way.",
                image: 'images/twinkling-stars.jpg',
                choices: [
                    { text: "Dance with the Stars", nextScene: 4 },
                    { text: "Keep Following Them", nextScene: 5 },
                    { text: "Take a Rest", nextScene: 6 }
                ]
            },
            // Scene 2
            {
                text: "You ask the wise old Moon for help. The Moon smiles gently.",
                image: 'images/moon.jpg',
                choices: [
                    { text: "Listen to the Moon's Advice", nextScene: 7 },
                    { text: "Thank the Moon and Continue", nextScene: 8 },
                    { text: "Share a Story with the Moon", nextScene: 9 }
                ]
            },
            // Scene 3
            {
                text: "You venture into the Milky Way, where streams of stardust flow endlessly.",
                image: 'images/milky-way.jpg',
                choices: [
                    { text: "Collect Stardust", nextScene: 10 },
                    { text: "Swim in the Stardust Rivers", nextScene: 11 },
                    { text: "Call Out for Your Tail", nextScene: 12 }
                ]
            },
            // Additional scenes continue...
        ],
        locked: false
    },
    chapter2: {
        title: "Journey to Planet Rainbow",
        scenes: [
            // Scene 0
            {
                text: "A shimmering path appears, leading you to the vibrant Planet Rainbow.",
                image: 'images/planet-rainbow.jpg',
                choices: [
                    { text: "Slide Down the Rainbow", nextScene: 1 },
                    { text: "Talk to the Color Pixies", nextScene: 2 },
                    { text: "Explore the Color Forest", nextScene: 3 }
                ]
            },
            // Additional scenes...
        ],
        locked: true
    },
    // More chapters can be added here
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
    const savedChapter = localStorage.getItem('currentChapter');
    const savedScene = localStorage.getItem('currentScene');
    if (savedChapter && gameData[savedChapter]) {
        currentChapter = savedChapter;
        currentScene = parseInt(savedScene);
    }
}

// Save Progress
function saveProgress() {
    localStorage.setItem('currentChapter', currentChapter);
    localStorage.setItem('currentScene', currentScene);
}

// Show Scene
function showScene() {
    const chapter = gameData[currentChapter];
    const scene = chapter.scenes[currentScene];

    // Update Text
    document.getElementById('story-text').innerText = scene.text;

    // Update Image
    if (scene.image) {
        document.getElementById('story-image').style.backgroundImage = `url('${scene.image}')`;
    } else {
        document.getElementById('story-image').style.backgroundImage = 'none';
    }

    // Clear Choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    document.getElementById('next-button').style.display = 'none';

    // Display Choices
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.classList.add('choice-button');
            button.onclick = function() {
                currentScene = choice.nextScene;
                saveProgress();
                checkChapterCompletion();
                showScene();
            };
            choicesDiv.appendChild(button);
        });
    } else {
        // End of Chapter
        document.getElementById('next-button').style.display = 'block';
        document.getElementById('next-button').onclick = function() {
            unlockNextChapter();
        };
    }
}

// Check if Chapter is Completed
function checkChapterCompletion() {
    const chapter = gameData[currentChapter];
    if (currentScene >= chapter.scenes.length) {
        currentScene = 0;
        saveProgress();
        unlockNextChapter();
    }
}

// Unlock Next Chapter
function unlockNextChapter() {
    const chapters = Object.keys(gameData);
    const currentIndex = chapters.indexOf(currentChapter);
    const nextChapter = chapters[currentIndex + 1];

    if (nextChapter && gameData[nextChapter].locked) {
        gameData[nextChapter].locked = false;
        alert(`A new chapter "${gameData[nextChapter].title}" is now unlocked!`);
        currentChapter = nextChapter;
        currentScene = 0;
        saveProgress();
        showScene();
    } else {
        alert("You've completed all available chapters. Stay tuned for more adventures!");
    }
}

// Optionally, Add Audio Narration
function narrateText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
}

// Call narrateText inside showScene
function showScene() {
    // Previous code...
    document.getElementById('story-text').innerText = scene.text;
    narrateText(scene.text);
    // Rest of the code...
}
