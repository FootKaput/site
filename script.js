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
            // Scene 4
            {
                text: "You dance joyfully with the stars, feeling their warmth and sparkle.",
                image: 'images/dancing-stars.jpg',
                choices: [
                    { text: "Ask the Stars About Your Tail", nextScene: 13 },
                    { text: "Thank Them and Move On", nextScene: 5 },
                    { text: "Invite Them to Join You", nextScene: 14 }
                ]
            },
            // Scene 5
            {
                text: "You keep following the stars, hopeful they will lead you to your tail.",
                image: 'images/star-path.jpg',
                choices: [
                    { text: "Sing a Song as You Go", nextScene: 15 },
                    { text: "Walk Quietly", nextScene: 6 },
                    { text: "Collect Sparkles", nextScene: 10 }
                ]
            },
            // Scene 6
            {
                text: "You take a rest, gazing at the beautiful universe around you.",
                image: 'images/resting-comet.jpg',
                choices: [
                    { text: "Close Your Eyes for a Moment", nextScene: 16 },
                    { text: "Continue Your Journey", nextScene: 5 },
                    { text: "Make a Wish", nextScene: 17 }
                ]
            },
            // Scene 7
            {
                text: "The Moon shares ancient wisdom, guiding you toward a place where lost things are found.",
                image: 'images/moon-advice.jpg',
                choices: [
                    { text: "Thank the Moon", nextScene: 8 },
                    { text: "Head to the Place Mentioned", nextScene: 18 },
                    { text: "Ask More Questions", nextScene: 19 }
                ]
            },
            // Scene 8
            {
                text: "You thank the Moon and continue on your journey, feeling hopeful.",
                image: 'images/hopeful-comet.jpg',
                choices: [
                    { text: "Follow a Shooting Star", nextScene: 20 },
                    { text: "Glide Toward a Nebula", nextScene: 21 },
                    { text: "Explore a Nearby Planet", nextScene: 22 }
                ]
            },
            // Scene 9
            {
                text: "You share a delightful story with the Moon, and both of you laugh together.",
                image: 'images/laughing-moon.jpg',
                choices: [
                    { text: "Say Goodbye and Continue", nextScene: 8 },
                    { text: "Ask for Advice", nextScene: 7 },
                    { text: "Stay a Little Longer", nextScene: 23 }
                ]
            },
            // Add more scenes up to at least the highest nextScene value used
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
    const savedChapter = localStorage.getItem('currentChapter');
    const savedScene = localStorage.getItem('currentScene');
    if (savedChapter && gameData[savedChapter]) {
        currentChapter = savedChapter;
        currentScene = parseInt(savedScene, 10) || 0;
    } else {
        currentChapter = 'chapter1';
        currentScene = 0;
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
        // No choices; end of scene or chapter
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
        // Unlock next chapter
        gameData[nextChapter].locked = false;
        alert(`A new chapter, "${gameData[nextChapter].title}", is now unlocked!`);
        // Start the next chapter
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
