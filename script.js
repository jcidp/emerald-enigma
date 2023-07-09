const characters = {
    wizard: {
        stats: {
            attack: 120,
            defense: 100,
            hp: 80
        },
        moves: [
            {
                name: "Thunderbolt",
                power: 25,
                accuracy: 1,
                text: "Shoots a bolt of lightning towards the enemy"
            },
            {
                name: "Fireball",
                power: 50,
                accuracy: 0.5,
                text: "Throws a powerful fireball at the enemy"
            },
            {
                name: "Dance",
                power: 200,
                accuracy: 0.1,
                text: "Performs a powerful ancient dance"
            }
        ],
        bio: "The Wizard trained at the Shrine of Wisdom for decades, perfecting his deadly spells.",
        source: "images/wizard.png"
    },
    orc: {
        stats: {
            attack: 100,
            defense: 100,
            hp: 120
        },
        moves: [
            {
                name: "Smash",
                power: 25,
                accuracy: 1,
                text: "Smashes you with great strength"
            },
            {
                name: "Rock Throw",
                power: 30,
                accuracy: 0.75,
                text: "Throws a huge rock at you"
            }
        ]
    },
    warrior: {
        stats: {
            attack: 80,
            defense: 100,
            hp: 120
        },
        moves: [
            {
                name: "Slash",
                power: 25,
                accuracy: 1,
                text: "Slashes the enemy with a fierce strike"
            },
            {
                name: "Whirlwind",
                power: 31,
                accuracy: 0.8,
                text: "Spins, throwing a series of attacks"
            },
            {
                name: "Scream",
                power: 200,
                accuracy: 0.1,
                text: "Attempts to intimidate the enemy"
            }
        ],
        bio: "The Warrior served for years as a knight to a foreign king, but left for a life of adventure.",
        source: "images/warrior.png"
    },
    thief: {
        stats: {
            attack: 100,
            defense: 100,
            hp: 100
        },
        moves: [
            {
                name: "Stab",
                power: 25,
                accuracy: 1,
                text: "Quickly stabs the enemy with a piercing attack"
            },
            {
                name: "Low Blow",
                power: 36,
                accuracy: 0.7,
                text: "Goes for a low, but strong hit"
            },
            {
                name: "Hide",
                power: 200,
                accuracy: 0.1,
                text: "Attempts to get out of sight and attack"
            }
        ],
        bio: "The Thief was born and raised in the streets of the capital, learning to survive by any means necessary.",
        source: "images/thief.png"
    },
    archer: {
        stats: {
            attack: 120,
            defense: 80,
            hp: 100
        },
        moves: [
            {
                name: "Shoot Arrow",
                power: 25,
                accuracy: 1,
                text: "Shoots an arrow straight towards the enemy"
            },
            {
                name: "Throw Bomb",
                power: 42,
                accuracy: 0.6,
                text: "Throws a bomb at the enemy's face"
            },
            {
                name: "Climb Tree",
                power: 200,
                accuracy: 0.1,
                text: "Tries to attack the enemy from above"
            }
        ],
        bio: "The Archer grew up with elves, who trained him to be agile and an expert marksman.",
        source: "images/archer.png"
    },
};

const TIME_BETWEEN_TURNS = 3000; // Use 3000 for normal gameplay

const enemy = "orc"; // since we only use one type of enemy
let hero;

const startScreen = document.getElementById("start-screen");
const selectionScreen = document.getElementById("selection");
const battleScreen = document.getElementById("battle");

addEventListener("DOMContentLoaded", loadImages);

// Load other images after start screen background loads
function loadImages() {
    console.log("Loading images...");
    document.querySelector("#thief>img").src = "images/thief.png";
    document.querySelector("#warrior>img").src = "images/warrior.png";
    document.querySelector("#wizard>img").src = "images/wizard.png";
    document.querySelector("#archer>img").src = "images/archer.png";
    document.getElementById("bg").src = "images/monster_in_jungle.png";
}

// Start Screen

document.getElementById("start-btn").addEventListener("click", showSelectionScreen);

function showSelectionScreen() {
    document.querySelector("header").style.display = "none";
    startScreen.style.display = "none";
    battleScreen.style.display = "none";
    selectionScreen.style.display = "block";
    heroBio.textContent = "Select a hero to get to know them";
}

// Hero Selection

const heroes = document.querySelectorAll(".hero");
const heroBio = document.getElementById("hero-bio");

heroes.forEach(hero => hero.addEventListener("click", showBio));

function showBio(e) {
    //heroBio.textContent = characters[this.id].bio;
    hero = this.id;
    heroBio.innerHTML = `
        <p>${characters[hero].bio}</p>
        <span>Stats:</span>
        <ul class="hero-bio stats">
            <li>HP: ${characters[hero].stats.hp}</li>
            <li>Attack: ${characters[hero].stats.attack}</li>
            <li>Defense: ${characters[hero].stats.defense}</li>
        </ul>
        <span>Moves:</span>
        <ul class="hero-bio moves">
            <li>${characters[hero].moves[0].name}: ${characters[hero].moves[0].power} power, ${characters[hero].moves[0].accuracy * 100}% accuracy</li>
            <li>${characters[hero].moves[1].name}: ${characters[hero].moves[1].power} power, ${characters[hero].moves[1].accuracy * 100}% accuracy</li>
            <li>${characters[hero].moves[2].name}: ${characters[hero].moves[2].text}</li>
        </ul>
        <button id="start-battle">Battle as this hero</button>
    `;
    document.getElementById("start-battle").addEventListener("click", setupBattle);
}

