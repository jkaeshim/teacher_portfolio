export class GameEnv {
    // defined and current game levels
    static levels = [];
    static currentLevel = null;

    // active Game Objects
    static gameObjects = [];

    static gameSpeed = 2;
    static gravity = 3;
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom
    static floor;
    static prevFloor;
    static player;
    
    // calculated size properties
    static backgroundHeight = 0;
    static platformHeight = 0;

    // canvas filter property
    static isInverted = true;

    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    static update() {
        // Update game state, including all game objects
        for (const gameObject of GameEnv.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }
    }

     // Setter for Top position
     static setTop() {
        // set top of game as header height
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        }
    }

    // Setter for Bottom position
    static setBottom() {
        // sets the bottom or gravity 0
        this.bottom =
        this.backgroundHeight;
    }

    // Setter for Floor of player
    static setFloor() {
        // sets the bottom or gravity 0
        this.floor =
        this.backgroundHeight - this.platformHeight > this.top?
        this.backgroundHeight - this.platformHeight:
        this.backgroundHeight;
    }

    // Setup for Game Environment 
    static initialize() {
        // store previous for ratio calculatins on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
        this.prevFloor = this.floor;
    
        // game uses available width and heith
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        this.setTop();
        //this.setBottom(); // must be called in platformer objects
    }

    // Resize for Game Objects
    static resize() {
        GameEnv.initialize();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObject of GameEnv.gameObjects){
            gameObject.size();
        }
    }

    static update() {
        // Update game state, including all game objects
        for (const gameObject of GameEnv.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }
    }

    // Destroy all existing game objects
    static destroy() {
        // Destroy objects in reverse order
        for (var i = GameEnv.gameObjects.length - 1; i >= 0; i--) {
            const gameObject = GameEnv.gameObjects[i];
            gameObject.destroy();
        }
    }

    // Toggle "canvas filter property" between alien and normal
    static toggleInvert() {
        for (var gameObject of GameEnv.gameObjects){
            if (gameObject.invert && this.isInverted) {  // toggle off
                gameObject.canvas.style.filter = "none";  // remove filter
            } else if (gameObject.invert) { // toggle on
                gameObject.canvas.style.filter = "invert(100%)";  // remove filter
            } else {
                gameObject.canvas.style.filter = "none";  // remove filter
            }
        }
        this.isInverted = !this.isInverted;  // switch boolean value
    }
}

export default GameEnv;
