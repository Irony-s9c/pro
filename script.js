// ============================================================
// Config — replace with your info
// To get your Discord ID: Discord > Settings > Advanced > Developer Mode ON
//            then right-click your name > Copy User ID
// Also join https://discord.gg/lanyard so the API can read your status
// ============================================================
const DISCORD_USER_ID    = '793052797892296734';
const X_USERNAME         = '9812yr10h';
const STEAM_URL          = 'https://steamcommunity.com/profiles/76561199122916881/';
const INSTAGRAM_USERNAME = '';
const SPOTIFY_URL        = 'https://open.spotify.com/user/31jxxh4bhloa5yqdn2syxzyeeexm';

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
// Translations
// ============================================================
const I18N = {
    ja: {
        tagline: 'メンヘラではないです。\n優しくしないでください。すぐ好きになります。',
        aboutTitle: 'About',
        aboutText: '社会人1年目です。\nデリバリーサービスのクレーマー対応をしています。\n日本人ですが、日本語は得意ではありません。\nゲーム、映画、Vibe Codingが好きです。',
        cautionTitle: '取り扱い注意',
        cautionText: '最近遊ばなくなった人、話さなくなった人は、そっとフレンド整理することがあります。\nDiscordがオフラインの人には、実はちょっと苦手意識があります（DM送っていいのか迷うので）。\n恋人がいる方は、先に教えてもらえると嬉しいです。ちょうどいい距離感を保てるように気をつけます。\nなぜかすぐ嫌われがちです。嫌いになる前に、ひとこと言ってもらえると助かります。',
        gamesTitle: 'Games',
        gamesText: 'ゲームは好きです。\n最近は忙しくてあまりできていません。\n基本的に下手ですが、頑張ります。',
        gameChameleon: 'めっちゃカメレオン',
        moviesTitle: 'Movies / Drama / Anime',
        moviesText: '映画を見ます。\nジェイソン・ステイサムが出る映画はかなり見ます。\n韓国ドラマも好きです。戦闘系か恋愛系が多いです。\nアニメはそこまで見ません。見るとしても、なろう系か恋愛系が多めです。',
        workTitle: 'Work',
        workText: 'デリバリーサービスのクレーマー対応をしています。',
        quoteIn: '「商品足りないんだけど！！」',
        quoteOut: '→「申し訳ありません。返金させていただきます。」',
        pchelpTitle: 'PC / Help',
        pchelpText: 'パソコンは得意です。\n何か知りたいこと、わからないことがあれば助けます。\n知り合いなら無料で遠隔整備もできます。たぶん。',
        finalTitle: '最後に',
        finalText: '彼女はいません。\nイケメンではありません。\n身長も高くありません。\n声も良くありません。\nそれでも仲良くしてください。',
        linksTitle: 'リンク',
        statusOnline: '返信できます',
        statusIdle: '寝てるか返信が遅いかも',
        statusDnd: 'ゲーム中か別のことしてます',
        statusOffline: '仕事中か寝てます',
        activityPlaying: 'プレイ中',
        activityStreaming: '配信中',
        activityWatching: '視聴中',
        activityCompeting: '参加中',
        spotifyListening: 'Spotify で聴いています',
    },
    en: {
        tagline: "Not the clingy type.\nBe careful being nice to me — I'll fall for you fast.",
        aboutTitle: 'About',
        aboutText: "First-year working adult.\nI handle complaint calls for a delivery service.\nI'm Japanese, but honestly my Japanese isn't that great.\nInto games, movies, and vibe coding.",
        cautionTitle: 'Handle With Care',
        cautionText: "If you stop playing or talking to me, I might quietly clean up my friend list.\nI'm a little wary of people who show offline on Discord — I never know if it's okay to DM.\nIf you already have a partner, let me know first. I'll keep the right distance.\nPeople tend to end up disliking me for some reason. If that's happening, just tell me before it gets there.",
        gamesTitle: 'Games',
        gamesText: "I like games.\nToo busy lately to play much though.\nI'm not great at them, but I try.",
        gameChameleon: 'MECCHA CHAMELEON',
        moviesTitle: 'Movies / Drama / Anime',
        moviesText: "I watch a fair amount of movies.\nPretty much anything with Jason Statham.\nAlso into Korean dramas — mostly action or romance.\nNot big into anime, but if I do, it's usually isekai or romance.",
        workTitle: 'Work',
        workText: 'I handle complaint calls for a delivery service.',
        quoteIn: '"My order is missing items!!"',
        quoteOut: '→ "We\'re very sorry, we\'ll issue a refund."',
        pchelpTitle: 'PC / Help',
        pchelpText: "I'm pretty good with computers.\nIf there's something you want to know or need help with, just ask.\nFree remote support for people I know — probably.",
        finalTitle: 'Finally',
        finalText: "No girlfriend.\nNot good-looking.\nNot tall either.\nNot a great voice.\nStill, let's be friends anyway.",
        linksTitle: 'Links',
        statusOnline: 'Free to chat',
        statusIdle: 'Probably asleep or slow to reply',
        statusDnd: 'Gaming or doing something else',
        statusOffline: 'At work or asleep',
        activityPlaying: 'Playing',
        activityStreaming: 'Streaming',
        activityWatching: 'Watching',
        activityCompeting: 'Competing in',
        spotifyListening: 'Listening on Spotify',
    },
    ko: {
        tagline: '멘헤라 아닙니다.\n다정하게 대하지 마세요. 금방 좋아하게 됩니다.',
        aboutTitle: 'About',
        aboutText: '사회 초년생입니다.\n배달 서비스 컴플레인 대응을 하고 있어요.\n일본인이지만 일본어를 잘하는 편은 아닙니다.\n게임, 영화, Vibe Coding을 좋아합니다.',
        cautionTitle: '취급 주의',
        cautionText: '요즘 같이 안 놀거나 대화가 줄어든 사람은 조용히 친구 정리를 하기도 합니다.\nDiscord가 오프라인인 사람에게는 사실 조금 어려움을 느껴요（DM을 보내도 될지 고민하게 되서요）.\n애인이 있는 분은 미리 말씀해 주시면 감사하겠습니다. 적당한 거리를 유지하도록 신경 쓸게요.\n왠지 금방 미움받는 편입니다. 미워지기 전에 한마디만 해주세요.',
        gamesTitle: 'Games',
        gamesText: '게임은 좋아합니다.\n요즘은 바빠서 많이 못 하고 있어요.\n기본적으로 잘 못하지만 열심히 하겠습니다.',
        gameChameleon: 'MECCHA CHAMELEON',
        moviesTitle: 'Movies / Drama / Anime',
        moviesText: '영화는 꽤 봅니다.\n제이슨 스타뎀이 나오는 영화는 거의 다 봐요.\n한국 드라마도 좋아합니다. 액션물이나 로맨스물이 많아요.\n애니메이션은 그렇게 많이 보진 않아요. 본다면 나로계나 로맨스물이 많습니다.',
        workTitle: 'Work',
        workText: '배달 서비스 컴플레인 대응을 하고 있습니다.',
        quoteIn: '「상품이 부족한데요！！」',
        quoteOut: '→「죄송합니다. 환불해 드리겠습니다.」',
        pchelpTitle: 'PC / Help',
        pchelpText: '컴퓨터는 잘 다루는 편입니다.\n궁금한 것, 모르는 것이 있으면 도와드릴게요.\n아는 사이라면 무료로 원격 정비도 가능합니다. 아마도.',
        finalTitle: '마지막으로',
        finalText: '여자친구는 없습니다.\n잘생기지 않았습니다.\n키도 크지 않습니다.\n목소리도 좋지 않습니다.\n그래도 친하게 지내주세요.',
        linksTitle: '링크',
        statusOnline: '답장 가능해요',
        statusIdle: '자거나 답장이 늦을 수 있어요',
        statusDnd: '게임하거나 다른 것 하는 중이에요',
        statusOffline: '일하거나 자고 있어요',
        activityPlaying: '플레이 중',
        activityStreaming: '방송 중',
        activityWatching: '시청 중',
        activityCompeting: '참가 중',
        spotifyListening: 'Spotify 듣는 중',
    },
    zh: {
        tagline: '不是媽寶或黏人型。\n對我太溫柔的話，我會很快就喜歡上你，請小心。',
        aboutTitle: 'About',
        aboutText: '社會新鮮人第一年。\n目前在處理外送平台的客訴。\n雖然是日本人，但日文其實不算擅長。\n喜歡遊戲、電影和 Vibe Coding。',
        cautionTitle: '使用注意事項',
        cautionText: '最近變得不太一起玩、不太聊天的人，我可能會默默整理好友名單。\n對於 Discord 顯示離線的人，其實有點不太擅長應對（因為會猶豫要不要傳訊息）。\n有交往對象的話，麻煩先告訴我一聲，我會拿捏好適當的距離。\n不知道為什麼常常很快就被討厭。在真的討厭我之前，請先跟我說一聲。',
        gamesTitle: 'Games',
        gamesText: '我喜歡玩遊戲。\n最近比較忙，沒什麼時間玩。\n雖然基本上很爛，但會努力的。',
        gameChameleon: 'MECCHA CHAMELEON',
        moviesTitle: 'Movies / Drama / Anime',
        moviesText: '會看電影。\n傑森史塔森主演的電影幾乎都會看。\n也喜歡韓劇，大多是動作片或愛情片。\n動畫看得不算多，看的話大多是異世界或戀愛類型。',
        workTitle: 'Work',
        workText: '目前在處理外送平台的客訴。',
        quoteIn: '「東西少了一樣啊！！」',
        quoteOut: '→「非常抱歉，將為您辦理退款。」',
        pchelpTitle: 'PC / Help',
        pchelpText: '電腦方面還算擅長。\n有任何想知道或不懂的地方，都可以問我。\n如果是認識的人，也可以免費幫忙遠端處理，大概啦。',
        finalTitle: '最後',
        finalText: '沒有女朋友。\n長得不算帥。\n身高也不高。\n聲音也不算好聽。\n即便如此，還是請多多指教。',
        linksTitle: '連結',
        statusOnline: '可以回覆',
        statusIdle: '可能在睡覺或回覆較慢',
        statusDnd: '在玩遊戲或做其他事',
        statusOffline: '在工作或睡覺',
        activityPlaying: '遊玩中',
        activityStreaming: '直播中',
        activityWatching: '觀看中',
        activityCompeting: '參賽中',
        spotifyListening: '正在用 Spotify 聽歌',
    },
    ru: {
        tagline: 'Я не менхера (эмоционально нестабильный).\nБудьте осторожны с добротой — я быстро влюбляюсь.',
        aboutTitle: 'About',
        aboutText: 'Первый год как работаю.\nЗанимаюсь обработкой жалоб в службе доставки.\nЯ японец, но японский у меня не блестящий.\nЛюблю игры, фильмы и vibe coding.',
        cautionTitle: 'Обращаться осторожно',
        cautionText: 'Тех, с кем перестали вместе играть или общаться, я могу потихоньку убрать из друзей.\nМне немного не по себе с теми, кто оффлайн в Discord — не знаю, стоит ли писать в личку.\nЕсли у вас есть пара, скажите заранее — я буду соблюдать подходящую дистанцию.\nПочему-то меня часто быстро разлюбливают. Если что, скажите пару слов до того, как это случится.',
        gamesTitle: 'Games',
        gamesText: 'Люблю игры.\nПоследнее время занят и играю мало.\nВ целом играю плохо, но стараюсь.',
        gameChameleon: 'MECCHA CHAMELEON',
        moviesTitle: 'Movies / Drama / Anime',
        moviesText: 'Смотрю довольно много фильмов.\nПочти всё с Джейсоном Стэйтемом.\nТакже люблю корейские дорамы — в основном боевики или мелодрамы.\nАниме смотрю не так много, а если смотрю — то исекай или романтику.',
        workTitle: 'Work',
        workText: 'Занимаюсь обработкой жалоб в службе доставки.',
        quoteIn: '«В заказе не хватает товара!!»',
        quoteOut: '→ «Приносим извинения, оформим возврат средств.»',
        pchelpTitle: 'PC / Help',
        pchelpText: 'Неплохо разбираюсь в компьютерах.\nЕсли что-то нужно узнать или в чём-то разобраться — помогу.\nЗнакомым — бесплатная удалённая помощь. Наверное.',
        finalTitle: 'Напоследок',
        finalText: 'Девушки нет.\nКрасавцем не назвать.\nРостом тоже не вышел.\nГолос так себе.\nНо всё равно давайте дружить.',
        linksTitle: 'Ссылки',
        statusOnline: 'Могу ответить',
        statusIdle: 'Наверное сплю или отвечаю медленно',
        statusDnd: 'Играю или занят другим',
        statusOffline: 'На работе или сплю',
        activityPlaying: 'Играет в',
        activityStreaming: 'Стримит',
        activityWatching: 'Смотрит',
        activityCompeting: 'Участвует в',
        spotifyListening: 'Слушает Spotify',
    },
};

