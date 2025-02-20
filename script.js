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
            // Additional scenes as needed...
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

    // Optional: Narrate the text
    narrateText(scene.text);

    // Clear Choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    // Hide Next Button
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
                showScene();
            };
            choicesDiv.appendChild(button);
        });
    } else {
        // No choices, end of chapter or scene
        const nextButton = document.getElementById('next-button');
        nextButton.style.display = 'block';
        nextButton.onclick = function() {
            unlockNextChapter();
        };
    }
}

// Unlock Next Chapter
function unlockNextChapter() {
    const chapters = Object.keys(gameData);
    const currentIndex = chapters.indexOf(currentChapter);
    const nextChapter = chapters[currentIndex + 1];

    if (nextChapter && gameData[nextChapter].locked) {
        // Unlock next chapter after a delay or condition
        gameData[nextChapter].locked = false;
        alert(`A new chapter "${gameData[nextChapter].title}" is now unlocked!`);
        // Reset to the beginning of the new chapter
        currentChapter = nextChapter;
        currentScene = 0;
        saveProgress();
        showScene();
    } else {
        alert("You've completed all available chapters. Check back later for more adventures!");
    }
}

// Optional: Narrate Text
function narrateText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
}

// Optionally, unlock chapters over time
function unlockChapterAfterDelay(chapterName, delayInSeconds) {
    setTimeout(() => {
        if (gameData[chapterName].locked) {
            gameData[chapterName].locked = false;
            alert(`Chapter "${gameData[chapterName].title}" is now unlocked!`);
        }
    }, delayInSeconds * 1000);
}

// Example: Unlock Chapter 2 after 60 seconds (adjust as needed)
unlockChapterAfterDelay('chapter2', 60);
