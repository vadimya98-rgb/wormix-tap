let player = JSON.parse(localStorage.getItem('wormixSave')) || {
    fuzes: 0, rubies: 0, race: '', 
    boostMultiplier: 1, boostEndTime: 0,
    hats: [], artifacts: [],
    equippedHat: '', equippedArtifact: '', craftsCount: 0 
};

if (!player.equippedHat) player.equippedHat = '';
if (!player.equippedArtifact) player.equippedArtifact = '';

function saveGame() {
    localStorage.setItem('wormixSave', JSON.stringify(player));
}

function updateBalanceUI() {
    let fEl = document.getElementById('ui-fuzes');
    let rEl = document.getElementById('ui-rubies');
    if (fEl) fEl.innerText = player.fuzes;
    if (rEl) rEl.innerText = player.rubies;
}

function getCurrentMultiplier() {
    if (Date.now() < player.boostEndTime) { return player.boostMultiplier; } 
    else { return 1; }
}

function startTimerUI(timerElementId) {
    let el = document.getElementById(timerElementId);
    if(!el) return;
    setInterval(() => {
        let timeLeft = player.boostEndTime - Date.now();
        if (timeLeft > 0) {
            let m = Math.floor(timeLeft / 60000);
            let s = Math.floor((timeLeft % 60000) / 1000);
            el.innerText = `Буст x${player.boostMultiplier}: ${m}м ${s}с`;
        } else {
            el.innerText = '';
            player.boostMultiplier = 1;
            player.boostEndTime = 0;
        }
    }, 1000);
}

// ФУНКЦИЯ ДЛЯ ВСПЛЫВАЮЩИХ УВЕДОМЛЕНИЙ
function showToast(message, isError = false) {
    let toast = document.getElementById('game-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'game-toast';
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = isError ? 'toast-msg show error' : 'toast-msg show';
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
