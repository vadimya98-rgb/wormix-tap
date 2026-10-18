let player = JSON.parse(localStorage.getItem('wormixSave')) || {
    fuzes: 0, rubies: 0, race: '', 
    boostMultiplier: 1, boostEndTime: 0,
    hats: [], artifacts: [],
    equippedHat: '', equippedArtifact: '', 
    hatTiers: {}, artifactTiers: {},
    lastBonusTime: 0,
    bonusDay: 1
};

if (!player.equippedHat) player.equippedHat = '';
if (!player.equippedArtifact) player.equippedArtifact = '';
if (!player.hatTiers) player.hatTiers = {};
if (!player.artifactTiers) player.artifactTiers = {};
if (player.lastBonusTime === undefined) player.lastBonusTime = 0;
if (player.bonusDay === undefined) player.bonusDay = 1;

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

// ФУНКЦИЯ ГЕНЕРАЦИИ ЦЕНЫ (Стабильная)
function getPrice(itemId, isHat) {
    let hash = 0;
    for (let i = 0; i < itemId.length; i++) {
        hash = itemId.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    
    if (isHat) return 6000 + (hash % 4001);
    else return 5000 + (hash % 3001);
}

document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

// ТЕПЕРЬ ОТНОСИТЕЛЬНЫЕ ПУТИ ДЛЯ ОФЛАЙН-ИГРЫ
const allHats = {
    'alhimik': { name: 'Алхимик', img: 'images/hats/alhimik.png' },
    'assassin': { name: 'Ассасин', img: 'images/hats/assassin.png' },
    'captain': { name: 'Капитан', img: 'images/hats/captain.png' },
    'fantom': { name: 'Фантом', img: 'images/hats/fantom.png' },
    'gorayhii': { name: 'Горящий', img: 'images/hats/gorayhii.png' },
    'hacker': { name: 'Хакер', img: 'images/hats/hacker.png' },
    'iluzionist': { name: 'Иллюзионист', img: 'images/hats/iluzionist.png' },
    'imperator': { name: 'Император', img: 'images/hats/imperator.png' },
    'inzhiner': { name: 'Инженер', img: 'images/hats/inzhiner.png' },
    'izverg': { name: 'Изверг', img: 'images/hats/izverg.png' },
    'korol': { name: 'Король', img: 'images/hats/korol.png' },
    'krolik': { name: 'Кролик', img: 'images/hats/krolik.png' },
    'master_vetra': { name: 'Мастер Ветра', img: 'images/hats/master_vetra.png' },
    'okulyar': { name: 'Окуляр', img: 'images/hats/okulyar.png' },
    'paladin': { name: 'Паладин', img: 'images/hats/paladin.png' },
    'pirat': { name: 'Пират', img: 'images/hats/pirat.png' },
    'pobednui': { name: 'Победный', img: 'images/hats/pobednui.png' },
    'prizrak': { name: 'Призрак', img: 'images/hats/prizrak.png' },
    'psaiker': { name: 'Псайкер', img: 'images/hats/psaiker.png' },
    'respirator': { name: 'Респиратор', img: 'images/hats/respirator.png' },
    'samuray': { name: 'Самурай', img: 'images/hats/samuray.png' },
    'shaman_vudu': { name: 'Шаман Вуду', img: 'images/hats/shaman_vudu.png' },
    'shapka': { name: 'Шапка', img: 'images/hats/shapka.png' },
    'slem': { name: 'Шлем', img: 'images/hats/slem.png' },
    'spetsnaz': { name: 'Спецназ', img: 'images/hats/spetsnaz.png' },
    'strazgi': { name: 'Стражи', img: 'images/hats/strazgi.png' },
    'telepat': { name: 'Телепат', img: 'images/hats/telepat.png' },
    'temniy': { name: 'Темный', img: 'images/hats/temniy.png' },
    'viking': { name: 'Викинг', img: 'images/hats/viking.png' },
    'vor': { name: 'Вор', img: 'images/hats/vor.png' },
    'voron': { name: 'Ворон', img: 'images/hats/voron.png' },
    'yakudza': { name: 'Якудза', img: 'images/hats/yakudza.png' }
};

const allArtifacts = {
    'arhi': { name: 'Архи', img: 'images/artefacts/arhi.png' },
    'arkhidemon': { name: 'Архидемон', img: 'images/artefacts/arkhidemon.png' },
    'posoh': { name: 'Посох', img: 'images/artefacts/posoh.png' },
    'shit': { name: 'Щит', img: 'images/artefacts/shit.png' },
    'simbiot': { name: 'Симбиот', img: 'images/artefacts/simbiot.png' },
    'ucheniy': { name: 'Ученый', img: 'images/artefacts/ucheniy.png' },
    'zezl': { name: 'Жезл', img: 'images/artefacts/zezl.png' }
};
