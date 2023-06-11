const actionButtons = document.querySelectorAll(".hero-action");
const dialog = document.querySelector(".dialog");
const heroHPText = document.querySelector("#hero-hp");
const enemyHPText = document.querySelector("#enemy-hp");
let enemyHP = 100;
let heroHP = 100;

actionButtons.forEach(btn => btn.addEventListener("click", activateAction));

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
    }, 3000);
}