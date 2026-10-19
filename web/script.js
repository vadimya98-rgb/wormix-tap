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
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

// =========================================================================
// НОВАЯ БАЗА ДАННЫХ ПРЕДМЕТОВ
// =========================================================================
const allItemsConfig = {};
const hatIdsOrder = [
    'shapka', 'krolik', 'pirat', 'hacker', 'viking', 'strazgi', 'samuray', 'temniy', 
    'paladin', 'vor', 'assassin', 'iluzionist', 'captain', 'fantom', 'inzhiner', 'okulayr', 
    'izverg', 'telepat', 'alhimik', 'psaiker', 'master_vetra', 'prizrak', 'imperator', 'respirator', 
    'slem', 'spetsnaz', 'gorayhii', 'voron', 'shaman_vudu', 'yakudza', 'korol'
];
let player = JSON.parse(localStorage.getItem('wormixSave')) || {
    fuzes: 0, rubies: 0, race: '', boostMultiplier: 1, boostEndTime: 0,
    hats: [], artifacts: [], equippedHat: '', equippedArtifact: '', 
    hatTiers: {}, artifactTiers: {}, lastBonusTime: 0, bonusDay: 1
};

// ЗАЩИТА ОТ СТАРЫХ СОХРАНЕНИЙ
if (!Array.isArray(player.hats)) player.hats = Object.keys(player.hats || {});
if (!Array.isArray(player.artifacts)) player.artifacts = Object.keys(player.artifacts || {});
if (typeof player.hatTiers !== 'object' || player.hatTiers === null) player.hatTiers = {};
if (typeof player.artifactTiers !== 'object' || player.artifactTiers === null) player.artifactTiers = {};
if (!player.equippedHat) player.equippedHat = '';
if (!player.equippedArtifact) player.equippedArtifact = '';
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
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

// БАЗА ДАННЫХ
const allItemsConfig = {};
const hatIdsOrder = [
    'shapka', 'krolik', 'pirat', 'hacker', 'viking', 'strazgi', 'samuray', 'temniy', 
    'paladin', 'vor', 'assassin', 'iluzionist', 'captain', 'fantom', 'inzhiner', 'okulayr', 
    'izverg', 'telepat', 'alhimik', 'psaiker', 'master_vetra', 'prizrak', 'imperator', 'respirator', 
    'slem', 'spetsnaz', 'gorayhii', 'voron', 'shaman_vudu', 'yakudza', 'korol', 'pobednui'
];
const hatPrices = [
    10000, 50000, 100000, 200000, 300000, 500000, 700000, 800000, 
    900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 
    1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 
    2500000, 2600000, 2700000, 2800000, 2900000, 3000000, 3100000, 3200000
];

hatIdsOrder.forEach((id, index) => {
    let baseBonus = 10 + (index * 25); 
    allItemsConfig[id] = { type: 'fuze', base: baseBonus, price: hatPrices[index] };
});

const artIdsOrder = ['zezl', 'shit', 'ucheniy', 'posoh', 'arhi', 'simbiot', 'arkhidemon'];
const artPrices = [10000, 20000, 30000, 40000, 50000, 60000, 70000];
const artBaseBonuses = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.5];

artIdsOrder.forEach((id, index) => {
    allItemsConfig[id] = { type: 'ruby', base: artBaseBonuses[index], price: artPrices[index] };
});

const tierFuzesAdd = [0, 5, 10, 15, 20];
const tierRubyMult = [1, 2, 3, 4, 5];

function getItemPrice(id) { return allItemsConfig[id] ? allItemsConfig[id].price : 5000; }

function getItemBonusText(id, tier) {
    if (!allItemsConfig[id]) return "";
    let conf = allItemsConfig[id];
    if (conf.type === 'fuze') {
        let val = conf.base + (tierFuzesAdd[tier] || 0);
        return `+${val} фузов`;
    } else {
        let val = conf.base * (tierRubyMult[tier] || 1);
        return `+${val.toFixed(1)}% рубинов`;
    }
}

function getEquippedStats() {
    let addFuzes = 0; let addRubyChance = 0;
    if (player.equippedHat && allItemsConfig[player.equippedHat]) {
        let tier = player.hatTiers[player.equippedHat] || 0;
        addFuzes = allItemsConfig[player.equippedHat].base + (tierFuzesAdd[tier] || 0);
    }
    if (player.equippedArtifact && allItemsConfig[player.equippedArtifact]) {
        let tier = player.artifactTiers[player.equippedArtifact] || 0;
        addRubyChance = allItemsConfig[player.equippedArtifact].base * (tierRubyMult[tier] || 1);
    }
    return { addFuzes, addRubyChance };
}

