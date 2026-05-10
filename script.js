// ============================================================
// Config — replace with your Discord user ID
// To get it: Discord > Settings > Advanced > Developer Mode ON
//            then right-click your name > Copy User ID
// Also join https://discord.gg/lanyard so the API can read your status
// ============================================================
const DISCORD_USER_ID = '793052797892296734';
const X_USERNAME          = 'pasihf0_';
const STEAM_URL           = 'https://steamcommunity.com/profiles/76561199122916881/';
const INSTAGRAM_USERNAME  = '91284018godsihg';

const GAMES = [
    {
        name: 'Minecraft',
        desc: {
            ja: '整地をしすぎて建築とPVPがへたくそ',
            en: 'Too much terraforming — terrible at building and PVP',
            ko: '정지 작업만 너무 해서 건축이랑 PVP가 형편없음',
            zh: '挖太多地了，建築和PVP都很差',
        },
    },
    {
        name: 'VRChat',
        desc: {
            ja: '入りたてで右も左もわからない迷子USER',
            en: 'Brand new USER who has no idea what they\'re doing',
            ko: '갓 시작한 방향치 USER',
            zh: '剛加入的迷路USER，左右都分不清',
        },
    },
    {
        name: 'VALORANT',
        desc: {
            ja: 'めちゃくちゃへたくそで最高ランクはゴールド２',
            en: 'Absolutely terrible — highest rank ever is Gold 2',
            ko: '엄청 못해서 최고 랭크가 골드 2',
            zh: '超級爛，最高段位是黃金2',
        },
    },
    {
        name: 'REPO',
        desc: {
            ja: 'すぐ死にます',
            en: 'I die instantly',
            ko: '바로 죽습니다',
            zh: '馬上就死',
        },
    },
    {
        name: 'PEAK',
        desc: {
            ja: 'すぐ死にます。一人でできません',
            en: 'I die instantly. Can\'t do it solo',
            ko: '바로 죽습니다. 혼자서는 못 해요',
            zh: '馬上就死。沒辦法單人',
        },
    },
];

const LANGUAGES = [
    { flag: '🇯🇵', name: { ja: '日本語', en: 'Japanese', ko: '일본어', zh: '日文' }, level: { ja: 'ネイティブ', en: 'Native',   ko: '네이티브', zh: '母語'  }, pct: 100 },
    { flag: '🇺🇸', name: { ja: '英語',   en: 'English',  ko: '영어',   zh: '英文' }, level: { ja: '少しだけ',  en: 'A little', ko: '조금',    zh: '一點點' }, pct: 15  },
];

// ============================================================
// Cookies
// ============================================================
function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
    for (const part of document.cookie.split(';')) {
        const [k, v] = part.trim().split('=');
        if (k === name) return decodeURIComponent(v ?? '');
    }
    return null;
}

// ============================================================
// Translations
// ============================================================
const i18n = {
    ja: {
        profileBio:   '',
        discordTitle: 'Discord',
        statusOnline: '返信できます',
        statusIdle:   '寝てるか返信が遅いかも',
        statusDnd:    'ゲーム中か別のことしてます',
        statusOffline:'仕事中か寝てます',
        nowPlaying:   '今やっていること',
        linksTitle:   'リンク',
        steamLabel:   'Steamプロフィール',
        gamesTitle:   'よくやるゲーム',
        langsTitle:   '言語',
        footerText:   'made with ♥',
    },
    en: {
        profileBio:   '',
        discordTitle: 'Discord',
        statusOnline: 'Available',
        statusIdle:   'Asleep or slow to reply',
        statusDnd:    'Playing a game or doing something else',
        statusOffline:'At work or asleep',
        nowPlaying:   'Now Playing',
        linksTitle:   'Links',
        steamLabel:   'Steam Profile',
        gamesTitle:   'Games I Play',
        langsTitle:   'Languages',
        footerText:   'made with ♥',
    },
    ko: {
        profileBio:   '',
        discordTitle: 'Discord',
        statusOnline: '답장 가능해요',
        statusIdle:   '자거나 답장이 늦을 수 있어요',
        statusDnd:    '게임하거나 다른 것 하는 중이에요',
        statusOffline:'일하거나 자고 있어요',
        nowPlaying:   '지금 하는 것',
        linksTitle:   '링크',
        steamLabel:   'Steam 프로필',
        gamesTitle:   '자주 하는 게임',
        langsTitle:   '언어',
        footerText:   'made with ♥',
    },
    zh: {
        profileBio:   '',
        discordTitle: 'Discord',
        statusOnline: '可以回覆',
        statusIdle:   '可能在睡覺或回覆較慢',
        statusDnd:    '在玩遊戲或做其他事',
        statusOffline:'在工作或睡覺',
        nowPlaying:   '目前活動',
        linksTitle:   '連結',
        steamLabel:   'Steam 個人檔案',
        gamesTitle:   '常玩的遊戲',
        langsTitle:   '語言',
        footerText:   'made with ♥',
    },
};

