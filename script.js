let sessionCounter = 0;

function generateTrades() {
    let table = document.getElementById("tradeTable");

    for (let i = 1; i <= 15; i++) {
        let row = document.createElement("div");
        row.className = "trade-row";

        row.innerHTML = `
            <span>Trade ${i}</span>
            <select>
                <option value="">-</option>
                <option value="win">Win</option>
                <option value="loss">Loss</option>
            </select>
        `;

        table.appendChild(row);
    }
}

function calculateStats() {
    let capital = parseFloat(initialCapital.value);
    let wins = parseInt(winTrades.value);
    let total = parseInt(totalTrades.value);
    let payout = parseFloat(payout.value);
    let stopLossPercent = parseFloat(stopLossPercent.value);
    let profitTarget = parseFloat(profitTarget.value);

    let winRate = (wins / total) * 100;
    winRateDisplay(winRate);

    let profitPerWin = capital * (payout / 100);
    let totalProfit = (profitPerWin * wins) - (capital * (total - wins));
    let growth = (totalProfit / capital) * 100;

    document.getElementById("accountGrowth").innerText =
        growth.toFixed(1) + "%";

    let stopLossAmount = capital * (stopLossPercent / 100);
    document.getElementById("stopLossAmount").innerText =
        "$" + stopLossAmount.toFixed(2);

    let sessionsNeeded = Math.ceil(profitTarget / totalProfit);
    document.getElementById("sessionsRequired").innerText =
        isFinite(sessionsNeeded) ? sessionsNeeded : 0;
}

function winRateDisplay(rate) {
    let element = document.getElementById("winRate");
    element.innerText = rate.toFixed(0) + "%";
}

function newSession() {
    sessionCounter++;
    document.getElementById("sessionCounter").innerText = sessionCounter;
    localStorage.setItem("sessionCounter", sessionCounter);
}

function clearSessions() {
    sessionCounter = 0;
    localStorage.clear();
    document.getElementById("sessionCounter").innerText = 0;
}

function resetAll() {
    location.reload();
}

window.onload = function() {
    generateTrades();

    if(localStorage.getItem("sessionCounter")) {
        sessionCounter = parseInt(localStorage.getItem("sessionCounter"));
        document.getElementById("sessionCounter").innerText = sessionCounter;
    }

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", calculateStats);
    });

    calculateStats();
}
