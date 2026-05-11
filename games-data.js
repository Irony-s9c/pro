// logo: Steamゲームは各ゲームのストアページから取得
// logoFit: 'cover' = バナー画像(Steam等), 'contain' = ロゴ画像(透過背景等)

const GAMES = [
    {
        id: 'minecraft',
        name: 'Minecraft',
        logo: 'https://minecraft.wiki/images/MC_key_art_2024.jpg',
        logoFit: 'cover',
        logoPosition: 'center',
        desc: {
            ja: '整地をしすぎて建築とPVPがへたくそ',
            en: 'Too much terraforming — terrible at building and PVP',
            ko: '정지 작업만 너무 해서 건축이랑 PVP가 형편없음',
            zh: '挖太多地了，建築和PVP都很差',
        },
        details: {
            ja: 'とにかく整地が大好きです。気づいたら初期リス付近を平らにしていることがよくります。建築はほぼ四角い箱しか作れないし、PVPはゾンビにも負けることがたくさんあります。',
            en: 'I absolutely love terraforming. Before I know it, I\'ve flattened everything near the spawn point. My buildings are embarrassingly basic boxes, and in PVP I lose to zombies all the time.',
            ko: '정지 작업이 너무 좋아서 어느새 초기 스폰 근처를 다 평평하게 만들고 있는 경우가 많아요. 건축은 그냥 네모 상자 수준이고, PVP는 좀비한테도 지는 일이 많습니다.',
            zh: '我超愛整地。不知不覺就把初始出生點附近都整平了。建築只會蓋方方正正的箱子，PVP連殭屍都打不贏，輸了很多次。',
        },
        screenshots: [],
    },
    {
        id: 'vrchat',
        name: 'VRChat',
        logo: 'https://cdn.akamai.steamstatic.com/steam/apps/438100/header.jpg',
        logoFit: 'cover',
        desc: {
            ja: '入りたてで右も左もわからない迷子USER',
            en: 'Brand new USER who has no idea what they\'re doing',
            ko: '갓 시작한 방향치 USER',
            zh: '剛加入的迷路USER，左右都分不清',
        },
        details: {
            ja: 'まだ始めたばかりで、ワールドの移動の仕方すらよくわかっていません。アバターはデフォルトのままで、ジェスチャーも全然使えていないです。でも色んな人と話すのが楽しくて、少しずつ慣れていっています。気軽に声かけてください！',
            en: 'Just started and still figuring out how to navigate between worlds. Still on a default avatar and barely know how gestures work. But I really enjoy meeting people and I\'m slowly getting the hang of it. Feel free to say hi anytime!',
            ko: '이제 막 시작해서 월드 이동하는 방법도 잘 모릅니다. 아바타는 기본 그대로고 제스처도 거의 못 씁니다. 그래도 여러 사람들이랑 이야기하는 게 재밌어서 조금씩 익숙해지고 있어요. 편하게 말 걸어 주세요!',
            zh: '剛開始玩，連怎麼在世界之間移動都還不太會。頭像還是預設的，手勢也幾乎不會用。不過跟各種人聊天很有趣，正在慢慢習慣中。歡迎隨時跟我打招呼！',
        },
        screenshots: [],
    },
    {
        id: 'valorant',
        name: 'VALORANT',
        logo: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/8f0df8efd5b986039cd37a4d5f3bf31b815d0c54-3840x2160.jpg',
        logoFit: 'cover',
        desc: {
            ja: 'めちゃくちゃへたくそで最高ランクはゴールド２',
            en: 'Absolutely terrible — highest rank ever is Gold 2',
            ko: '엄청 못해서 최고 랭크가 골드 2',
            zh: '超級爛，最高段位是黃金2',
        },
        details: {
            ja: 'エイムが壊滅的で、目の前の敵を外すことが普通にあります。最高ランクはゴールド２ですが、現在はもっと下にいます。得意エージェントは特になく、何を使っても微妙な成績です。チームメイトのおかげでなんとか勝てることもあります。',
            en: 'My aim is catastrophic — missing enemies standing right in front of me is completely normal. Peaked at Gold 2 but I\'m lower now. No particular agent I excel with; my stats are mediocre across the board. I occasionally win, but that\'s mostly my teammates carrying.',
            ko: '에임이 처참해서 바로 앞에 있는 적도 자주 못 맞춥니다. 최고 랭크는 골드 2였지만 지금은 더 낮아요. 특별히 잘 쓰는 요원도 없고, 누굴 해도 그냥 그저 그런 성적이에요. 팀원 덕분에 가끔은 이기기도 합니다.',
            zh: '瞄準能力災難級別——站在正前方的敵人也經常打不到。最高曾到黃金2，但現在更低了。沒有特別擅長的特工，各方面數據都很普通。偶爾能贏，但基本上都是隊友在扛。',
        },
        screenshots: [],
    },
    {
        id: 'repo',
        name: 'REPO',
        logo: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3241660/a12c92856b71315da885924ea5e1d5290c8025b8/header_alt_assets_2.jpg?t=1778158882',
        logoFit: 'cover',
        desc: {
            ja: 'すぐ死にます',
            en: 'I die instantly',
            ko: '바로 죽습니다',
            zh: '馬上就死',
        },
        details: {
            ja: 'ホラー系の協力ゲームで、モンスターを見た瞬間に固まって何もできなくなります。チームの中で一番最初に死ぬ役割を担っています。それでもフレンドとやると楽しいです。',
            en: 'A co-op horror game where I freeze completely the moment I see a monster. I reliably die first on my team every single run. Still a blast with friends though.',
            ko: '협력 공포 게임인데, 몬스터를 보는 순간 굳어버려서 아무것도 못 합니다. 팀 중에서 항상 제일 먼저 죽는 역할을 맡고 있어요. 그래도 친구들이랑 하면 재밌어요.',
            zh: '合作恐怖遊戲，一看到怪物就會整個人僵住，什麼都做不了。每次都是隊伍裡第一個死的那個人。不過跟朋友一起玩超有趣的。',
        },
        screenshots: [],
    },
    {
        id: 'peak',
        name: 'PEAK',
        logo: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg?t=1775581133',
        logoFit: 'cover',
        desc: {
            ja: 'すぐ死にます。一人でできません',
            en: 'I die instantly. Can\'t do it solo',
            ko: '바로 죽습니다. 혼자서는 못 해요',
            zh: '馬上就死。沒辦法單人',
        },
        details: {
            ja: '山登り系の協力ゲームで、一人では絶対に登れません。落下死が多すぎてチームの足を引っ張り続けています。でも頂上に着いたときの達成感は最高です。友達と一緒じゃないと無理なので、お声がけお待ちしてます。',
            en: 'A co-op climbing game that I genuinely cannot solo. I fall to my death constantly and drag my team down with me. But the rush of reaching the summit together is absolutely worth it. I need teammates to survive, so feel free to hit me up.',
            ko: '협력 등산 게임인데, 혼자서는 절대 못 올라갑니다. 낙사를 너무 많이 해서 팀에게 항상 폐를 끼치고 있어요. 그래도 정상에 도착했을 때의 성취감은 최고입니다. 친구 없이는 불가능하니까, 같이 해요!',
            zh: '合作攀岩遊戲，我一個人根本爬不上去。一直掉落死亡，不停地拖累隊友。但一起到達頂點時的成就感是無與倫比的。沒有隊友我活不下去，快來找我一起玩吧！',
        },
        screenshots: [],
    },
];
