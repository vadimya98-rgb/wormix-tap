let player = JSON.parse(localStorage.getItem('wormixSave')) || {
    fuzes: 0, rubies: 0, race: '', boostMultiplier: 1, boostEndTime: 0,
    hats: [], artifacts: [], equippedHat: '', equippedArtifact: '', 
    hatTiers: {}, artifactTiers: {}, lastBonusTime: 0, bonusDay: 1
};

if (!player.equippedHat) player.equippedHat = '';
if (!player.equippedArtifact) player.equippedArtifact = '';
if (!player.hatTiers) player.hatTiers = {};
if (!player.artifactTiers) player.artifactTiers = {};
if (player.lastBonusTime === undefined) player.lastBonusTime = 0;
if (player.bonusDay === undefined) player.bonusDay = 1;

function saveGame() { localStorage.setItem('wormixSave', JSON.stringify(player)); }
function updateBalanceUI() {
    let fEl = document.getElementById('ui-fuzes'); let rEl = document.getElementById('ui-rubies');
    if (fEl) fEl.innerText = player.fuzes; if (rEl) rEl.innerText = player.rubies;
}
function getCurrentMultiplier() { if (Date.now() < player.boostEndTime) { return player.boostMultiplier; } else { return 1; } }
function startTimerUI(timerElementId) {
    let el = document.getElementById(timerElementId); if(!el) return;
    setInterval(() => {
        let timeLeft = player.boostEndTime - Date.now();
        if (timeLeft > 0) {
            let m = Math.floor(timeLeft / 60000); let s = Math.floor((timeLeft % 60000) / 1000);
            el.innerText = `Буст x${player.boostMultiplier}: ${m}м ${s}с`;
        } else { el.innerText = ''; player.boostMultiplier = 1; player.boostEndTime = 0; }
    }, 1000);
}
function showToast(message, isError = false) {
    let toast = document.getElementById('game-toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'game-toast'; toast.className = 'toast-msg'; document.body.appendChild(toast); }
    toast.innerText = message; toast.className = isError ? 'toast-msg show error' : 'toast-msg show';
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}
function getPrice(itemId, isHat) {
    let hash = 0; for (let i = 0; i < itemId.length; i++) { hash = itemId.charCodeAt(i) + ((hash << 5) - hash); } hash = Math.abs(hash);
    if (isHat) return 6000 + (hash % 4001); else return 5000 + (hash % 3001);
}
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

const allHats = {
    'alhimik': { name: 'Алхимик', img: 'images/hats/alhimik.png' }, 'assassin': { name: 'Ассасин', img: 'images/hats/assassin.png' },
    'captain': { name: 'Капитан', img: 'images/hats/captain.png' }, 'fantom': { name: 'Фантом', img: 'images/hats/fantom.png' },
    'gorayhii': { name: 'Горящий', img: 'images/hats/gorayhii.png' }, 'hacker': { name: 'Хакер', img: 'images/hats/hacker.png' },
    'iluzionist': { name: 'Иллюзионист', img: 'images/hats/iluzionist.png' }, 'imperator': { name: 'Император', img: 'images/hats/imperator.png' },
    'inzhiner': { name: 'Инженер', img: 'images/hats/inzhiner.png' }, 'izverg': { name: 'Изверг', img: 'images/hats/izverg.png' },
    'korol': { name: 'Король', img: 'images/hats/korol.png' }, 'krolik': { name: 'Кролик', img: 'images/hats/krolik.png' },
    'master_vetra': { name: 'Мастер Ветра', img: 'images/hats/master_vetra.png' }, 'okulayr': { name: 'Окуляр', img: 'images/hats/okulayr.png' },
    'paladin': { name: 'Паладин', img: 'images/hats/paladin.png' }, 'pirat': { name: 'Пират', img: 'images/hats/pirat.png' },
    'pobednui': { name: 'Победный', img: 'images/hats/pobednui.png' }, 'prizrak': { name: 'Призрак', img: 'images/hats/prizrak.png' },
    'psaiker': { name: 'Псайкер', img: 'images/hats/psaiker.png' }, 'respirator': { name: 'Респиратор', img: 'images/hats/respirator.png' },
    'samuray': { name: 'Самурай', img: 'images/hats/samuray.png' }, 'shaman_vudu': { name: 'Шаман Вуду', img: 'images/hats/shaman_vudu.png' },
    'shapka': { name: 'Шапка', img: 'images/hats/shapka.png' }, 'slem': { name: 'Шлем', img: 'images/hats/slem.png' },
    'spetsnaz': { name: 'Спецназ', img: 'images/hats/spetsnaz.png' }, 'strazgi': { name: 'Стражи', img: 'images/hats/strazgi.png' },
    'telepat': { name: 'Телепат', img: 'images/hats/telepat.png' }, 'temniy': { name: 'Темный', img: 'images/hats/temniy.png' },
    'viking': { name: 'Викинг', img: 'images/hats/viking.png' }, 'vor': { name: 'Вор', img: 'images/hats/vor.png' },
    'voron': { name: 'Ворон', img: 'images/hats/voron.png' }, 'yakudza': { name: 'Якудза', img: 'images/hats/yakudza.png' }
};

const allArtifacts = {
    'arhi': { name: 'Архи', img: 'images/artefacts/arhi.png' }, 'arkhidemon': { name: 'Архидемон', img: 'images/artefacts/arkhidemon.png' },
    'posoh': { name: 'Посох', img: 'images/artefacts/posoh.png' }, 'shit': { name: 'Щит', img: 'images/artefacts/shit.png' },
    'simbiot': { name: 'Симбиот', img: 'images/artefacts/simbiot.png' }, 'ucheniy': { name: 'Ученый', img: 'images/artefacts/ucheniy.png' },
    'zezl': { name: 'Жезл', img: 'images/artefacts/zezl.png' }
};

// =========================================================================
// НАСТРОЙКИ ДЛЯ КАЖДОЙ РАСЫ ОТДЕЛЬНО
// =========================================================================
const HAT_SETTINGS = {
    'images/dragon.png': {
        'alhimik': { w: 222, y: -57, x: 46 }, 'assassin': { w: 361, y: 38, x: 69 },
        'captain': { w: 220, y: 23, x: 51 }, 'fantom': { w: 244, y: 41, x: 52 },
        'gorayhii': { w: 304, y: -34, x: 56 }, 'hacker': { w: 204, y: 113, x: 51 },
        'iluzionist': { w: 343, y: -148, x: 45 }, 'imperator': { w: 337, y: -36, x: 69 },
        'inzhiner': { w: 290, y: 29, x: 60 }, 'izverg': { w: 236, y: 50, x: 57 },
        'korol': { w: 206, y: -21, x: 47 }, 'krolik': { w: 227, y: 25, x: 58 },
        'master_vetra': { w: 238, y: 19, x: 60 }, 'okulayr': { w: 226, y: 93, x: 51 },
        'paladin': { w: 220, y: -42, x: 56 }, 'pirat': { w: 220, y: -17, x: 50 },
        'pobednui': { w: 376, y: -96, x: 54 }, 'prizrak': { w: 220, y: 71, x: 50 },
        'psaiker': { w: 220, y: 21, x: 53 }, 'respirator': { w: 220, y: 122, x: 44 },
        'samuray': { w: 266, y: 61, x: 55 }, 'shaman_vudu': { w: 384, y: -56, x: 41 },
        'shapka': { w: 220, y: 60, x: 50 }, 'slem': { w: 249, y: 45, x: 55 },
        'spetsnaz': { w: 220, y: 60, x: 50 }, 'strazgi': { w: 220, y: 46, x: 48 },
        'telepat': { w: 330, y: 68, x: 66 }, 'temniy': { w: 330, y: -7, x: 69 },
        'viking': { w: 250, y: -12, x: 52 }, 'vor': { w: 275, y: 71, x: 62 },
        'voron': { w: 404, y: -107, x: 41 }, 'yakudza': { w: 220, y: 60, x: 50 }
    },
    'images/robot.png': {},
    'images/demon.png': {},
    'images/cat.png': {},
    'images/zombie.png': {},
    'images/dog.png': {},
    'images/rabit.png': {}
};

const ARTIFACT_SETTINGS = {
    'images/dragon.png': {
        'arhi': { w: 110, y: 21, x: 37 }, 'arkhidemon': { w: 140, y: 14, x: -9 },
        'posoh': { w: 152, y: 24, x: -9 }, 'shit': { w: 144, y: 14, x: 5 },
        'simbiot': { w: 79, y: 43, x: 89 }, 'ucheniy': { w: 94, y: 32, x: 101 },
        'zezl': { w: 85, y: 44, x: 62 }
    },
    'images/robot.png': {},
    'images/demon.png': {},
    'images/cat.png': {},
    'images/zombie.png': {},
    'images/dog.png': {},
    'images/rabit.png': {}
};