const STATUS_KEY = {
    online:  'statusOnline',
    idle:    'statusIdle',
    dnd:     'statusDnd',
    offline: 'statusOffline',
};

const ACTIVITY_KEY = { 0: 'activityPlaying', 1: 'activityStreaming', 3: 'activityWatching', 5: 'activityCompeting' };

let currentLang       = 'ja';
let currentStatus     = 'offline';
let _lastDiscordData  = null;
let _spotifyTimer     = null;

// ============================================================
// Language detection
// ============================================================
function detectLang() {
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('en')) return 'en';
    return 'ja';
}

function applyLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    setCookie('lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    refreshStatusText();
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
    spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.6-.66 13.32 1.62.361.181.54.78.42 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.179-1.2-.181-1.38-.72-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
};

const ARROW_ICON = `<svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`;

function buildLinks() {
    const card      = document.getElementById('linksCard');
    const container = document.getElementById('linksContainer');
    if (!card || !container) return;

    const entries = [
        X_USERNAME         && { icon: 'x',         url: `https://x.com/${X_USERNAME}`,         label: `@${X_USERNAME}` },
        SPOTIFY_URL        && { icon: 'spotify',   url: SPOTIFY_URL,                            label: 'Spotify' },
        STEAM_URL          && { icon: 'steam',     url: STEAM_URL,                              label: 'Steam' },
        INSTAGRAM_USERNAME && { icon: 'instagram', url: `https://instagram.com/${INSTAGRAM_USERNAME}`, label: `@${INSTAGRAM_USERNAME}` },
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
// Activity rendering
// ============================================================
function renderActivity(data) {
    if (_spotifyTimer) { clearInterval(_spotifyTimer); _spotifyTimer = null; }

    const el = document.getElementById('dActivity');
    if (!el) return;

    // Spotify
    if (data.listening_to_spotify && data.spotify) {
        const sp  = data.spotify;
        const end = sp.timestamps.end - sp.timestamps.start;
        el.innerHTML = `
            <div class="act-label">${esc(I18N[currentLang].spotifyListening)}</div>
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

    const label    = I18N[currentLang][ACTIVITY_KEY[act.type] ?? ACTIVITY_KEY[0]];
    const imgUrl   = assetUrl(act.application_id, act.assets?.large_image);
    const imgHtml  = imgUrl
        ? `<img class="act-icon" src="${esc(imgUrl)}" alt="" onerror="this.style.display='none'">`
        : '';
    const details  = act.details ? `<div class="act-sub">${esc(act.details)}</div>` : '';
    const state    = act.state   ? `<div class="act-sub">${esc(act.state)}</div>`   : '';

    el.innerHTML = `
        <div class="act-label">${esc(label)}</div>
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
    const el   = document.getElementById('dStatusText');
    if (el) el.textContent = I18N[currentLang][key] ?? '';
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
    document.getElementById('dUsername').textContent = displayName;

    // Status dots
    ['dStatusDot', 'heroStatusDot'].forEach(id => {
        const el = document.getElementById(id);
        el.className = el.className.replace(/online|idle|dnd|offline/g, '').trim() + ' ' + status;
    });

    refreshStatusText();
    renderActivity(data);
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
// Header name typing animation
// ============================================================
function initHeaderTyping() {
    const el   = document.getElementById('headerName');
    const text = 'AKIRA';
    let i = 0;

    (function tick() {
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) setTimeout(tick, 130);
    })();
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

    initHeaderTyping();
    buildLinks();

    fetchDiscord();
    setInterval(fetchDiscord, 30_000);
}

document.addEventListener('DOMContentLoaded', init);
