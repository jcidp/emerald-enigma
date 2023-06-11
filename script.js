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
    enemyHP -= 20;
    enemyHPText.textContent = enemyHP;
    setTimeout(enemyAction, 3000);
}

function enemyAction() {
    dialog.textContent = "The orc gets angrier and strikes back!";
    heroHP -= 20;
    heroHPText.textContent = heroHP;
    setTimeout(() => {
        actionButtons.forEach(btn => btn.disabled = false);
        dialog.textContent = "What will you do next?";
        actionDescription.textContent = "Choose an action";
    }, 3000);
}

function showDescription(e) {
    actionDescription.textContent = actionDescriptions.wizard[e.target.value - 1];
}