// =========================================================================
// СИСТЕМА ЗВУКОВ И ВИБРАЦИИ (БЕЗ ФОНОВОЙ МУЗЫКИ)
// =========================================================================
const sounds = {
    tap: new Audio('audio/tap.mp3'),
    buy: new Audio('audio/buy.mp3'),
    fail: new Audio('audio/fail.mp3'),
    success: new Audio('audio/success.mp3'),
    click: new Audio('audio/click.mp3')
};

// НАСТРОЙКА ГРОМКОСТИ (от 0.0 до 1.0)
sounds.tap.volume = 0.8;     // Выбивание монет (громче)
sounds.buy.volume = 0.5;     // Покупка
sounds.fail.volume = 0.3;    // Провал (тише)
sounds.success.volume = 0.6; // Успех крафта
sounds.click.volume = 0.4;   // Нажатия на кнопки (тише)

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0; 
        sounds[name].play().catch(e => console.log('Звук не загружен', e));
    }
}

function vibrate(ms) {
    if (navigator.vibrate) navigator.vibrate(ms);
}

// ГЛОБАЛЬНЫЙ ЗВУК ДЛЯ КНОПОК (С ИСКЛЮЧЕНИЯМИ)
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('pointerdown', (e) => {
        // Ищем кнопку, ссылку или предмет в шкафу
        let target = e.target.closest('button, a, .wardrobe-item');
        if (!target) return;

        // 1. Убираем звук в админ-панели
        if (target.closest('.admin-modal')) return;

        // 2. Убираем звук у кнопок сохранения/загрузки и внутри их окон
        if (target.classList.contains('btn-save') || target.classList.contains('btn-load') || target.closest('.save-modal')) return;

        // 3. Убираем звук у кнопки "Дом" (при переходе в меню) и "В игру"
        if (target.tagName === 'A') {
            let href = target.getAttribute('href');
            if (href === 'menu.html' || href === 'game.html') return;
        }

        // 4. Убираем звук клика у кнопок покупки и крафта (у них свои звуки)
        if (target.classList.contains('btn-buy') || target.id === 'btn-craft' || target.id === 'claim-bonus-btn') return;

        // Во всех остальных случаях играем звук клика (Шкаф, пункты меню и т.д.)
        playSound('click');
        vibrate(15);
    });
});
// =========================================================================
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
// НАСТРОЙКИ ШАПОК И АРТЕФАКТОВ
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
    'images/robot.png': {
        'alhimik': { w: 222, y: -57, x: 50 }, 'assassin': { w: 310, y: 39, x: 71 },
        'captain': { w: 220, y: 23, x: 51 }, 'fantom': { w: 244, y: 7, x: 60 },
        'gorayhii': { w: 252, y: -16, x: 55 }, 'hacker': { w: 180, y: 103, x: 55 },
        'iluzionist': { w: 343, y: -160, x: 49 }, 'imperator': { w: 337, y: -39, x: 71 },
        'inzhiner': { w: 243, y: 31, x: 62 }, 'izverg': { w: 236, y: 32, x: 63 },
        'korol': { w: 206, y: -36, x: 54 }, 'krolik': { w: 183, y: 32, x: 57 },
        'master_vetra': { w: 237, y: -28, x: 69 }, 'okulayr': { w: 194, y: 97, x: 52 },
        'paladin': { w: 220, y: -55, x: 59 }, 'pirat': { w: 183, y: -11, x: 51 },
        'pobednui': { w: 323, y: -77, x: 57 }, 'prizrak': { w: 188, y: 65, x: 53 },
        'psaiker': { w: 220, y: 6, x: 57 }, 'respirator': { w: 207, y: 105, x: 53 },
        'samuray': { w: 266, y: 43, x: 60 }, 'shaman_vudu': { w: 384, y: -83, x: 48 },
        'shapka': { w: 220, y: 36, x: 55 }, 'slem': { w: 219, y: 41, x: 59 },
        'spetsnaz': { w: 220, y: 39, x: 56 }, 'strazgi': { w: 220, y: 31, x: 53 },
        'telepat': { w: 303, y: 44, x: 71 }, 'temniy': { w: 277, y: 10, x: 68 },
        'viking': { w: 222, y: -12, x: 52 }, 'vor': { w: 255, y: 63, x: 64 },
        'voron': { w: 407, y: -118, x: 47 }, 'yakudza': { w: 186, y: 60, x: 53 }
    },
    'images/demon.png': {
        'alhimik': { w: 222, y: -55, x: 50 }, 'assassin': { w: 310, y: 39, x: 66 },
        'captain': { w: 220, y: 23, x: 51 }, 'fantom': { w: 244, y: 18, x: 62 },
        'gorayhii': { w: 304, y: -49, x: 61 }, 'hacker': { w: 183, y: 102, x: 53 },
        'iluzionist': { w: 371, y: -188, x: 51 }, 'imperator': { w: 337, y: -57, x: 71 },
        'inzhiner': { w: 249, y: 27, x: 61 }, 'izverg': { w: 236, y: 30, x: 62 },
        'korol': { w: 206, y: -36, x: 53 }, 'krolik': { w: 227, y: 11, x: 61 },
        'master_vetra': { w: 238, y: -39, x: 71 }, 'okulayr': { w: 188, y: 94, x: 51 },
        'paladin': { w: 220, y: -49, x: 58 }, 'pirat': { w: 198, y: -19, x: 54 },
        'pobednui': { w: 392, y: -122, x: 60 }, 'prizrak': { w: 220, y: 55, x: 56 },
        'psaiker': { w: 220, y: 12, x: 57 }, 'respirator': { w: 220, y: 99, x: 52 },
        'samuray': { w: 266, y: 43, x: 61 }, 'shaman_vudu': { w: 384, y: -72, x: 47 },
        'shapka': { w: 220, y: 33, x: 55 }, 'slem': { w: 249, y: 25, x: 62 },
        'spetsnaz': { w: 220, y: 40, x: 56 }, 'strazgi': { w: 220, y: 31, x: 55 },
        'telepat': { w: 306, y: 49, x: 72 }, 'temniy': { w: 273, y: 17, x: 68 },
        'viking': { w: 219, y: -7, x: 53 }, 'vor': { w: 257, y: 65, x: 65 },
        'voron': { w: 404, y: -119, x: 45 }, 'yakudza': { w: 196, y: 52, x: 55 }
    },
    'images/cat.png': {
        'alhimik': { w: 202, y: -35, x: 49 }, 'assassin': { w: 266, y: 61, x: 64 },
        'captain': { w: 189, y: 39, x: 52 }, 'fantom': { w: 196, y: 52, x: 57 },
        'gorayhii': { w: 266, y: -19, x: 60 }, 'hacker': { w: 158, y: 113, x: 51 },
        'iluzionist': { w: 343, y: -158, x: 51 }, 'imperator': { w: 337, y: -36, x: 69 },
        'inzhiner': { w: 224, y: 48, x: 61 }, 'izverg': { w: 206, y: 52, x: 60 },
        'korol': { w: 171, y: 0, x: 50 }, 'krolik': { w: 206, y: 21, x: 59 },
        'master_vetra': { w: 208, y: -9, x: 66 }, 'okulayr': { w: 184, y: 103, x: 53 },
        'paladin': { w: 194, y: -27, x: 57 }, 'pirat': { w: 168, y: 10, x: 51 },
        'pobednui': { w: 318, y: -68, x: 56 }, 'prizrak': { w: 192, y: 72, x: 53 },
        'psaiker': { w: 193, y: 28, x: 55 }, 'respirator': { w: 220, y: 102, x: 53 },
        'samuray': { w: 266, y: 49, x: 61 }, 'shaman_vudu': { w: 384, y: -76, x: 49 },
        'shapka': { w: 220, y: 43, x: 56 }, 'slem': { w: 223, y: 47, x: 62 },
        'spetsnaz': { w: 220, y: 45, x: 57 }, 'strazgi': { w: 196, y: 39, x: 56 },
        'telepat': { w: 281, y: 59, x: 71 }, 'temniy': { w: 252, y: 24, x: 68 },
        'viking': { w: 207, y: 5, x: 53 }, 'vor': { w: 227, y: 76, x: 63 },
        'voron': { w: 404, y: -107, x: 41 }, 'yakudza': { w: 192, y: 63, x: 56 }
    },
    'images/zombie.png': {
        'alhimik': { w: 193, y: -49, x: 48 }, 'assassin': { w: 246, y: 46, x: 62 },
        'captain': { w: 220, y: 23, x: 51 }, 'fantom': { w: 190, y: 31, x: 55 },
        'gorayhii': { w: 246, y: -24, x: 56 }, 'hacker': { w: 165, y: 92, x: 51 },
        'iluzionist': { w: 286, y: -123, x: 45 }, 'imperator': { w: 337, y: -49, x: 71 },
        'inzhiner': { w: 210, y: 35, x: 56 }, 'izverg': { w: 204, y: 33, x: 56 },
        'korol': { w: 172, y: -31, x: 51 }, 'krolik': { w: 192, y: 15, x: 58 },
        'master_vetra': { w: 238, y: -2, x: 64 }, 'okulayr': { w: 191, y: 84, x: 52 },
        'paladin': { w: 198, y: -42, x: 56 }, 'pirat': { w: 188, y: -3, x: 50 },
        'pobednui': { w: 324, y: -88, x: 55 }, 'prizrak': { w: 173, y: 62, x: 50 },
        'psaiker': { w: 199, y: 9, x: 57 }, 'respirator': { w: 202, y: 96, x: 49 },
        'samuray': { w: 255, y: 40, x: 57 }, 'shaman_vudu': { w: 384, y: -93, x: 46 },
        'shapka': { w: 220, y: 22, x: 54 }, 'slem': { w: 230, y: 24, x: 59 },
        'spetsnaz': { w: 204, y: 40, x: 53 }, 'strazgi': { w: 197, y: 21, x: 55 },
        'telepat': { w: 276, y: 44, x: 70 }, 'temniy': { w: 277, y: -9, x: 70 },
        'viking': { w: 222, y: -14, x: 54 }, 'vor': { w: 228, y: 59, x: 61 },
        'voron': { w: 357, y: -109, x: 45 }, 'yakudza': { w: 192, y: 48, x: 53 }
    },
    'images/dog.png': {
        'alhimik': { w: 222, y: -51, x: 49 }, 'assassin': { w: 272, y: 63, x: 66 },
        'captain': { w: 220, y: 23, x: 51 }, 'fantom': { w: 215, y: 51, x: 58 },
        'gorayhii': { w: 304, y: -34, x: 56 }, 'hacker': { w: 185, y: 120, x: 52 },
        'iluzionist': { w: 343, y: -147, x: 49 }, 'imperator': { w: 337, y: -36, x: 69 },
        'inzhiner': { w: 232, y: 48, x: 62 }, 'izverg': { w: 212, y: 55, x: 61 },
        'korol': { w: 183, y: 0, x: 52 }, 'krolik': { w: 227, y: 21, x: 61 },
        'master_vetra': { w: 238, y: 15, x: 64 }, 'okulayr': { w: 152, y: 121, x: 49 },
        'paladin': { w: 220, y: -30, x: 59 }, 'pirat': { w: 183, y: 15, x: 52 },
        'pobednui': { w: 348, y: -79, x: 59 }, 'prizrak': { w: 168, y: 88, x: 53 },
        'psaiker': { w: 220, y: 23, x: 58 }, 'respirator': { w: 220, y: 114, x: 55 },
        'samuray': { w: 253, y: 63, x: 61 }, 'shaman_vudu': { w: 384, y: -58, x: 49 },
        'shapka': { w: 220, y: 53, x: 55 }, 'slem': { w: 235, y: 50, x: 60 },
        'spetsnaz': { w: 201, y: 63, x: 56 }, 'strazgi': { w: 220, y: 46, x: 48 },
        'telepat': { w: 275, y: 81, x: 67 }, 'temniy': { w: 277, y: 21, x: 69 },
        'viking': { w: 229, y: 4, x: 53 }, 'vor': { w: 238, y: 81, x: 65 },
        'voron': { w: 404, y: -113, x: 45 }, 'yakudza': { w: 178, y: 74, x: 54 }
    },
    'images/rabit.png': {
        'alhimik': { w: 195, y: -24, x: 47 }, 'assassin': { w: 281, y: 66, x: 63 },
        'captain': { w: 200, y: 37, x: 51 }, 'fantom': { w: 216, y: 38, x: 54 },
        'gorayhii': { w: 293, y: -38, x: 55 }, 'hacker': { w: 144, y: 126, x: 47 },
        'iluzionist': { w: 319, y: -126, x: 45 }, 'imperator': { w: 337, y: -25, x: 69 },
        'inzhiner': { w: 229, y: 54, x: 56 }, 'izverg': { w: 204, y: 63, x: 55 },
        'korol': { w: 181, y: -1, x: 49 }, 'krolik': { w: 217, y: 25, x: 58 },
        'master_vetra': { w: 238, y: 20, x: 62 }, 'okulayr': { w: 160, y: 116, x: 48 },
        'paladin': { w: 185, y: -14, x: 53 }, 'pirat': { w: 176, y: 15, x: 48 },
        'pobednui': { w: 346, y: -76, x: 54 }, 'prizrak': { w: 175, y: 84, x: 49 },
        'psaiker': { w: 191, y: 36, x: 52 }, 'respirator': { w: 195, y: 121, x: 48 },
        'samuray': { w: 246, y: 66, x: 56 }, 'shaman_vudu': { w: 418, y: -94, x: 46 },
        'shapka': { w: 220, y: 56, x: 51 }, 'slem': { w: 215, y: 60, x: 56 },
        'spetsnaz': { w: 220, y: 57, x: 54 }, 'strazgi': { w: 191, y: 52, x: 51 },
        'telepat': { w: 286, y: 65, x: 68 }, 'temniy': { w: 286, y: 5, x: 68 },
        'viking': { w: 213, y: 13, x: 50 }, 'vor': { w: 234, y: 81, x: 60 },
        'voron': { w: 404, y: -114, x: 46 }, 'yakudza': { w: 192, y: 70, x: 49 }
    }
};

