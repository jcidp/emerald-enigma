const actionDescriptions = {
    wizard: [
        "Releases a bolt of lightning that damages the enemy. Does 20 hp of damage and always hits.",
        "Creates a deep fog that makes it harder for enemies to hit you.",
        "A powerful attack that does 40 hp damage, but has an accuracy of 60%.",
        "This wizard spent two decades perfecting this ancient dance move in the Shrine of Wisdom. It's unlikely to help, but you never know."
        ]
};

const actionButtons = document.querySelectorAll(".hero-action");
const dialog = document.querySelector(".dialog");
const heroHPText = document.querySelector("#hero-hp");
const enemyHPText = document.querySelector("#enemy-hp");
const actionDescription = document.querySelector(".action-description");
let enemyHP = 100;
let heroHP = 100;

actionButtons.forEach(btn => btn.addEventListener("click", activateAction));
actionButtons.forEach(btn => btn.addEventListener("mouseover", showDescription));

function activateAction(e) {
    console.log(e.target.value);
    actionButtons.forEach(btn => btn.disabled = true);
    dialog.textContent = "Your hero hits the enemy with a devastating attack!";
    enemyHP = Math.max(enemyHP - 60, 0);
    enemyHPText.textContent = enemyHP;
    setTimeout(enemyAction, 3000);
}

function enemyAction() {
    if (enemyHP <= 0) return endBattle();
    dialog.textContent = "The orc gets angrier and strikes back!";
    heroHP = Math.max(heroHP - 20, 0);
    heroHPText.textContent = heroHP;
    setTimeout(() => {
        if (heroHP <= 0) return endBattle;
        actionButtons.forEach(btn => btn.disabled = false);
        dialog.textContent = "What will you do next?";
        actionDescription.textContent = "Choose an action";
    }, 3000);
}

function showDescription(e) {
    actionDescription.textContent = actionDescriptions.wizard[e.target.value - 1];
}

function endBattle() {
    dialog.textContent = heroHP <= 0 ? "The hero can't keep fighting and falls in battle" :
        "You defeated the mighty orc! You're amazing!";
    actionDescription.textContent = "";
    let resetBtn = document.createElement("button");
    resetBtn.textContent = "Fight again!"
    resetBtn.addEventListener("click", resetBattle);
    document.querySelector(".battle-menu").appendChild(resetBtn);
}

function resetBattle(e) {
    enemyHP = 100;
    heroHP = 100;
    enemyHPText.textContent = enemyHP;
    heroHPText.textContent = heroHP;
    actionDescription.textContent = "Choose an action";
    dialog.textContent = "An angry orc has spotted you! Quick, do something!";
    actionButtons.forEach(btn => btn.disabled = false);
    document.querySelector(".battle-menu").removeChild(e.target);
}