// Battle Simulator
const actionButtons = document.querySelectorAll(".hero-action");
const dialog = document.querySelector(".dialog");
const heroHPText = document.querySelector("#hero-hp");
const enemyHPText = document.querySelector("#enemy-hp");
const actionDescription = document.querySelector(".action-description");
const resetBtn = document.querySelector(".battle-end.reset");
const changeHeroBtn = document.querySelector(".battle-end.change-hero");
const heroActions = document.querySelector(".hero-action-container");
const battleEnd = document.querySelector(".battle-end-container");

let enemyHP;
let heroHP;

actionButtons.forEach(btn => btn.addEventListener("click", activateAction));
resetBtn.addEventListener("click", resetBattle);
changeHeroBtn.addEventListener("click", showSelectionScreen);

function setupBattle() {
    selectionScreen.style.display = "none";
    battleScreen.style.display = "grid";
    enemyHP = characters[enemy].stats.hp;
    heroHP = characters[hero].stats.hp;
    document.getElementById("initial-enemy-hp").textContent = enemyHP;
    document.getElementById("initial-hero-hp").textContent = heroHP;
    actionButtons.forEach((btn, i) => {
        btn.textContent = characters[hero].moves[i].name;
    });
    document.getElementById("hero").src = characters[hero].source;
    resetBattle();
}

function activateAction(e) {
    actionButtons.forEach(btn => btn.disabled = true);
    let hit = characters[hero].moves[e.target.value - 1].accuracy > Math.random();
    let damage = hit ? calculateDamage(hero, enemy, e.target.value - 1) : 0;
    dialog.textContent = `The ${hero} ${characters[hero].moves[e.target.value - 1].text.toLowerCase()}. ` +
        `It ${hit ? "hits" : "misses"} for ${damage} damage!`;
    enemyHP = Math.max(enemyHP - damage, 0);
    enemyHPText.textContent = enemyHP;
    setTimeout(enemyAction, TIME_BETWEEN_TURNS);
}

function enemyAction() {
    if (enemyHP <= 0) return endBattle();
    let enemyMove = Math.round(Math.random());
    let hit = characters[enemy].moves[enemyMove].accuracy > Math.random();
    let damage = hit ? calculateDamage(enemy, hero, enemyMove) : 0;
    dialog.textContent = `The ${enemy} ${characters[enemy].moves[enemyMove].text.toLowerCase()}. ` +
        `It ${hit ? "hits" : "misses"} for ${damage} damage!`;
    heroHP = Math.max(heroHP - damage, 0);
    heroHPText.textContent = heroHP;
    setTimeout(() => {
        if (heroHP <= 0) return endBattle();
        actionButtons.forEach(btn => btn.disabled = false);
        dialog.textContent = "What will you do next?";
    }, TIME_BETWEEN_TURNS);
}

function loadDescriptions() {
    // document.querySelectorAll(".move-description").forEach((move, i) => {
    //     move.textContent = `${characters[hero].moves[i].name} - ` +
    //         i === 2 ? `${characters[hero].moves[2].text}` :
    //         `Pow: ${characters[hero].moves[i].power}, Acc: ${characters[hero].moves[i].accuracy * 100}%`
    // });
    // actionDescription.textContent = e.target.value == 3 ?
    //     characters[hero].moves[e.target.value - 1].text :
    //     `Power: ${characters[hero].moves[e.target.value - 1].power},
    //     Accuracy: ${Math.round(characters[hero].moves[e.target.value - 1].accuracy * 100)}%`;
    actionDescription.innerHTML = `
        <ol>
            <li class="move-description one"><b>${characters[hero].moves[0].name}</b>: ${characters[hero].moves[0].power} pow, ${characters[hero].moves[0].accuracy * 100}% acc</li>
            <li class="move-description two"><b>${characters[hero].moves[1].name}</b>: ${characters[hero].moves[1].power} pow, ${characters[hero].moves[1].accuracy * 100}% acc</li>
            <li class="move-description three"><b>${characters[hero].moves[2].name}</b>: ${characters[hero].moves[2].text}</li>
        </ol>
    `;    
}

function endBattle() {
    dialog.textContent = heroHP <= 0 ? `The ${hero} can't keep fighting and falls heroically in battle...` :
        `You defeated the mighty ${enemy}! You're amazing!`;
    actionDescription.textContent = "";
    heroActions.style.display = "none";
    battleEnd.style.display = "grid";
}

function resetBattle(e) {
    enemyHP = characters[enemy].stats.hp;
    heroHP = characters[hero].stats.hp;
    enemyHPText.textContent = enemyHP;
    heroHPText.textContent = heroHP;
    loadDescriptions();
    dialog.textContent = "An angry orc has spotted you! Quick, do something!";
    actionButtons.forEach(btn => btn.disabled = false);
    heroActions.style.display = "grid";
    battleEnd.style.display = "none";
}

function calculateDamage(user, target, move) {
    let power = characters[user].moves[move].power;
    let attack = characters[user].stats.attack;
    let defense = characters[target].stats.defense;
    let rand = Math.random() * 0.4 + 0.8;
    return Math.round(power * attack / defense * rand);
}