const ARTIFACT_SETTINGS = {
    'images/dragon.png': {
        'arhi': { w: 110, y: 21, x: 37 }, 'arkhidemon': { w: 140, y: 14, x: -9 },
        'posoh': { w: 152, y: 24, x: -9 }, 'shit': { w: 144, y: 14, x: 5 },
        'simbiot': { w: 79, y: 43, x: 89 }, 'ucheniy': { w: 94, y: 32, x: 101 },
        'zezl': { w: 85, y: 44, x: 62 }
    },
    'images/robot.png': {
        'arhi': { w: 110, y: 64, x: 56 }, 'arkhidemon': { w: 140, y: 41, x: 7 },
        'posoh': { w: 152, y: 43, x: -10 }, 'shit': { w: 144, y: 40, x: 14 },
        'simbiot': { w: 79, y: 58, x: 82 }, 'ucheniy': { w: 94, y: 44, x: 93 },
        'zezl': { w: 85, y: 44, x: 62 }
    },
    'images/demon.png': {
        'arhi': { w: 110, y: 21, x: 37 }, 'posoh': { w: 152, y: 24, x: -9 },
        'arkhidemon': { w: 140, y: 14, x: -9 }, 'shit': { w: 144, y: 14, x: 5 },
        'simbiot': { w: 79, y: 43, x: 89 }, 'ucheniy': { w: 94, y: 32, x: 101 },
        'zezl': { w: 85, y: 44, x: 62 }
    },
    'images/cat.png': {
        'arhi': { w: 110, y: 21, x: 37 },
        'arkhidemon': { w: 140, y: 25, x: 1 },
        'shit': { w: 144, y: 14, x: 5 },
        'zezl': { w: 85, y: 44, x: 62 },
        'simbiot': { w: 79, y: 40, x: 65 },
        'posoh': { w: 110, y: 51, x: 14 },
        'ucheniy': { w: 78, y: 44, x: 79 }
    },
    'images/zombie.png': {
        'arhi': { w: 94, y: 79, x: 66 }, 'arkhidemon': { w: 140, y: 43, x: 8 },
        'posoh': { w: 152, y: 45, x: -10 }, 'shit': { w: 144, y: 49, x: 8 },
        'simbiot': { w: 79, y: 59, x: 84 }, 'ucheniy': { w: 94, y: 53, x: 79 },
        'zezl': { w: 85, y: 66, x: 48 }
    },
    'images/dog.png': {
        'arhi': { w: 110, y: 35, x: 44 }, 'arkhidemon': { w: 140, y: 26, x: -6 },
        'posoh': { w: 152, y: 23, x: -25 }, 'shit': { w: 144, y: 14, x: 5 },
        'simbiot': { w: 79, y: 43, x: 73 }, 'ucheniy': { w: 94, y: 26, x: 71 },
        'zezl': { w: 85, y: 33, x: 45 }
    },
    'images/rabit.png': {
        'arhi': { w: 110, y: 45, x: 53 }, 'arkhidemon': { w: 140, y: 31, x: -1 },
        'posoh': { w: 152, y: 24, x: -9 }, 'shit': { w: 144, y: 14, x: 5 },
        'simbiot': { w: 79, y: 43, x: 89 }, 'ucheniy': { w: 94, y: 32, x: 101 },
        'zezl': { w: 85, y: 44, x: 62 }
    }
};
