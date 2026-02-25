let capital = 0;
let baseTrade = 0;
let currentTrade = 0;
let payout = 0;
let wins = 0;
let losses = 0;
let step = 0;

let martingaleEnabled = false;
let multiplier = 2;
let maxSteps = 5;

function startSession() {

    capital = parseFloat(initialCapital.value);
    baseTrade = parseFloat(baseTrade.value);
    payout = parseFloat(payout.value);

    martingaleEnabled = martingaleToggle.checked;
    multiplier = parseFloat(martingaleMultiplier.value);
    maxSteps = parseInt(maxSteps.value);

    currentTrade = baseTrade;
    wins = 0;
    losses = 0;
    step = 0;

    updateUI();
}

function addWin() {

    let profitAmount = currentTrade * (payout / 100);
    capital += profitAmount;
    wins++;

    if (martingaleEnabled) {
        currentTrade = baseTrade;
        step = 0;
    }

    checkLimits();
    updateUI();
}

function addLoss() {

    capital -= currentTrade;
    losses++;

    if (martingaleEnabled) {
        step++;
        if (step < maxSteps) {
            currentTrade *= multiplier;
        } else {
            currentTrade = baseTrade;
            step = 0;
        }
    }

    checkLimits();
    updateUI();
}

function checkLimits() {

    let profit = capital - parseFloat(initialCapital.value);
    let stopLossAmount = parseFloat(initialCapital.value) *
        (parseFloat(stopLossPercent.value) / 100);

    if (profit >= parseFloat(profitTarget.value)) {
        alert("🎯 Profit Target Reached");
    }

    if (capital <= parseFloat(initialCapital.value) - stopLossAmount) {
        alert("🚨 Stop Loss Hit");
    }
}

function updateUI() {

    let totalTrades = wins + losses;
    let winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

    document.getElementById("capital").innerText = capital.toFixed(2);
    document.getElementById("currentTrade").innerText = currentTrade.toFixed(2);
    document.getElementById("profit").innerText =
        (capital - parseFloat(initialCapital.value)).toFixed(2);
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    document.getElementById("winRate").innerText = winRate.toFixed(1) + "%";
}