// ============================================================
// State
// ============================================================
let currentLang      = 'ja';
let currentStatus    = 'offline';
let _lastDiscordData = null;
let _spotifyTimer    = null;

const STATUS_KEY = {
    online:  'statusOnline',
    idle:    'statusIdle',
    dnd:     'statusDnd',
    offline: 'statusOffline',
};

// ============================================================
// Helpers
// ============================================================
function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatMs(ms) {
    const s = Math.floor(Math.abs(ms) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function assetUrl(appId, key) {
    if (!key) return null;
    if (key.startsWith('mp:external/')) return `https://media.discordapp.net/external/${key.slice(12)}`;
    if (key.startsWith('spotify:'))     return `https://i.scdn.co/image/${key.slice(8)}`;
    if (!appId) return null;
    return `https://cdn.discordapp.com/app-assets/${appId}/${key}.png?size=160`;
}

// ============================================================
// Language detection
// ============================================================
function detectLang() {
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('ko'))    return 'ko';
    if (nav.startsWith('zh'))    return 'zh';
    if (nav.startsWith('en'))    return 'en';
    return 'ja';
}

// ============================================================
// Language
// ============================================================
function applyLang(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;
    setCookie('lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    refreshStatusText();
    buildLinks();
    buildLangs();

    // update game desc if one is open
    const activeTag = document.querySelector('.game-tag.active');
    const gameDesc  = document.getElementById('gameDesc');
    if (activeTag && gameDesc) {
        const idx = Number(activeTag.dataset.idx);
        gameDesc.textContent = GAMES[idx].desc[currentLang] ?? GAMES[idx].desc.ja;
    }

    if (_lastDiscordData) renderActivity(_lastDiscordData);
}

// ============================================================
// Theme
// ============================================================
function applyTheme(theme) {
    document.body.dataset.theme = theme;
    setCookie('theme', theme);
    document.getElementById('themeIconSun').classList.toggle('hidden', theme !== 'dark');
    document.getElementById('themeIconMoon').classList.toggle('hidden', theme === 'dark');
}

function toggleTheme() {
    applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
}

// ============================================================
// Social Links
// ============================================================
const LINK_ICONS = {
    x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`,
    steam: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
};

const ARROW_ICON = `<svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`;

function buildLinks() {
    const card      = document.getElementById('linksCard');
    const container = document.getElementById('linksContainer');
    if (!card || !container) return;

    const entries = [
        X_USERNAME         && { icon: 'x',         url: `https://x.com/${X_USERNAME}`,         label: `@${X_USERNAME}` },
        INSTAGRAM_USERNAME && { icon: 'instagram', url: `https://instagram.com/${INSTAGRAM_USERNAME}`, label: `@${INSTAGRAM_USERNAME}` },
        STEAM_URL          && { icon: 'steam',     url: STEAM_URL,                              label: i18n[currentLang].steamLabel },
    ].filter(Boolean);

    if (entries.length === 0) { card.hidden = true; return; }
    card.hidden = false;

    container.innerHTML = entries.map(e =>
        `<a class="link-row link-${e.icon}" href="${e.url}" target="_blank" rel="noopener noreferrer">
            <span class="link-icon">${LINK_ICONS[e.icon]}</span>
            <span class="link-label">${e.label}</span>
            ${ARROW_ICON}
        </a>`
    ).join('');
}

// ============================================================
// Games & Languages
// ============================================================
function buildGames() {
    const container = document.getElementById('gamesContainer');
    const desc      = document.getElementById('gameDesc');
    if (!container || !desc) return;

    container.innerHTML = GAMES.map((g, i) =>
        `<button class="game-tag" data-idx="${i}">${esc(g.name)}</button>`
    ).join('');

    container.addEventListener('click', e => {
        const btn = e.target.closest('.game-tag');
        if (!btn) return;

        const idx    = Number(btn.dataset.idx);
        const active = btn.classList.contains('active');

        container.querySelectorAll('.game-tag').forEach(b => b.classList.remove('active'));

        if (active) {
            desc.hidden = true;
        } else {
            btn.classList.add('active');
            desc.textContent = GAMES[idx].desc[currentLang] ?? GAMES[idx].desc.ja;
            desc.hidden = false;
        }
    });
}

function buildLangs() {
    const el = document.getElementById('langsContainer');
    if (!el) return;
    el.innerHTML = LANGUAGES.map(l => `
        <div class="lang-row">
            <span class="lang-flag">${l.flag}</span>
            <div class="lang-info">
                <div class="lang-top">
                    <span class="lang-name">${l.name[currentLang]}</span>
                    <span class="lang-level">${l.level[currentLang]}</span>
                </div>
                <div class="lang-bar"><div class="lang-bar-fill" style="width:${l.pct}%"></div></div>
            </div>
        </div>`).join('');
}

// ============================================================
// Activity rendering
// ============================================================
const ACTIVITY_LABEL = {
    0: { ja: 'プレイ中',  en: 'Playing',        ko: '플레이 중' },
    1: { ja: '配信中',    en: 'Streaming',       ko: '방송 중'   },
    3: { ja: '視聴中',    en: 'Watching',        ko: '시청 중'   },
    5: { ja: '参加中',    en: 'Competing in',    ko: '참가 중'   },
};
const SPOTIFY_LABEL = {
    ja: 'Spotify で聴いています',
    en: 'Listening to Spotify',
    ko: 'Spotify 듣는 중',
};

function renderActivity(data) {
    if (_spotifyTimer) { clearInterval(_spotifyTimer); _spotifyTimer = null; }

    const el = document.getElementById('dActivity');
    if (!el) return;

    // Spotify
    if (data.listening_to_spotify && data.spotify) {
        const sp  = data.spotify;
        const end = sp.timestamps.end - sp.timestamps.start;
        el.innerHTML = `
            <div class="act-label">${esc(SPOTIFY_LABEL[currentLang])}</div>
            <div class="act-row">
                <img class="act-art" src="${esc(sp.album_art_url)}" alt="">
                <div class="act-info">
                    <div class="act-name">${esc(sp.song)}</div>
                    <div class="act-sub">${esc(sp.artist)}</div>
                    <div class="act-sub">${esc(sp.album)}</div>
                </div>
            </div>
            <div class="spotify-progress">
                <div class="spotify-track"><div class="spotify-fill" id="spotifyFill"></div></div>
                <div class="spotify-times">
                    <span id="spotifyElapsed">0:00</span>
                    <span>${formatMs(end)}</span>
                </div>
            </div>`;
        el.hidden = false;

        const tick = () => {
            const elapsed = Date.now() - sp.timestamps.start;
            const pct     = Math.min(100, (elapsed / end) * 100);
            const fill    = document.getElementById('spotifyFill');
            const time    = document.getElementById('spotifyElapsed');
            if (fill) fill.style.width = `${pct}%`;
            if (time) time.textContent = formatMs(elapsed);
        };
        tick();
        _spotifyTimer = setInterval(tick, 1000);
        return;
    }

    // Game / Streaming / Watching / Competing (skip type 4 = custom status)
    const act = (data.activities ?? []).find(a => a.type !== 4);
    if (!act) { el.hidden = true; el.innerHTML = ''; return; }

    const labelMap = ACTIVITY_LABEL[act.type] ?? ACTIVITY_LABEL[0];
    const imgUrl   = assetUrl(act.application_id, act.assets?.large_image);
    const imgHtml  = imgUrl
        ? `<img class="act-icon" src="${esc(imgUrl)}" alt="" onerror="this.style.display='none'">`
        : '';
    const details  = act.details ? `<div class="act-sub">${esc(act.details)}</div>` : '';
    const state    = act.state   ? `<div class="act-sub">${esc(act.state)}</div>`   : '';

    el.innerHTML = `
        <div class="act-label">${esc(labelMap[currentLang])}</div>
        <div class="act-row">
            ${imgHtml}
            <div class="act-info">
                <div class="act-name">${esc(act.name)}</div>
                ${details}${state}
            </div>
        </div>`;
    el.hidden = false;
}

// ============================================================
// Discord
// ============================================================
function refreshStatusText() {
    const key  = STATUS_KEY[currentStatus] ?? STATUS_KEY.offline;
    const text = i18n[currentLang][key] ?? '';
    document.getElementById('dStatusText').textContent = text;
}

function updateDiscordUI(data) {
    const user   = data.discord_user;
    const status = data.discord_status ?? 'offline';
    currentStatus = status;

    // Avatar URL
    const avatarUrl = user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(user.id) % 6n)}.png`;

    document.getElementById('dAvatar').src    = avatarUrl;
    document.getElementById('heroAvatar').src = avatarUrl;

    // Display name (global_name = display name, fallback to username)
    const displayName = user.global_name || user.username;
    document.getElementById('dUsername').textContent   = displayName;
    document.getElementById('profileName').textContent = displayName;

    // Status dots
    ['dStatusDot', 'heroStatusDot'].forEach(id => {
        const el = document.getElementById(id);
        el.className = el.className.replace(/online|idle|dnd|offline/g, '').trim() + ' ' + status;
    });

    refreshStatusText();

}

async function fetchDiscord() {
    if (!DISCORD_USER_ID || DISCORD_USER_ID === 'YOUR_DISCORD_ID') return;
    try {
        const res  = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const json = await res.json();
        if (json.success) { _lastDiscordData = json.data; updateDiscordUI(json.data); }
    } catch {
        // network error — retain previous state
    }
}

// ============================================================
// Init
// ============================================================
function init() {
    applyTheme(getCookie('theme') ?? 'dark');
    applyLang(getCookie('lang') ?? detectLang());

    document.getElementById('themeBtn').addEventListener('click', toggleTheme);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    buildLinks();
    buildGames();
    buildLangs();

    fetchDiscord();
    setInterval(fetchDiscord, 30_000);
}

document.addEventListener('DOMContentLoaded', init);
