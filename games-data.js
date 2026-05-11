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
            ja: 'マインクラフトを5年以上続けてきましたが、鍛えられたスキルは整地だけです。ひたすら整地を繰り返した結果、ゾンビにも負けるようになってしまいました。いまプライベートサーバーが24時間開いているので、参加したい人はDiscordで気軽に聞いてください！',
            en: 'I\'ve been playing Minecraft for over 5 years, but the only skill I\'ve actually developed is terraforming. After doing nothing but flatten land, I\'ve somehow ended up losing to zombies. I have a private server open 24/7 right now — if you want to join, feel free to ask on Discord!',
            ko: '마인크래프트를 5년 이상 해왔지만, 키워진 스킬은 정지 작업뿐입니다. 계속 정지 작업만 반복한 결과, 좀비한테도 지게 되어버렸어요. 지금 프라이빗 서버가 24시간 열려 있으니, 참가하고 싶은 분은 Discord에서 편하게 물어봐 주세요！',
            zh: '玩Minecraft超過5年了，但磨練出來的技能只有整地。一直重複整地的結果，連殭屍都打不贏了。現在私人伺服器24小時開著，想加入的人歡迎在Discord隨時問我！',
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
            ja: '最近始めたばかりで、ユーザーランクもまだuserです。アバターもサンプルアバターしかないです笑。改変とかしたことないのでしてみたいです！基本、暇なときしかVRCしてないのでぜひ殴り込みに来てください。お砂糖になるくらいならリアルで付き合いたいので、そこだけお願いします。',
            en: 'Just started recently and still at user rank. I only have the sample avatars too lol. I\'ve never done any avatar customization but I\'d really love to try! I\'m basically only on when I\'m free, so feel free to come find me. Fair warning: if you\'re looking for a sugar relationship, I\'d rather make it real — just keep that in mind.',
            ko: '최근에 막 시작해서 유저 랭크도 아직 user입니다. 아바타도 샘플 아바타밖에 없어요 ㅋㅋ. 개변 같은 건 해본 적이 없어서 해보고 싶어요！기본적으로 한가할 때만 VRC를 하니까 꼭 쳐들어와 주세요. 설탕이 될 거라면 현실에서 사귀고 싶으니 그것만 부탁드립니다.',
            zh: '最近才剛開始，用戶等級還是user。頭像也只有範例頭像 笑。從來沒做過改裝，很想試試看！基本上只有空閒時才上VRChat，歡迎來找我。不過如果是想要甜甜關係的話，我寧願在現實中交往，這點請多包涵。',
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
            ja: 'Valorantを2年以上プレイしていますが、いまだゴールドスタックです。いつも味方に助けられて勝っています。でも楽しめればいいと思ってるので、ぜひ誘ってください。',
            en: 'I\'ve been playing Valorant for over 2 years but I\'m still stuck in Gold. I basically win by relying on my teammates. That said, as long as I\'m having fun it\'s all good — so please invite me!',
            ko: 'Valorant를 2년 이상 플레이하고 있지만 아직도 골드에 머물러 있습니다. 항상 팀원들 덕분에 이기고 있어요. 그래도 즐길 수 있으면 된다고 생각하니까 꼭 불러주세요.',
            zh: '玩Valorant超過2年了，但還是卡在黃金段位。每次都靠隊友才能贏。不過我覺得開心就好，歡迎揪我一起玩！',
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
            ja: 'マジでへたくそで、いつもアイテムをあさっているときにショットガンおじさんにしばかれます。知識も古いのでマップもわかりません。それでも友達とするR.E.P.Oはマジで最高だと思ってます。どしどし誘ってください。',
            en: 'Genuinely terrible at this game. I\'m always getting jumped by the shotgun monster while looting. My knowledge is outdated too so I have no idea where anything is. Even so, playing R.E.P.O. with friends is an absolute blast. Invite me anytime!',
            ko: '진짜 못해서, 아이템 뒤지고 있을 때 항상 샷건 아저씨한테 얻어맞습니다. 지식도 옛날 거라 맵도 모릅니다. 그래도 친구들이랑 하는 R.E.P.O.는 진짜 최고라고 생각해요. 얼마든지 불러주세요.',
            zh: '真的超爛，每次在收集物品的時候就會被散彈槍大叔揍。知識也是舊的，地圖也搞不清楚。就算這樣，跟朋友一起玩R.E.P.O.真的是最棒的。隨時歡迎揪我！',
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
            ja: '発売日からちょくちょくプレイしていますが、いつも途中で眠くなって滑って落下死します😢それでも誘ってくれればやるので、ぜひ誘ってください。',
            en: 'I\'ve been playing on and off since launch, but I always get sleepy halfway through and end up sliding off and falling to my death 😢 That said, I\'ll play if you invite me — so please do!',
            ko: '발매일부터 종종 플레이하고 있는데, 항상 도중에 졸려서 미끄러져 낙사합니다😢 그래도 불러주면 할 거니까 꼭 불러주세요.',
            zh: '從發售日就偶爾在玩，但總是玩到一半就想睡，然後滑下去墜落死亡😢 就算這樣，叫我一起玩的話我會去的，歡迎揪我！',
        },
        screenshots: [],
    },
];
