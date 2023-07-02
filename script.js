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
                text: "Performs a secret dance this hero practiced for decades"
            }
        ],
        bio: "The Wizard trained at the Shrine of Wisdom for many decades. While preferring peaceful resolutions, he's master deadly spells to use when needed.",
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
                text: "Screams to intimidate the enemy"
            }
        ],
        bio: "After serving for years as a knight to a foreign king, The Warrior decided to leave that comfortable life for one of adventure, and combat.",
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
                text: "Quickly stabs the enemy with an unavoidable attack"
            },
            {
                name: "Low blow",
                power: 36,
                accuracy: 0.7,
                text: "Goes for a low, but strong hit"
            },
            {
                name: "Hide",
                power: 200,
                accuracy: 0.1,
                text: "Tries to get out of sight and deal a deadly attack"
            }
        ],
        bio: "Born and raised in the streets of the capital, The Thief had to learn to survive by any means necessary. This made him tough, quiet, and deadly.",
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
                name: "Run",
                power: 200,
                accuracy: 0.1,
                text: "Tries to outrun the enemy"
            }
        ],
        bio: "The Archer grew up with elves, learning how to shoot a fly into a tree with an arrow, without killing it. He moves quickly and has a powerful arsenal.",
        source: "images/archer.png"
    },
};

const TIME_BETWEEN_TURNS = 300; // Use 3000 for normal gameplay

const enemy = "orc"; // since we only use one type of enemy
let hero;

const startScreen = document.getElementById("start-screen");
const selectionScreen = document.getElementById("selection");
const battleScreen = document.getElementById("battle");


// Start Screen

document.getElementById("start-btn").addEventListener("click", showSelectionScreen);

function showSelectionScreen() {
    startScreen.style.display = "none";
    battleScreen.style.display = "none";
    selectionScreen.style.display = "block";
    heroBio.textContent = "Click/Tap a hero to get to know them";
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
            <li>${characters[hero].moves[0].name} - Power: ${characters[hero].moves[0].power}, Accuracy: ${characters[hero].moves[0].accuracy * 100}</li>
            <li>${characters[hero].moves[1].name} - Power: ${characters[hero].moves[1].power}, Accuracy: ${characters[hero].moves[1].accuracy * 100}</li>
            <li>${characters[hero].moves[2].name} - ${characters[hero].moves[2].text}</li>
        </ul>
        <button id="start-battle">Battle as this hero!</button>
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

let enemyHP;
let heroHP;

actionButtons.forEach(btn => btn.addEventListener("click", activateAction));
actionButtons.forEach(btn => btn.addEventListener("mouseover", showDescription));
resetBtn.addEventListener("click", resetBattle);
changeHeroBtn.addEventListener("click", showSelectionScreen);

function setupBattle() {
    selectionScreen.style.display = "none";
    battleScreen.style.display = "block";
    enemyHP = characters[enemy].stats.hp;
    heroHP = characters[hero].stats.hp;
    document.getElementById("initial-enemy-hp").textContent = enemyHP;
    document.getElementById("initial-hero-hp").textContent = heroHP;
    enemyHPText.textContent = enemyHP;
    heroHPText.textContent = heroHP;
    actionButtons.forEach((btn, i) => {
        btn.textContent = characters[hero].moves[i].name;
    });
    document.getElementById("hero").src = characters[hero].source;
    actionDescription.textContent = "Choose an action";
    dialog.textContent = "An angry orc has spotted you! Quick, do something!";
    actionButtons.forEach(btn => btn.disabled = false);
    resetBtn.style.display = "none";
    changeHeroBtn.style.display = "none";
}

function activateAction(e) {
    console.log(e.target.value);
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
        actionDescription.textContent = "Choose an action";
    }, TIME_BETWEEN_TURNS);
}

function showDescription(e) {
    actionDescription.textContent = e.target.value == 3 ?
        characters[hero].moves[e.target.value - 1].text :
        `Power: ${characters[hero].moves[e.target.value - 1].power},
        Accuracy: ${Math.round(characters[hero].moves[e.target.value - 1].accuracy * 100)}%`;
}

function endBattle() {
    dialog.textContent = heroHP <= 0 ? `The ${hero} can't keep fighting and falls heroically in battle...` :
        `You defeated the mighty ${enemy}! You're amazing!`;
    actionDescription.textContent = "";
    resetBtn.style.display = "inline";
    changeHeroBtn.style.display = "inline";
}

function resetBattle(e) {
    enemyHP = characters[enemy].stats.hp;
    heroHP = characters[hero].stats.hp;
    enemyHPText.textContent = enemyHP;
    heroHPText.textContent = heroHP;
    actionDescription.textContent = "Choose an action";
    dialog.textContent = "An angry orc has spotted you! Quick, do something!";
    actionButtons.forEach(btn => btn.disabled = false);
    resetBtn.style.display = "none";
    changeHeroBtn.style.display = "none";
}

function calculateDamage(user, target, move) {
    let power = characters[user].moves[move].power;
    let attack = characters[user].stats.attack;
    let defense = characters[target].stats.defense;
    let rand = Math.random() * 0.4 + 0.8;
    return Math.round(power * attack / defense * rand);
}
