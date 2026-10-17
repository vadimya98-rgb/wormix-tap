let player = JSON.parse(localStorage.getItem('wormixSave')) || {
    fuzes: 0, rubies: 0, race: '', 
    boostMultiplier: 1, boostEndTime: 0,
    hats: [], artifacts: [],
    equippedHat: '', equippedArtifact: '', 
    hatTiers: {}, artifactTiers: {}
};

if (!player.equippedHat) player.equippedHat = '';
if (!player.equippedArtifact) player.equippedArtifact = '';
if (!player.hatTiers) player.hatTiers = {};
if (!player.artifactTiers) player.artifactTiers = {};

function saveGame() { localStorage.setItem('wormixSave', JSON.stringify(player)); }

function updateBalanceUI() {
    let fEl = document.getElementById('ui-fuzes');
    let rEl = document.getElementById('ui-rubies');
    if (fEl) fEl.innerText = player.fuzes;
    if (rEl) rEl.innerText = player.rubies;
}

function getCurrentMultiplier() {
    if (Date.now() < player.boostEndTime) { return player.boostMultiplier; } else { return 1; }
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
            el.innerText = ''; player.boostMultiplier = 1; player.boostEndTime = 0;
        }
    }, 1000);
}

function showToast(message, isError = false) {
    let toast = document.getElementById('game-toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'game-toast'; toast.className = 'toast-msg'; document.body.appendChild(toast); }
    toast.innerText = message;
    toast.className = isError ? 'toast-msg show error' : 'toast-msg show';
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

// Базовый URL для картинок (чтобы не было путаницы с путями)
const baseUrl = "https://vadimya98-rgb.github.io/wormix-tap/";

// --- БАЗА ВСЕХ ШАПОК ---
const allHats = {
    'alhimik': { name: 'Алхимик', img: baseUrl + 'images/hats/alhimik.png' },
    'assassin': { name: 'Ассасин', img: baseUrl + 'images/hats/assassin.png' },
    'captain': { name: 'Капитан', img: baseUrl + 'images/hats/captain.png' },
    'fantom': { name: 'Фантом', img: baseUrl + 'images/hats/fantom.png' },
    'gorayhii': { name: 'Горящий', img: baseUrl + 'images/hats/gorayhii.png' },
    'hacker': { name: 'Хакер', img: baseUrl + 'images/hats/hacker.png' },
    'iluzionist': { name: 'Иллюзионист', img: baseUrl + 'images/hats/iluzionist.png' },
    'imperator': { name: 'Император', img: baseUrl + 'images/hats/imperator.png' },
    'inzhiner': { name: 'Инженер', img: baseUrl + 'images/hats/inzhiner.png' },
    'izverg': { name: 'Изверг', img: baseUrl + 'images/hats/izverg.png' },
    'korol': { name: 'Король', img: baseUrl + 'images/hats/korol.png' },
    'krolik': { name: 'Кролик', img: baseUrl + 'images/hats/krolik.png' },
    'master_vetra': { name: 'Мастер Ветра', img: baseUrl + 'images/hats/master_vetra.png' },
    'okulyar': { name: 'Окуляр', img: baseUrl + 'images/hats/okulyar.png' },
    'paladin': { name: 'Паладин', img: baseUrl + 'images/hats/paladin.png' },
    'pirat': { name: 'Пират', img: baseUrl + 'images/hats/pirat.png' },
    'pobednui': { name: 'Победный', img: baseUrl + 'images/hats/pobednui.png' },
    'prizrak': { name: 'Призрак', img: baseUrl + 'images/hats/prizrak.png' },
    'psaiker': { name: 'Псайкер', img: baseUrl + 'images/hats/psaiker.png' },
    'respirator': { name: 'Респиратор', img: baseUrl + 'images/hats/respirator.png' },
    'samuray': { name: 'Самурай', img: baseUrl + 'images/hats/samuray.png' },
    'shaman_vudu': { name: 'Шаман Вуду', img: baseUrl + 'images/hats/shaman_vudu.png' },
    'shapka': { name: 'Шапка', img: baseUrl + 'images/hats/shapka.png' },
    'slem': { name: 'Шлем', img: baseUrl + 'images/hats/slem.png' },
    'spetsnaz': { name: 'Спецназ', img: baseUrl + 'images/hats/spetsnaz.png' },
    'strazgi': { name: 'Стражи', img: baseUrl + 'images/hats/strazgi.png' },
    'telepat': { name: 'Телепат', img: baseUrl + 'images/hats/telepat.png' },
    'temniy': { name: 'Темный', img: baseUrl + 'images/hats/temniy.png' },
    'viking': { name: 'Викинг', img: baseUrl + 'images/hats/viking.png' },
    'vor': { name: 'Вор', img: baseUrl + 'images/hats/vor.png' },
    'voron': { name: 'Ворон', img: baseUrl + 'images/hats/voron.png' },
    'yakudza': { name: 'Якудза', img: baseUrl + 'images/hats/yakudza.png' }
};

// --- БАЗА ВСЕХ АРТЕФАКТОВ ---
const allArtifacts = {
    'arhi': { name: 'Архи', img: baseUrl + 'images/artefacts/arhi.png' },
    'arkhidemon': { name: 'Архидемон', img: baseUrl + 'images/artefacts/arkhidemon.png' },
    'posoh': { name: 'Посох', img: baseUrl + 'images/artefacts/posoh.png' },
    'shit': { name: 'Щит', img: baseUrl + 'images/artefacts/shit.png' },
    'simbiot': { name: 'Симбиот', img: baseUrl + 'images/artefacts/simbiot.png' },
    'ucheniy': { name: 'Ученый', img: baseUrl + 'images/artefacts/ucheniy.png' },
    'zezl': { name: 'Жезл', img: baseUrl + 'images/artefacts/zezl.png' }
};
