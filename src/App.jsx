import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════ */
const C = {
  navy:    "#1B3A6B", navyMid: "#2952A3", navyLt: "#3B6FD4",
  ocean:   "#0EA5E9", aqua: "#06B6D4", foam: "#38BDF8", mist: "#E0F2FE",
  coral:   "#F97316", mint: "#10B981", violet: "#8B5CF6", amber: "#F59E0B",
  rose:    "#F43F5E", teal: "#14B8A6", pink: "#EC4899", indigo: "#6366F1",
  bg:      "#F8FAFF", bgCard: "#FFFFFF", bgMist: "#EFF6FF",
  txt1:    "#0F172A", txt2: "#334155", txt3: "#64748B", txt4: "#94A3B8",
  border:  "#DBEAFE", borderMd: "#BFDBFE",
  gold:    "#D4A017", goldLt: "#FEF3C7",
};

const TIMEREX_URL = "https://timerex.net/s/jobagency_4d9c/0fb7dbf2";
const GAS_URL = "https://script.google.com/macros/s/AKfycbyuWyb2LtCDP9dMRUS1i_S6VxZEyCpHGz8xcbxuLvztehM3cpOK_Id5IG8sTLAHXUer/exec";

/* ════════════════════════════════════════
   16 PERSONALITY TYPES
════════════════════════════════════════ */
const TYPES = {
  // I系統 サポート
  iI: { name:"心の橋渡し役",  sub:"共感者",   system:"🤝 協調タイプ", color:"#F59E0B", bg:"#FEF3C7",
    catch:"周りの気持ちを誰より理解できるタイプ"
    desc:"周りの人の気持ちを誰よりも敏感に察知できる、生まれながらの共感者。人の話をじっくり聞き、相手の立場に立って考えることが自然にできます。争いを好まず、周囲との調和を大切にします。人間関係が豊かで、困っている人がいるとすぐに手を差し伸べる優しさが最大の武器です。チームの潤滑油として、組織に欠かせない存在になれるタイプです。",
    keys:["共感力","思いやり","調和","サポート","聞き上手"],
    good:["誰とでもすぐに打ち解けられる温かさ","相手の気持ちを察する高い共感力","チームの雰囲気を和ませるムードメーカー"],
    care:["自分の意見を後回しにしすぎてしまう","感情移入しすぎて疲れることも"],
    jobs:["事務職","受付・事務","医療・介護職","販売職"],
    env:"人との関わりが多く、温かいチームの職場",
    change: 35 },
  iP: { name:"縁の下の太陽",  sub:"貢献者",   system:"🤝 協調タイプ", color:"#F59E0B", bg:"#FEF3C7",
    catch:"一緒にいて絶妙な安心感を与えるタイプ"
    desc:"一緒にいるだけで不思議と安心できる、穏やかな雰囲気の持ち主。コツコツと努力を積み重ね、周囲から信頼されやすいタイプです。少し不安な面があるためダブルチェックを行う傾向があり、失敗も少ないです。慎重さが求められる仕事や研究の分野で良い結果を出しやすいです。自分より相手を優先する優しさで、周りから愛される存在です。",
    keys:["人間関係","信頼","貢献","穏やかさ","サポート"],
    good:["優しくて思いやりがあり、誰とでも仲良くなれる","周囲を和ませ、安心感を与えるムードメーカー的存在","丁寧で正確な仕事ぶりで、信頼を集める"],
    care:["周りを気にしすぎてしまうことがある","決断力に欠け、リーダーシップを発揮するのは苦手"],
    jobs:["事務職","受付・事務","販売職","医療・介護職"],
    env:"穏やかな社風で、チームの関係が良い職場",
    change: 50 },
  iA: { name:"頼れる守護者",  sub:"支援者",   system:"🤝 協調タイプ", color:"#F59E0B", bg:"#FEF3C7",
    catch:"縁の下の力持ちとして組織を支えるタイプ"
    desc:"指示されたことを正確にこなす、高い実務能力を持つタイプ。心配性な一面がダブルチェックの習慣を生み出し、ミスが少ない丁寧な仕事ぶりが特徴です。タスクを安心して任せられる信頼感があり、縁の下の力持ちとして組織を支えます。頑張りすぎてしまう傾向があるので、無理しすぎず自分のペースを大切にすることが大事です。",
    keys:["サポート","誠実","丁寧","協調性","忠実"],
    good:["指示されたことを正確にこなす高い実務能力","心配性な性格が生む丁寧なダブルチェック習慣","タスクを安心して任せられる信頼感"],
    care:["頑張りすぎてしまう傾向がある","タスクの抱え込みすぎには注意"],
    jobs:["事務職","施工管理職","受付・事務","販売職"],
    env:"安心して働けるルーティンワークが多い職場",
    change: 30 },
  iD: { name:"深海の哲人",    sub:"思索者",   system:"🤝 協調タイプ", color:"#F59E0B", bg:"#FEF3C7",
    catch:"じっくり深く考えて最善を導き出すタイプ"
    desc:"思考の幅が広く深く、様々な要求に応えられる知的な柔軟性を持つタイプ。慎重に決断を下す丁寧さと、脳内で何度も考えてから行動する確認癖があり、失敗が少ないです。外部にはあまり自分を見せない傾向があります。じっくり考えてから最善の答えを出すため、分析・研究・企画職などで高い成果を発揮できるタイプです。",
    keys:["思慮深さ","慎重","内省","分析","誠実"],
    good:["思考の幅が広く深い、多様な要求に応える力","慎重に決断をくだす丁寧さ","脳内で何度も考え確認する傾向で、失敗が少ない"],
    care:["外部にはあまり自分を見せない傾向がある","即断即決が求められる場面は苦手"],
    jobs:["エンジニア職","事務職","WEBデザイナー","コンサルタント"],
    env:"じっくり考えられる落ち着いた環境",
    change: 40 },
  // P系統 バイタリティ
  pI: { name:"チームの火種",  sub:"協創者",   system:"⚡ 行動タイプ", color:"#EC4899", bg:"#FDF2F8",
    catch:"チームをまとめてみんなで前進するタイプ"
    desc:"組織の中で調整役として活躍できる、明るく前向きなタイプです。チームをひとつにまとめ、全員が同じ方向を向いて進める力があります。人懐っこい性格ですぐに仲良くなれるため、初対面でも壁を作りません。活気あるチームの中でモチベーション高く働けます。ただし専門性を深めることが後回しになりがちな点は意識しておきましょう。",
    keys:["協調","明るさ","チームワーク","前向き","人好き"],
    good:["組織の中で調整役として活躍できる力","明るく前向きな姿勢でチームを引っ張る","人懐っこくすぐに人と仲良くなれる"],
    care:["自分の専門性を深めることが後回しになりがち","一人で黙々とする作業は苦手"],
    jobs:["営業職","販売職","受付・事務","医療・介護職"],
    env:"活気があり、チームで動くことが多い職場",
    change: 45 },
  pP: { name:"場を彩る太陽",  sub:"活力者",   system:"⚡ 行動タイプ", color:"#EC4899", bg:"#FDF2F8",
    catch:"いるだけで場を明るくする天性のムードメーカー"
    desc:"いるだけで場が明るくなる、天性のムードメーカーです。ポジティブなエネルギーでチームを鼓舞し、みんなのやる気を引き上げます。社交的で誰とでも仲良くなれる反面、長く辛抱する粘り強さも持ち合わせています。計画を立てるよりも動きながら考えるタイプなので、勢いと熱量が武器です。活発な職場環境で最大限に輝けます。",
    keys:["明るさ","社交性","楽観","エネルギー","チーム"],
    good:["明るく社交的でチームに活気を生み出す","長く辛抱できる粘り強さを持つ","チームのモチベーションを上げる存在感"],
    care:["慎重さに欠ける場面がある","計画を立てるのが苦手なことも"],
    jobs:["営業職","販売職","飲食・調理職","受付・事務"],
    env:"活発でポジティブな雰囲気の職場",
    change: 55 },
  pA: { name:"こだわりの芸人", sub:"職人気質", system:"⚡ 行動タイプ", color:"#EC4899", bg:"#FDF2F8",
    catch:"明るく大胆な性格と精密さを兼ね備えた職人気質"
    desc:"明るく大胆な性格と、高い完成度へのこだわりを兼ね備えた職人気質のタイプ。自分の専門分野に深い情熱を注ぎ、クオリティを妥協しません。基本的な社交性もあり、どこでも打ち解けやすいです。ものづくりや創造性を発揮できる環境で特に力を発揮します。こだわりが強い分、時間がかかることもありますが、その分高品質な結果を生み出します。",
    keys:["創造性","職人","完成度","センス","こだわり"],
    good:["高い完成度へのこだわりで質の高い仕事","基本的な社交性でどこでも打ち解けやすい","自分の専門分野に深い情熱を持つ"],
    care:["自分の専門以外への関心は薄めなことも","こだわりが強すぎて時間がかかることも"],
    jobs:["WEBデザイナー","エンジニア職","クリエイター","飲食・調理職"],
    env:"専門性を発揮できるクリエイティブな環境",
    change: 40 },
  pD: { name:"道なき道を行く人", sub:"開拓者", system:"⚡ 行動タイプ", color:"#EC4899", bg:"#FDF2F8",
    catch:"思いついたことをすぐに行動に移せる行動派"
    desc:"思いついたことをすぐに行動に移せる、スピード感抜群の行動派です。回り道を嫌い、直感と勢いで物事を切り開いていきます。営業や新規開拓など、前に進むことが求められる仕事で高い成果を出します。ある程度の知識だけで動き始める行動力が強みですが、慎重さが足りないと指摘されることも。失敗を恐れずチャレンジし続けることで成長できます。",
    keys:["行動力","挑戦","スピード","決断","開拓"],
    good:["思いついたことをすぐ行動に移す決断力","営業や事業展開への高い適性","回り道を嫌うスピード感ある仕事ぶり"],
    care:["慎重さが足りないと指摘されることも","特定の専門知識が浅くなりがち"],
    jobs:["営業職","施工管理職","コンサルタント","エンジニア職"],
    env:"裁量が大きく挑戦できるダイナミックな職場",
    change: 60 },
  // A系統 アナライズ
  aI: { name:"積み上げの達人", sub:"勤勉者",  system:"🧠 思考タイプ", color:"#0EA5E9", bg:"#EFF9FF",
    catch:"コツコツと正確に積み上げることが誰より得意"
    desc:"コツコツと正確に作業を積み重ねる継続力が誰より優れたタイプです。責任感が強く、周囲からよく頼られる信頼の厚い存在です。真面目で周りをよく観察し、分析力も持ち合わせています。ただし周りの意見を聞きすぎて流されてしまうことがあるのが課題です。安定した環境で着実に成果を出す仕事、特に正確さが求められる職種で本領を発揮します。",
    keys:["努力","誠実","正確","責任感","継続"],
    good:["コツコツ正確に作業を積み重ねる継続力","責任感が強く周囲から頼られる存在","よく観察し分析もできる堅実なタイプ"],
    care:["周りの意見を聞きすぎて流されることも","自分の意見をはっきり言うのが苦手な場面も"],
    jobs:["事務職","エンジニア職","施工管理職","受付・事務"],
    env:"正確さと継続性が評価される安定した職場",
    change: 30 },
  aP: { name:"頼れる仕事人",  sub:"実務者",  system:"🧠 思考タイプ", color:"#0EA5E9", bg:"#EFF9FF",
    catch:"正確でスピーディーな仕事で周りの頼れる存在"
    desc:"正確かつスピーディーな仕事ぶりで周囲から頼られる、頼もしい実務のプロです。真面目な姿勢が周囲の信頼を集め、時間をかければ誰とでも仲良くなれます。一見クールに見えることもありますが、実は温かい人柄の持ち主です。ルーティンワークを高いクオリティで継続できる強みがあり、事務・施工管理・エンジニアなど幅広い職種で活躍できます。",
    keys:["実務力","正確","スピード","信頼","堅実"],
    good:["正確かつスピーディーな仕事で頼られる","真面目な性格に打ち解けてくる人も多い","信頼できる仲間になりやすい"],
    care:["一見するといつも冷静に見えすぎることも","社交的になるまで時間がかかる場面も"],
    jobs:["事務職","施工管理職","エンジニア職","受付・事務"],
    env:"正確さとスピードが求められる実務的な職場",
    change: 35 },
  aA: { name:"知の航海士",    sub:"探求者",  system:"🧠 思考タイプ", color:"#0EA5E9", bg:"#EFF9FF",
    catch:"高い調査能力で深い専門知識を持つ情報のプロ"
    desc:"高い調査能力で信頼できる情報を収集し、一つの分野に特化した深い専門性を持つタイプです。知的で静かな安定感があり、専門家として周囲から頼られる存在になります。情報収集や研究が好きで、ひとつのことを深く掘り下げることに喜びを感じます。行動に移すまで慎重になりすぎる傾向があるので、ある程度のところで決断することも大切です。",
    keys:["探求心","知識","分析","専門性","慎重"],
    good:["高い調査能力で信頼できる情報を収集","一つの分野に特化した深い専門性","知的で静かな安定感で周囲から頼られる"],
    care:["情報収集に時間をかけすぎることも","行動に移すまで慎重になりすぎることも"],
    jobs:["エンジニア職","コンサルタント","WEBデザイナー","事務職"],
    env:"専門知識を活かせる研究・分析系の職場",
    change: 25 },
  aD: { name:"データの魔術師", sub:"分析者",  system:"🧠 思考タイプ", color:"#0EA5E9", bg:"#EFF9FF",
    catch:"高い分析力と合理性でデータから答えを出すタイプ"
    desc:"高い分析力と合理性を兼ね備え、データや数字から的確な答えを導き出すタイプです。他人の間違いを発見する目の鋭さと、大量のデータを整理・可視化する能力に優れています。几帳面で精度の高い仕事を好みます。感情面よりも論理を優先しがちなので、人とのコミュニケーションでは相手の気持ちにも配慮することで、さらに力を発揮できます。",
    keys:["論理","分析","合理性","データ","精度"],
    good:["高い分析力と合理性で他人の間違いを発見","膨大なデータを整理し可視化する能力","タスクを制度高く仕上げる几帳面さ"],
    care:["人の感情面への配慮が後回しになることも","完璧主義すぎて時間がかかることも"],
    jobs:["エンジニア職","コンサルタント","事務職","WEBデザイナー"],
    env:"データや数字を扱う論理的な職場",
    change: 30 },
  // D系統 イノベート
  dI: { name:"波を起こす人",  sub:"推進者",  system:"🚀 挑戦タイプ", color:"#10B981", bg:"#ECFDF5",
    catch:"人を引きつけてプロジェクトを前に進めるタイプ"
    desc:"即断即決で人を引きつけ、プロジェクトを前に進める推進力の持ち主です。過去の失敗から素早く立ち直る回復力も高く、年齢と共に成熟度が増していくタイプです。広い人脈を活かして情報を集め、チームを動かすことが得意です。一人で深く考えるより、多くの人と関わりながら動く環境で最大限の力を発揮します。営業・販売など対人職に向いています。",
    keys:["推進力","社交","即断","熱意","リーダー"],
    good:["即断即決で人を引きつけていく推進力","過去の失敗から素早く立ち直る回復力","年齢と共に成熟度が増す長所"],
    care:["一人の深い関係よりも広い関係を好む","冷静に物事を深く考える場面は苦手なことも"],
    jobs:["営業職","施工管理職","販売職","飲食・調理職"],
    env:"人と関わり、前に進めることが多い活動的な職場",
    change: 55 },
  dP: { name:"旗手",          sub:"指揮者",  system:"🚀 挑戦タイプ", color:"#10B981", bg:"#ECFDF5",
    catch:"強いリーダーシップと高い行動力で組織を牽引"
    desc:"強いリーダーシップと高い行動力でチームを率いる、生まれながらのリーダータイプです。責任感が非常に強く、何事も「自分がやる」という姿勢で臨みます。決断が速く、チームをまとめながら目標へ突き進む力があります。チームを率いる立場ゆえに孤独を感じることもありますが、信頼できる仲間を作ることで長期的に力を発揮できるタイプです。",
    keys:["リーダーシップ","決断","責任","行動力","目標"],
    good:["強いリーダーシップと高い行動力","チームを引っ張り責任感が非常に強い","決断が速く何事もできると思っている自信"],
    care:["チームを率いる立場ゆえに孤独になることも","物事を考える脳みその速さで周囲と齟齬も"],
    jobs:["施工管理職","営業職","コンサルタント","エンジニア職"],
    env:"リーダーシップを発揮できる責任ある職場",
    change: 50 },
  dA: { name:"広角の先導者",  sub:"調和者",  system:"🚀 挑戦タイプ", color:"#10B981", bg:"#ECFDF5",
    catch:"広い視野と高い分析力で物事の仕組みを解明する"
    desc:"広い視野と高い分析力で物事の仕組みを深く理解できる、ポテンシャルの高いタイプです。周りから信頼され、専門性を磨いていくと経営層へと成長するケースも多いです。多様な人と協力しながら課題を解決する能力に優れています。一人の時間も必要なバランス型のため、自分のペースを守りながら着実にキャリアを積み上げていける環境が向いています。",
    keys:["調整力","広い視野","分析","信頼","潜在能力"],
    good:["広い視野と高い分析力で物事を深く考える","周りから信頼されるポテンシャルの高さ","専門を極めた場合、多くの人が経営層になる"],
    care:["専門性を深めるのに時間がかかることも","一人の時間も必要なバランス型"],
    jobs:["施工管理職","営業職","コンサルタント","エンジニア職"],
    env:"多様な人と協力しながら課題解決できる職場",
    change: 45 },
  dD: { name:"常識を壊す人",  sub:"革新者",  system:"🚀 挑戦タイプ", color:"#10B981", bg:"#ECFDF5",
    catch:"他人の意見に左右されず自分の道を突き進むタイプ"
    desc:"他人の意見に左右されない強烈な個性と、目標に向かって一直線に突き進むスピード感が最大の武器です。特定の分野で世界水準の専門家になれる可能性を持つ、革新者タイプです。自分で決めた目標は必ず達成しようとする強い意志があります。周囲との意見のすり合わせに時間がかかることもありますが、その分こだわりを持った高品質な成果物を生み出します。",
    keys:["革新","独立","目標達成","スピード","専門"],
    good:["他人の意見に左右されない強い個性","断部即決行動が最も多いスピード感","特定分野で世界水準の専門家になりやすい"],
    care:["他の道を許さないほどの専門家になりやすい","周囲との意見のすり合わせに時間がかかることも"],
    jobs:["エンジニア職","コンサルタント","WEBデザイナー","施工管理職"],
    env:"裁量が大きく、革新的なことに挑戦できる職場",
    change: 55 },
};

/* ════════════════════════════════════════
   AXES & QUESTIONS (5軸×8問=40問)
════════════════════════════════════════ */
const AXES = [
  { id:"I", label:"協調性",   color:"#F59E0B", lt:"#FEF3C7", icon:"🤝" },
  { id:"P", label:"バイタリティ", color:"#EC4899", lt:"#FDF2F8", icon:"⚡" },
  { id:"A", label:"分析力",   color:"#0EA5E9", lt:"#EFF9FF", icon:"🧠" },
  { id:"D", label:"行動力",   color:"#10B981", lt:"#ECFDF5", icon:"🚀" },
  { id:"X", label:"安定志向", color:"#8B5CF6", lt:"#F5F3FF", icon:"🛡️" },
];

// 5軸 × 4問 = 全20問
const QS = [
  // I軸（協調性）4問
  {axis:"I",q:"初対面の人と話すとき、あなたは？",opts:[{t:"積極的に話しかけてすぐ仲良くなる",v:4},{t:"様子を見ながら徐々に関わる",v:3},{t:"相手から来るのを待つ",v:2},{t:"必要最低限の会話にとどめる",v:1}]},
  {axis:"I",q:"友達や同僚が悩んでいるとき、あなたは？",opts:[{t:"すぐに話を聞いて一緒に解決策を考える",v:4},{t:"相談されたら全力でサポートする",v:3},{t:"アドバイスはするが深入りはしない",v:2},{t:"本人が解決すべきと思う",v:1}]},
  {axis:"I",q:"意見が対立したとき、どうする？",opts:[{t:"相手の気持ちを理解して歩み寄る",v:4},{t:"お互いの意見の良い部分を取り入れる",v:3},{t:"論理的に正しい方を選ぶ",v:2},{t:"自分の意見を通す",v:1}]},
  {axis:"I",q:"職場での人間関係について？",opts:[{t:"職場の人たちと仲良くなることが仕事のモチベーション",v:4},{t:"良好な関係は大切だが、仕事あってこそ",v:3},{t:"プロとして関係が保てればよい",v:2},{t:"仕事とプライベートは分けたい",v:1}]},
  // P軸（バイタリティ）4問
  {axis:"P",q:"新しいことに挑戦するとき、あなたは？",opts:[{t:"とにかくやってみる！失敗も経験",v:4},{t:"大まかに計画してから挑戦する",v:3},{t:"十分準備してから慎重に進む",v:2},{t:"リスクが低いことから始める",v:1}]},
  {axis:"P",q:"プレッシャーがかかったとき？",opts:[{t:"むしろテンションが上がって力が出る",v:4},{t:"適度な緊張感がプラスに働く",v:3},{t:"落ち着いて対処できる",v:2},{t:"消耗しやすいが乗り越えられる",v:1}]},
  {axis:"P",q:"変化に対するあなたの姿勢は？",opts:[{t:"大歓迎！変化こそ成長のチャンス",v:4},{t:"メリットがあれば積極的に対応",v:3},{t:"必要なら対応するが安定も大事",v:2},{t:"できれば変化は少ない方が良い",v:1}]},
  {axis:"P",q:"失敗したとき、どうなる？",opts:[{t:"すぐに切り替えて次に活かす",v:4},{t:"原因を分析して前向きに対処",v:3},{t:"落ち込むが時間をかけて立ち直る",v:2},{t:"慎重になるが確実に乗り越える",v:1}]},
  // A軸（分析力）4問
  {axis:"A",q:"情報を整理するとき？",opts:[{t:"論理的な枠組みで体系的に分類する",v:4},{t:"重要度で優先順位をつけて整理する",v:3},{t:"感覚で全体像を掴んでから整理",v:2},{t:"必要なものだけを手元に置く",v:1}]},
  {axis:"A",q:"問題に直面したとき？",opts:[{t:"まず原因を徹底的に分析する",v:4},{t:"データや事実を集めて判断する",v:3},{t:"経験や直感で素早く対処する",v:2},{t:"チームに相談して一緒に解決する",v:1}]},
  {axis:"A",q:"仕事の質とスピードどちらを重視？",opts:[{t:"質を最優先、時間をかけても丁寧に",v:4},{t:"質重視だがスピードも意識する",v:3},{t:"バランスよく両方を大切にする",v:2},{t:"スピード重視で素早くこなす",v:1}]},
  {axis:"A",q:"複雑な問題を解くとき？",opts:[{t:"要素を分解して論理的に解決する",v:4},{t:"過去の事例を参考にして解決する",v:3},{t:"複数の視点から考えて解決する",v:2},{t:"直感とスピードで突破する",v:1}]},
  // D軸（行動力）4問
  {axis:"D",q:"大事な決断をするとき？",opts:[{t:"素早く判断してすぐに行動する",v:4},{t:"必要な情報を集めてから決断する",v:3},{t:"周囲の意見も参考にして決める",v:2},{t:"慎重に熟考してから決める",v:1}]},
  {axis:"D",q:"チームでのあなたの役割は？",opts:[{t:"引っ張るリーダー役が自然",v:4},{t:"状況によってリーダーも担える",v:3},{t:"サポートやフォロー役が得意",v:2},{t:"自分の専門で貢献するのが好き",v:1}]},
  {axis:"D",q:"リスクへの向き合い方は？",opts:[{t:"リスクを取ってでも大きな成果を狙う",v:4},{t:"リスクを管理しながら挑戦する",v:3},{t:"リスクを最小限にして着実に進む",v:2},{t:"安全第一でリスクは避けたい",v:1}]},
  {axis:"D",q:"仕事のペースは？",opts:[{t:"常にフルスロット、ガンガン進む",v:4},{t:"集中して効率よく素早くこなす",v:3},{t:"ペースを保ちながら安定して進む",v:2},{t:"じっくり丁寧に確実に進める",v:1}]},
  // X軸（安定志向）4問
  {axis:"X",q:"職場に求めることは？",opts:[{t:"安定した収入と長く働ける環境",v:4},{t:"成長できる環境と適切な待遇",v:3},{t:"やりがいと仲間に恵まれた職場",v:2},{t:"自由度が高くチャレンジできる環境",v:1}]},
  {axis:"X",q:"仕事とプライベートのバランスは？",opts:[{t:"プライベートを最優先にしたい",v:4},{t:"両方バランスよく大切にしたい",v:3},{t:"仕事も大事だが余裕は持ちたい",v:2},{t:"仕事に集中して成果を出したい",v:1}]},
  {axis:"X",q:"収入と仕事の安定性について？",opts:[{t:"安定した収入と雇用が最優先",v:4},{t:"ある程度の安定があれば挑戦もしたい",v:3},{t:"成果次第で収入が上がる環境が良い",v:2},{t:"リスクを取っても高収入を目指したい",v:1}]},
  {axis:"X",q:"10年後の自分のイメージは？",opts:[{t:"安定した生活と信頼できる仲間",v:4},{t:"専門性を持った信頼されるプロ",v:3},{t:"多くの経験を積んだ幅広い人材",v:2},{t:"業界で名の知れた存在や起業家",v:1}]},
];

const JOB_OPTIONS = ["事務職","受付・事務","施工管理職","エンジニア職","営業職","販売職","WEBデザイナー","飲食・調理職","医療・介護職","マーケティング","コンサルタント","クリエイター","まだわからない"];
const TIMING_OPTIONS = ["今すぐ","1ヶ月〜3ヶ月以内","3ヶ月以上先","考えていない"];
const PREF_OPTIONS = ["東京","神奈川","埼玉","千葉","大阪","名古屋","福岡","その他（全国）","リモート希望"];

/* ════════════════════════════════════════
   SCORING & TYPE DETECTION
════════════════════════════════════════ */
function calcScores(answers) {
  const raw = { I:0, P:0, A:0, D:0, X:0 };
  answers.forEach((ans, i) => {
    if (ans !== null) raw[QS[i].axis] += QS[i].opts[ans].v;
  });
  const scores = {};
  // 8問×最大4点=32、最小8点 → 0〜100
  Object.keys(raw).forEach(k => {
    scores[k] = Math.max(0, Math.min(100, Math.round(((raw[k]-4)/12)*100)));
  });
  return scores;
}

function detectType(scores) {
  const { I, P, A, D, X } = scores;
  // 主軸判定
  const mainAxis = I>=P && I>=A && I>=D ? "I" : P>=A && P>=D ? "P" : A>=D ? "A" : "D";
  // 副軸判定（4軸の中から2番目）
  const vals = {I,P,A,D};
  const sorted = Object.entries(vals).sort((a,b)=>b[1]-a[1]);
  const subAxis = sorted[1][0];
  const key = (mainAxis+subAxis).toLowerCase();
  // マッピング
  const map = {
    ii:"iI", ip:"iP", ia:"iA", id:"iD",
    pi:"pI", pp:"pP", pa:"pA", pd:"pD",
    ai:"aI", ap:"aP", aa:"aA", ad:"aD",
    di:"dI", dp:"dP", da:"dA", dd:"dD",
  };
  return map[key] || "iP";
}

/* ════════════════════════════════════════
   CSS
════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
button,a,input{font-family:'Noto Sans JP','Hiragino Sans',sans-serif;}
body{background:#F8FAFF;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes floatB{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
@keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes waveSweep1{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes waveSweep2{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
@keyframes waveSweep3{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes quizFloat{0%{transform:translateY(0) scale(1);opacity:.5}100%{transform:translateY(-12px) scale(1.1);opacity:1}}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.15);opacity:.7}}
@keyframes glowPulse{0%,100%{opacity:.6}50%{opacity:1}}
.fu{animation:fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;}
.fu1{animation:fadeUp 0.55s 0.07s cubic-bezier(0.16,1,0.3,1) both;}
.fu2{animation:fadeUp 0.55s 0.14s cubic-bezier(0.16,1,0.3,1) both;}
.fu3{animation:fadeUp 0.55s 0.21s cubic-bezier(0.16,1,0.3,1) both;}
`;

/* ════════════════════════════════════════
   SUB COMPONENTS
════════════════════════════════════════ */
function WaveHeader({ children, compact=false }) {
  return (
    <div style={{ position:"relative", background:`linear-gradient(135deg,${C.navy} 0%,${C.navyMid} 60%,${C.navyLt} 100%)`, paddingBottom:compact?48:64, overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(59,111,212,0.08)", pointerEvents:"none" }}/>
      {[...Array(6)].map((_,i)=>(
        <div key={i} style={{ position:"absolute", width:`${4+(i%3)*3}px`, height:`${4+(i%3)*3}px`, borderRadius:"50%", background:`rgba(56,189,248,${0.12+(i%3)*0.06})`, left:`${10+(i*18)%78}%`, top:`${8+(i*27)%65}%`, animation:`floatB ${3+i%3}s ease-in-out ${i*0.5}s infinite alternate` }}/>
      ))}
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
      <svg style={{ position:"absolute", bottom:-1, width:"100%", zIndex:1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60Z" fill={C.bg}/>
      </svg>
    </div>
  );
}

function Bar({ score, color, delay=0 }) {
  const [w, setW] = useState(0);
  useEffect(()=>{ const t=setTimeout(()=>setW(score),400+delay); return()=>clearTimeout(t); },[score,delay]);
  return (
    <div style={{ height:10, background:"#E2EBF6", borderRadius:99, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${w}%`, background:`linear-gradient(90deg,${color}99,${color})`, borderRadius:99, transition:"width 1.1s cubic-bezier(0.16,1,0.3,1)", boxShadow:`0 0 8px ${color}44` }}/>
    </div>
  );
}

function CircleChart({ value, color }) {
  const [v, setV] = useState(0);
  useEffect(()=>{ const t=setTimeout(()=>setV(value),600); return()=>clearTimeout(t); },[value]);
  const r = 40, circ = 2*Math.PI*r;
  const dash = (v/100)*circ;
  return (
    <div style={{ position:"relative", width:100, height:100, margin:"0 auto" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E2EBF6" strokeWidth="10"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition:"stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:20, fontWeight:900, color }}>{v}%</span>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:"block", fontSize:13, fontWeight:700, color:C.txt2, marginBottom:7 }}>
        {label}{required && <span style={{ color:C.rose, marginLeft:4 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function FInput({ value, onChange, placeholder, type="text" }) {
  const [focus, setFocus] = useState(false);
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{ width:"100%", padding:"12px 14px", fontSize:type==="date"?16:14, color:C.txt1, background:C.bgCard, border:`1.5px solid ${focus?C.ocean:C.border}`, borderRadius:10, outline:"none", transition:"border-color 0.15s", WebkitAppearance:"none", appearance:"none", maxWidth:"100%" }}
    />
  );
}

/* ════════════════════════════════════════
   MAIN APP
════════════════════════════════════════ */
export default function App() {
  const resultRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [phase, setPhase]       = useState("intro");
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState(Array(20).fill(null));
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered]   = useState(null);
  const [animIn, setAnimIn]     = useState(true);
  const [scores, setScores]     = useState(null);
  const [myType, setMyType]     = useState(null);
  const [aiText, setAiText]     = useState(null);
  const [aiLoad, setAiLoad]     = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:"", birth:"", phone:"", email:"", location:"", timing:"", jobs:[], memo:"" });

  const q  = QS[current];
  const ax = AXES.find(a=>a.id===q?.axis);
  const prog = Math.round((current/20)*100);

  function setF(key, val) { setForm(f=>({...f,[key]:val})); }
  function toggleJob(j) { setForm(f=>({ ...f, jobs: f.jobs.includes(j)?f.jobs.filter(x=>x!==j):[...f.jobs,j] })); }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.birth) e.birth = "生年月日を入力してください";
    if (!form.phone.trim()) e.phone = "電話番号を入力してください";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "正しいメールアドレスを入力してください";
    if (!form.location) e.location = "希望勤務地を選択してください";
    if (!form.timing) e.timing = "就業開始時期を選択してください";
    setErrors(e);
    return Object.keys(e).length===0;
  }

  async function sendToSheet(data) {
    try {
      await fetch(GAS_URL, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    } catch(e) { console.error(e); }
  }

  function choose(idx) {
    if (selected!==null) return;
    setSelected(idx);
    const na=[...answers]; na[current]=idx; setAnswers(na);
    setTimeout(()=>{
      if (current<19) {
        setAnimIn(false);
        setTimeout(()=>{ setCurrent(c=>c+1); setSelected(null); setHovered(null); setAnimIn(true); },240);
      } else finish(na);
    },480);
  }

  function finish(ans) {
    setPhase("loading");
    const s = calcScores(ans);
    const t = detectType(s);
    setScores(s); setMyType(t);
    let step=0;
    const iv=setInterval(()=>{
      step++; setLoadStep(step);
      if(step>=5){ clearInterval(iv); setTimeout(()=>{ setPhase("result"); fetchAi(s,t); },400); }
    },440);
  }

  async function fetchAi(s, typeKey) {
    setAiLoad(true);
    const tp = TYPES[typeKey];
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:`20代前半の求職者です。パーソナリティタイプは「${tp.name}（${tp.sub}）」です。友達に話しかけるようなフレンドリーな口調で、前向きで背中を押してくれるキャリアアドバイスを180字以内で書いてください。絵文字も適度に使ってください。`}]
        })
      });
      const d=await r.json();
      setAiText(d.content?.map(b=>b.text||"").join("")||"");
    } catch { setAiText(`${tp.name}タイプのあなたには素晴らしい可能性がある！🌊 自信を持って一歩踏み出してみて。`); }
    setAiLoad(false);
  }

  /* ── PDF生成 ── */
  async function downloadPDF() {
    setPdfLoading(true);
    try {
      const tp = TYPES[myType] || TYPES["iP"];
      // jsPDFを動的ロード
      if (!window.jspdf) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });

      // フォント設定（日本語対応のためUnicode使用）
      const W = 210, margin = 18;
      let y = 20;

      // ヘッダー背景
      doc.setFillColor(27, 58, 107);
      doc.rect(0, 0, W, 50, "F");

      // ReWaveロゴテキスト
      doc.setTextColor(186, 230, 253);
      doc.setFontSize(9);
      doc.text("ReWave Career Compass", margin, 12);

      // タイプ名（英数字のみ）
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      const typeName = tp.name.replace(/[^ -]/g, "");
      doc.text(form.name ? `${form.name} san no Shindan Kekka` : "Shindan Kekka", margin, 28);
      doc.setFontSize(13);
      doc.setTextColor(186, 230, 253);
      doc.text(`Type: ${tp.sub} (${tp.system.replace(/[^ -]/g, "")})`, margin, 40);

      y = 62;

      // スコアセクション
      doc.setTextColor(27, 58, 107);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Personality Score", margin, y);
      y += 6;

      const axisLabels = [
        { label:"Kyocho-sei (Cooperation)", key:"I", color:[245,158,11] },
        { label:"Vitality", key:"P", color:[236,72,153] },
        { label:"Bunseki-ryoku (Analysis)", key:"A", color:[14,165,233] },
        { label:"Kodo-ryoku (Action)", key:"D", color:[16,185,129] },
        { label:"Antei-shiko (Stability)", key:"X", color:[139,92,246] },
      ];

      axisLabels.forEach(ax => {
        const score = scores[ax.key] || 0;
        const barW = (W - margin*2 - 30);
        // ラベル
        doc.setFontSize(9); doc.setFont("helvetica","normal");
        doc.setTextColor(51,65,85);
        doc.text(ax.label, margin, y+4);
        // バー背景
        doc.setFillColor(226,235,246);
        doc.roundedRect(margin+55, y, barW, 5, 2, 2, "F");
        // バー
        doc.setFillColor(...ax.color);
        doc.roundedRect(margin+55, y, barW*(score/100), 5, 2, 2, "F");
        // スコア数値
        doc.setTextColor(...ax.color);
        doc.setFont("helvetica","bold"); doc.setFontSize(9);
        doc.text(`${score}%`, W-margin-2, y+4, { align:"right" });
        y += 12;
      });

      y += 4;
      doc.setDrawColor(219,234,254);
      doc.line(margin, y, W-margin, y);
      y += 8;

      // 良いところ
      doc.setTextColor(27,58,107); doc.setFont("helvetica","bold"); doc.setFontSize(10);
      doc.text("Strong Points", margin, y);
      y += 6;
      tp.good.forEach((g, i) => {
        doc.setFillColor(14,165,233);
        doc.circle(margin+2, y-1, 1.5, "F");
        doc.setTextColor(51,65,85); doc.setFont("helvetica","normal"); doc.setFontSize(8.5);
        const lines = doc.splitTextToSize(g.replace(/[^ -]/g," ") || `Point ${i+1}`, W-margin*2-10);
        doc.text(lines, margin+7, y);
        y += lines.length*5 + 2;
      });

      y += 4;

      // 適職
      doc.setTextColor(27,58,107); doc.setFont("helvetica","bold"); doc.setFontSize(10);
      doc.text("Recommended Jobs", margin, y);
      y += 6;
      tp.jobs.forEach((job, i) => {
        doc.setFillColor(i===0?245:16, i===0?158:185, i===0?11:129);
        doc.roundedRect(margin + i*42, y, 38, 10, 2, 2, "F");
        doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(7.5);
        doc.text(job.replace(/[^ -]/g,"") || `Job${i+1}`, margin+i*42+19, y+6.5, { align:"center" });
      });
      y += 18;

      // 転職度
      doc.setTextColor(27,58,107); doc.setFont("helvetica","bold"); doc.setFontSize(10);
      doc.text(`Career Change Index: ${tp.change}%`, margin, y);
      y += 8;
      doc.setFillColor(226,235,246);
      doc.roundedRect(margin, y, W-margin*2, 6, 3, 3, "F");
      const tpColor = tp.color.startsWith("#") ? [
        parseInt(tp.color.slice(1,3),16),
        parseInt(tp.color.slice(3,5),16),
        parseInt(tp.color.slice(5,7),16)
      ] : [14,165,233];
      doc.setFillColor(...tpColor);
      doc.roundedRect(margin, y, (W-margin*2)*(tp.change/100), 6, 3, 3, "F");
      y += 14;

      // フッター
      doc.setFillColor(27,58,107);
      doc.rect(0, 282, W, 15, "F");
      doc.setTextColor(186,230,253); doc.setFontSize(8); doc.setFont("helvetica","normal");
      doc.text("ReWave Career Compass | rewave-shindan.vercel.app", W/2, 291, { align:"center" });
      doc.text(`Generated: ${new Date().toLocaleDateString("ja-JP")}`, W-margin, 291, { align:"right" });

      const fname = form.name ? `${form.name}_shindan.pdf` : "shindan_kekka.pdf";
      doc.save(fname);
    } catch(e) {
      console.error("PDF error:", e);
      alert("PDFの生成に失敗しました。ブラウザの印刷機能をお使いください。");
    }
    setPdfLoading(false);
  }

  function restart() {
    setPhase("intro"); setCurrent(0); setAnswers(Array(20).fill(null));
    setSelected(null); setHovered(null); setScores(null); setMyType(null);
    setAiText(null); setAiLoad(false); setLoadStep(0); setErrors({}); setSubmitting(false);
    setForm({ name:"", birth:"", phone:"", email:"", location:"", timing:"", jobs:[], memo:"" });
  }

  /* ── INTRO ── */
  if (phase==="intro") return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      <WaveHeader>
        <div style={{ padding:"52px 24px 20px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:24 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:C.foam, boxShadow:`0 0 8px ${C.foam}` }}/>
            <span style={{ color:"rgba(186,230,253,0.7)", fontSize:12, fontWeight:700, letterSpacing:"0.15em" }}>リウェーブ キャリア</span>
          </div>
          <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,0.15)", border:"1px solid rgba(249,115,22,0.4)", color:"#FED7AA", padding:"7px 18px", borderRadius:99, fontSize:12, fontWeight:700, marginBottom:22 }}>
            🔥 16タイプ本格パーソナリティ診断
          </div>
          <h1 className="fu1" style={{ color:"#fff", fontSize:"clamp(2rem,8vw,3.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:16 }}>
            あなたの<span style={{ color:C.foam }}>天職</span>、<br/>もう迷わない。
          </h1>
          <p className="fu2" style={{ color:"rgba(186,230,253,0.75)", fontSize:"clamp(13px,3vw,16px)", lineHeight:1.9, marginBottom:40 }}>
            5軸×20問の本格診断で<strong style={{color:C.foam}}>あなたのタイプ</strong>が判明🌊
          </p>
          <div className="fu3" style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:44 }}>
            {["⭐ 16タイプ分類","✨ 約5分で完了","🆓 完全無料","📊 5軸本格分析"].map((t,i)=>(
              <span key={i} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:99, padding:"7px 16px", fontSize:11, fontWeight:700, color:"rgba(186,230,253,0.85)" }}>{t}</span>
            ))}
          </div>
          <button onClick={()=>setPhase("form")} style={{
            background:`linear-gradient(135deg,${C.aqua},${C.navyLt})`, color:"#fff", border:"none", borderRadius:99,
            padding:"18px 52px", fontSize:16, fontWeight:900, cursor:"pointer",
            boxShadow:`0 8px 36px rgba(6,182,212,0.4)`, transition:"all 0.18s"
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px) scale(1.03)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
          >🚀 今すぐ診断スタート</button>
          <p style={{ color:"rgba(186,230,253,0.35)", fontSize:11, marginTop:12 }}>登録不要・無料・全20問</p>
        </div>
      </WaveHeader>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 20px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:32 }}>
          {[
            {icon:"🧬", t:"16タイプ分類", d:"あなたの個性を詳細に分析", c:C.ocean},
            {icon:"🤖", t:"AIキャリアアドバイス", d:"あなただけの提言を生成", c:C.violet},
            {icon:"💼", t:"適職＆転職度", d:"最適な職種と転職タイミング", c:C.mint},
            {icon:"📅", t:"無料キャリア相談",  d:"プロに今すぐ相談できる",   c:C.coral,  link:true},
          ].map((f,i)=>(
            <div key={i}
              onClick={f.link?()=>window.open(TIMEREX_URL,"_blank"):undefined}
              style={{ background:C.bgCard, borderRadius:16, boxShadow:"0 2px 16px rgba(27,43,94,0.07)", padding:"22px 18px", textAlign:"center", cursor:f.link?"pointer":"default", transition:"transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={f.link?e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(249,115,22,0.2)`;}:undefined}
              onMouseLeave={f.link?e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 16px rgba(27,43,94,0.07)";}:undefined}
            >
              <div style={{ width:52, height:52, borderRadius:14, background:`${f.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 12px" }}>{f.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:i===3?C.coral:C.navy, marginBottom:6 }}>{f.t}</div>
              <div style={{ fontSize:12, color:C.txt3, lineHeight:1.6 }}>{f.d}</div>
              {i===3 && <div style={{ marginTop:8, fontSize:11, fontWeight:700, color:C.coral }}>タップして予約 →</div>}
            </div>
          ))}
        </div>

        {/* Job preview */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:20, padding:"28px 20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(56,189,248,0.08)", pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <span style={{ display:"inline-block", background:"rgba(251,191,36,0.15)", border:"1px solid rgba(251,191,36,0.35)", color:"#FCD34D", borderRadius:99, padding:"4px 16px", fontSize:11, fontWeight:700, marginBottom:10 }}>🔥 あなたの適職がわかる！</span>
              <div style={{ fontSize:18, fontWeight:900, color:"#fff" }}>診断で<span style={{color:"#38BDF8"}}>天職</span>を見つけよう</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))", gap:10 }}>
              {[
                {icon:"📋",name:"事務職",     color:"#22D3EE",grad:"linear-gradient(135deg,#06B6D4,#0EA5E9)",tag:"安定"},
                {icon:"🏗️",name:"施工管理職",  color:"#FB923C",grad:"linear-gradient(135deg,#F97316,#EF4444)",tag:"高収入"},
                {icon:"💻",name:"エンジニア職",color:"#60A5FA",grad:"linear-gradient(135deg,#3B82F6,#6366F1)",tag:"成長"},
                {icon:"🤝",name:"営業職",     color:"#34D399",grad:"linear-gradient(135deg,#10B981,#059669)",tag:"稼げる"},
                {icon:"🛍️",name:"販売職",     color:"#A78BFA",grad:"linear-gradient(135deg,#8B5CF6,#7C3AED)",tag:"接客"},
                {icon:"🌸",name:"受付・事務",  color:"#F472B6",grad:"linear-gradient(135deg,#EC4899,#DB2777)",tag:"丁寧"},
                {icon:"🎨",name:"WEBデザイナー",color:"#FBBF24",grad:"linear-gradient(135deg,#F59E0B,#D97706)",tag:"クリエイティブ"},
                {icon:"🍳",name:"飲食・調理職", color:"#FB7185",grad:"linear-gradient(135deg,#F43F5E,#E11D48)",tag:"未経験OK"},
                {icon:"🏥",name:"医療・介護職", color:"#4ADE80",grad:"linear-gradient(135deg,#22C55E,#16A34A)",tag:"需要高い"},
              ].map((j,i)=>(
                <div key={i} style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, padding:"12px 8px", textAlign:"center",
                  animation:`${i%2===0?"slideInLeft":"slideInRight"} 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both`,
                  transition:"transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.04)";e.currentTarget.style.boxShadow=`0 12px 32px ${j.color}44`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
                >
                  <div style={{ fontSize:26, marginBottom:6, animation:`glowPulse ${2+i*0.3}s ease-in-out ${i*0.2}s infinite` }}>{j.icon}</div>
                  <div style={{ fontSize:11, fontWeight:800, color:"#fff", marginBottom:5 }}>{j.name}</div>
                  <div style={{ display:"inline-block", background:j.grad, borderRadius:99, padding:"2px 8px", fontSize:9, fontWeight:700, color:"#fff" }}>#{j.tag}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:16 }}>
              <div style={{ fontSize:12, color:"rgba(186,230,253,0.5)" }}>✨ 5軸診断で<strong style={{color:"rgba(186,230,253,0.8)"}}>あなただけ</strong>の結果が出ます</div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ── FORM ── */
  if (phase==="form") return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      <WaveHeader compact>
        <div style={{ padding:"40px 24px 16px", textAlign:"center" }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"rgba(186,230,253,0.5)", marginBottom:10 }}>ステップ 1/3 — あなたの情報</div>
          <h2 style={{ color:"#fff", fontSize:"clamp(1.4rem,5vw,2rem)", fontWeight:900, marginBottom:8 }}>まず、あなたを教えてください</h2>
          <p style={{ color:"rgba(186,230,253,0.6)", fontSize:13 }}>診断後にキャリア相談の予約に使用します</p>
        </div>
      </WaveHeader>
      <div style={{ maxWidth:560, margin:"0 auto", padding:"32px 20px 60px" }}>
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 4px 24px rgba(27,43,94,0.09)", padding:"28px 24px" }}>
          <Field label="お名前" required><FInput value={form.name} onChange={e=>setF("name",e.target.value)} placeholder="山田 太郎"/>{errors.name&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.name}</p>}</Field>
          <Field label="生年月日" required><FInput type="date" value={form.birth} onChange={e=>setF("birth",e.target.value)}/>{errors.birth&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.birth}</p>}</Field>
          <Field label="電話番号" required><FInput type="tel" value={form.phone} onChange={e=>setF("phone",e.target.value)} placeholder="09012345678"/>{errors.phone&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.phone}</p>}</Field>
          <Field label="メールアドレス" required><FInput type="email" value={form.email} onChange={e=>setF("email",e.target.value)} placeholder="example@mail.com"/>{errors.email&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.email}</p>}</Field>
          <Field label="希望勤務地" required>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {PREF_OPTIONS.map(p=>(
                <button key={p} onClick={()=>setF("location",p)} style={{ padding:"8px 14px", borderRadius:99, fontSize:12, fontWeight:700, background:form.location===p?C.ocean:C.bgMist, color:form.location===p?"#fff":C.txt2, border:`1.5px solid ${form.location===p?C.ocean:C.border}`, cursor:"pointer", transition:"all 0.15s" }}>{p}</button>
              ))}
            </div>
            {errors.location&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.location}</p>}
          </Field>
          <Field label="いつから就業したい？" required>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {TIMING_OPTIONS.map(t=>(
                <button key={t} onClick={()=>setF("timing",t)} style={{ padding:"9px 16px", borderRadius:99, fontSize:12, fontWeight:700, background:form.timing===t?C.navyMid:C.bgMist, color:form.timing===t?"#fff":C.txt2, border:`1.5px solid ${form.timing===t?C.navyMid:C.border}`, cursor:"pointer", transition:"all 0.15s" }}>{t}</button>
              ))}
            </div>
            {errors.timing&&<p style={{color:C.rose,fontSize:11,marginTop:5}}>⚠ {errors.timing}</p>}
          </Field>
          <Field label="気になる職種（複数選択OK）">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {JOB_OPTIONS.map(j=>(
                <button key={j} onClick={()=>toggleJob(j)} style={{ padding:"8px 14px", borderRadius:99, fontSize:12, fontWeight:700, background:form.jobs.includes(j)?C.mint:C.bgMist, color:form.jobs.includes(j)?"#fff":C.txt2, border:`1.5px solid ${form.jobs.includes(j)?C.mint:C.border}`, cursor:"pointer", transition:"all 0.15s" }}>{form.jobs.includes(j)?"✓ ":""}{j}</button>
              ))}
            </div>
          </Field>
          <button onClick={async()=>{ if(submitting)return; if(validateForm()){ setSubmitting(true); await sendToSheet(form); setSubmitting(false); setPhase("quiz"); } }} style={{
            width:"100%", background:`linear-gradient(135deg,${C.navy},${C.navyLt})`, color:"#fff", border:"none", borderRadius:12, padding:"16px", fontSize:15, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 24px rgba(27,58,107,0.3)`, transition:"all 0.18s", marginTop:4,
            opacity:submitting?0.7:1
          }}>
            {submitting?"送信中...":"✨ 診断に進む →"}
          </button>
          <p style={{ textAlign:"center", fontSize:11, color:C.txt4, marginTop:12 }}>入力情報は適職診断・キャリア相談のみに使用します</p>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ── LOADING ── */
  if (phase==="loading") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(180deg,${C.navy},${C.navyMid})`, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ fontSize:60, marginBottom:16, animation:"spin 3s linear infinite", display:"inline-block" }}>🌊</div>
        <h2 style={{ color:"#fff", fontSize:22, fontWeight:900, marginBottom:8 }}>あなたのタイプを分析中...</h2>
        <p style={{ color:"rgba(186,230,253,0.5)", fontSize:13 }}>20問の回答を解析しています</p>
      </div>
      <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:28, width:"min(90vw,380px)" }}>
        {AXES.map((a,i)=>(
          <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<4?"1px solid rgba(255,255,255,0.06)":"none", opacity:loadStep>i?1:0.2, transition:"opacity 0.4s" }}>
            <div style={{ width:34, height:34, borderRadius:9, background:loadStep>i?`${a.color}22`:"transparent", border:`1px solid ${loadStep>i?a.color+"55":"rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, transition:"all 0.3s" }}>
              {loadStep>i?"✅":a.icon}
            </div>
            <span style={{ fontSize:13, color:loadStep>i?"rgba(186,230,253,0.9)":"rgba(186,230,253,0.2)", fontWeight:500 }}>
              {["協調性を分析中...","バイタリティを解析中...","分析力を計算中...","行動力を特定中...","パーソナリティタイプを判定中..."][i]}
            </span>
          </div>
        ))}
        <div style={{ marginTop:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"rgba(186,230,253,0.4)", fontWeight:700 }}>分析中</span>
            <span style={{ fontSize:13, fontWeight:900, color:C.foam }}>{Math.round((loadStep/5)*100)}%</span>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:99 }}>
            <div style={{ height:"100%", borderRadius:99, width:`${(loadStep/5)*100}%`, background:`linear-gradient(90deg,${C.aqua},${C.foam})`, transition:"width 0.5s cubic-bezier(0.16,1,0.3,1)" }}/>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ── QUIZ ── */
  if (phase==="quiz") return (
    <div style={{ minHeight:"100vh", fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, zIndex:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#061428 0%,#0B2545 40%,#134E8A 75%,#1A6FC4 100%)" }}/>
        {[...Array(14)].map((_,i)=>(
          <div key={i} style={{ position:"absolute", width:`${3+(i%4)*2}px`, height:`${3+(i%4)*2}px`, borderRadius:"50%", background:`rgba(56,189,248,${0.12+(i%3)*0.08})`, left:`${6+(i*19)%86}%`, top:`${5+(i*29)%78}%`, animation:`quizFloat ${3+i%4}s ease-in-out ${i*0.45}s infinite alternate` }}/>
        ))}
        {[...Array(5)].map((_,i)=>(
          <div key={"r"+i} style={{ position:"absolute", width:`${50+i*35}px`, height:`${50+i*35}px`, borderRadius:"50%", border:`1px solid rgba(56,189,248,${0.05+(i%3)*0.03})`, left:`${8+(i*23)%68}%`, bottom:`${6+(i*17)%38}%`, animation:`ringPulse ${4+i}s ease-in-out ${i*0.7}s infinite` }}/>
        ))}
        <svg style={{ position:"absolute", bottom:0, left:0, width:"200%", animation:"waveSweep1 9s linear infinite", willChange:"transform" }} viewBox="0 0 1440 140" preserveAspectRatio="none" height="110">
          <path d="M0,70 C180,25 360,115 540,70 C720,25 900,115 1080,70 C1260,25 1380,100 1440,70 L1440,140 L0,140Z" fill="rgba(56,189,248,0.11)"/>
        </svg>
        <svg style={{ position:"absolute", bottom:0, left:0, width:"200%", animation:"waveSweep2 13s linear infinite", willChange:"transform" }} viewBox="0 0 1440 140" preserveAspectRatio="none" height="90">
          <path d="M0,90 C240,45 480,130 720,90 C960,45 1200,130 1440,90 L1440,140 L0,140Z" fill="rgba(14,165,233,0.09)"/>
        </svg>
      </div>

      <div style={{ position:"relative", zIndex:2, padding:"14px 20px", background:"rgba(6,20,40,0.65)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(56,189,248,0.18)" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:`${ax?.color}22`, border:`1px solid ${ax?.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{ax?.icon}</div>
              <span style={{ fontSize:13, fontWeight:700, color:ax?.color }}>{ax?.label}</span>
              <span style={{ fontSize:11, color:"rgba(125,211,252,0.45)" }}>Q{(current%4)+1}/4</span>
            </div>
            <span style={{ fontSize:13, fontWeight:900, color:"rgba(186,230,253,0.9)" }}>{prog}%</span>
          </div>
          <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:99 }}>
            <div style={{ height:"100%", borderRadius:99, width:`${prog}%`, background:`linear-gradient(90deg,${C.navyLt},${C.ocean},${C.foam})`, transition:"width 0.45s cubic-bezier(0.16,1,0.3,1)", boxShadow:`0 0 10px ${C.aqua}66` }}/>
          </div>
          <div style={{ display:"flex", gap:3, marginTop:5 }}>
            {AXES.map((a,i)=>(
              <div key={a.id} style={{ flex:1, height:3, borderRadius:99, background:Math.floor(current/4)>=i?a.color:"rgba(255,255,255,0.1)", transition:"background 0.3s" }}/>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex:1, position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 20px 44px", maxWidth:560, margin:"0 auto", width:"100%" }}>
        <div style={{ width:"100%", opacity:animIn?1:0, transform:animIn?"none":"translateY(14px)", transition:"opacity 0.24s, transform 0.24s" }}>
          <div style={{ textAlign:"center", marginBottom:22 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(6,20,40,0.65)", backdropFilter:"blur(10px)", border:`1.5px solid ${ax?.color}44`, borderRadius:14, padding:"10px 24px" }}>
              <span style={{ fontSize:16 }}>{ax?.icon}</span>
              <span style={{ fontSize:13, fontWeight:700, color:ax?.color }}>Q{current+1} — {ax?.label}</span>
            </div>
          </div>
          <h2 style={{ fontSize:"clamp(1.1rem,4vw,1.5rem)", fontWeight:900, color:"#fff", textAlign:"center", lineHeight:1.65, marginBottom:24, textShadow:"0 2px 16px rgba(0,0,0,0.6)" }}>
            {q?.q}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
            {q?.opts.map((opt,i)=>{
              const isSel=selected===i, isHov=hovered===i&&selected===null;
              return (
                <button key={i} onClick={()=>choose(i)} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)} style={{
                  background:isSel?"rgba(6,20,40,0.88)":isHov?"rgba(6,20,40,0.75)":"rgba(6,20,40,0.55)",
                  backdropFilter:"blur(18px)", border:`2px solid ${isSel?ax?.color:isHov?ax?.color+"66":"rgba(56,189,248,0.22)"}`,
                  borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:14,
                  cursor:selected!==null?"default":"pointer", transition:"all 0.17s",
                  transform:isSel?"scale(1.015)":"scale(1)",
                  boxShadow:isSel?`0 0 0 1px ${ax?.color}33, 0 8px 28px rgba(0,0,0,0.35)`:isHov?"0 4px 18px rgba(0,0,0,0.25)":"none",
                  fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif",
                }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", flexShrink:0, background:isSel?ax?.color:isHov?`${ax?.color}77`:"rgba(56,189,248,0.3)", transition:"all 0.17s", boxShadow:isSel?`0 0 10px ${ax?.color}`:isHov?`0 0 6px ${ax?.color}66`:"none" }}/>
                  <span style={{ fontSize:14, fontWeight:600, color:isSel?ax?.color:"rgba(186,230,253,0.88)", lineHeight:1.6, textAlign:"left" }}>{opt.t}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ── RESULT ── */
  const tp = TYPES[myType] || TYPES["iP"];
  const axisScores = [
    { label:"協調性", key:"I", color:"#F59E0B" },
    { label:"バイタリティ", key:"P", color:"#EC4899" },
    { label:"分析力", key:"A", color:"#0EA5E9" },
    { label:"行動力", key:"D", color:"#10B981" },
    { label:"安定志向", key:"X", color:"#8B5CF6" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      {/* Hero */}
      <WaveHeader>
        <div style={{ padding:"48px 24px 20px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:12 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.foam }}/>
            <span style={{ color:"rgba(186,230,253,0.5)", fontSize:11, fontWeight:700, letterSpacing:"0.15em" }}>リウェーブ キャリアコンパス</span>
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(34,211,238,0.15)", border:"1px solid rgba(34,211,238,0.3)", color:"#BAE6FD", padding:"7px 20px", borderRadius:99, fontSize:12, fontWeight:700, marginBottom:16 }}>
            🎉 {form.name||"あなた"}さんの診断完了！
          </div>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.4rem,5vw,2.5rem)", fontWeight:900, lineHeight:1.2, marginBottom:6 }}>
            あなたは<span style={{ color:C.foam }}>「{tp.name}」</span>タイプ
          </h1>
          <p style={{ color:"rgba(186,230,253,0.7)", fontSize:14, marginBottom:4 }}>{tp.system} — {tp.sub}</p>
          <p style={{ color:"rgba(186,230,253,0.55)", fontSize:12 }}>📸 スクショしてシェアしよう！</p>
        </div>
      </WaveHeader>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"0 16px 80px" }}>

        {/* タイプカード */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"28px 24px", marginBottom:14, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:`linear-gradient(90deg,${tp.color},${tp.color}88)` }}/>
          <div style={{ display:"flex", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ background:tp.bg, border:`1.5px solid ${tp.color}44`, borderRadius:10, padding:"6px 14px" }}>
                  <span style={{ fontSize:12, fontWeight:700, color:tp.color }}>{tp.system}</span>
                </div>
              </div>
              <h2 style={{ fontSize:"clamp(1.6rem,5vw,2.2rem)", fontWeight:900, color:C.navy, marginBottom:4 }}>
                {tp.name} <span style={{ fontSize:14, fontWeight:500, color:C.txt3 }}>（{tp.sub}）</span>
              </h2>
              <p style={{ fontSize:14, color:tp.color, fontWeight:700, marginBottom:12 }}>
                {tp.catch}
              </p>
              {/* キーワードタグ */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                {tp.keys.map((k,i)=>(
                  <span key={i} style={{ background:tp.bg, border:`1px solid ${tp.color}44`, borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700, color:tp.color }}>
                    {k}
                  </span>
                ))}
              </div>
              {/* タイプ詳細説明 */}
              {tp.desc && (
                <div style={{ background:tp.bg, border:`1.5px solid ${tp.color}22`, borderRadius:12, padding:"16px 18px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:tp.color, marginBottom:8, letterSpacing:"0.05em" }}>📝 タイプ詳細</div>
                  <p style={{ fontSize:13, color:C.txt2, lineHeight:2, letterSpacing:"0.02em" }}>{tp.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5軸スコア */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"26px 24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:C.ocean }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>📊 5軸パーソナリティスコア</span>
          </div>
          {axisScores.map((axis,i)=>(
            <div key={axis.key} style={{ marginBottom:i<4?18:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.txt2 }}>{axis.label}</span>
                <span style={{ fontSize:16, fontWeight:900, color:axis.color }}>{scores[axis.key]}%</span>
              </div>
              <Bar score={scores[axis.key]} color={axis.color} delay={i*110}/>
            </div>
          ))}
        </div>

        {/* 良いところ・注意点 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <div style={{ background:C.bgCard, borderRadius:18, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
              <span style={{ fontSize:18 }}>😊</span>
              <span style={{ fontSize:12, fontWeight:700, color:C.txt3, letterSpacing:"0.05em" }}>あなたの良いところ</span>
            </div>
            {tp.good.map((g,i)=>(
              <div key={i} style={{ display:"flex", gap:8, marginBottom:10, alignItems:"flex-start" }}>
                <span style={{ color:tp.color, fontSize:12, flexShrink:0, marginTop:2 }}>●</span>
                <span style={{ fontSize:12, color:C.txt2, lineHeight:1.7 }}>{g}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.bgCard, borderRadius:18, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
              <span style={{ fontSize:18 }}>⚠️</span>
              <span style={{ fontSize:12, fontWeight:700, color:C.txt3, letterSpacing:"0.05em" }}>注意した方が良いところ</span>
            </div>
            {tp.care.map((c,i)=>(
              <div key={i} style={{ display:"flex", gap:8, marginBottom:10, alignItems:"flex-start" }}>
                <span style={{ color:C.coral, fontSize:12, flexShrink:0, marginTop:2 }}>×</span>
                <span style={{ fontSize:12, color:C.txt2, lineHeight:1.7 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 最適環境 */}
        <div style={{ background:`linear-gradient(135deg,${C.bgMist},#ECFDF5)`, border:`1.5px solid ${C.borderMd}`, borderRadius:18, padding:"20px 22px", marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.txt4, marginBottom:8, letterSpacing:"0.08em" }}>🌿 あなたに合う職場環境</div>
          <p style={{ fontSize:15, color:C.navy, fontWeight:700, lineHeight:1.8 }}>{tp.env}</p>
        </div>

        {/* 適職 */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:C.amber }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>💼 未経験からチャレンジできる適職</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12 }}>
            {tp.jobs.map((jobName,i)=>{
              const jobIcons = { "事務職":"📋","受付・事務":"🌸","施工管理職":"🏗️","エンジニア職":"💻","営業職":"🤝","販売職":"🛍️","WEBデザイナー":"🎨","飲食・調理職":"🍳","医療・介護職":"🏥","マーケティング":"📣","コンサルタント":"⚡","クリエイター":"📱" };
              const jobColors = { "事務職":C.aqua,"受付・事務":"#F472B6","施工管理職":C.coral,"エンジニア職":C.ocean,"営業職":C.mint,"販売職":C.violet,"WEBデザイナー":C.amber,"飲食・調理職":"#FB7185","医療・介護職":"#4ADE80","マーケティング":"#EC4899","コンサルタント":"#6366F1","クリエイター":"#D946EF" };
              const jColor = jobColors[jobName]||C.ocean;
              const jIcon = jobIcons[jobName]||"💼";
              return (
                <div key={i} style={{ background:`${jColor}08`, border:`1.5px solid ${jColor}30`, borderRadius:14, padding:"18px 14px", textAlign:"center" }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>{jIcon}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:C.navy, marginBottom:4 }}>{jobName}</div>
                  {i===0 && <div style={{ background:`${jColor}20`, borderRadius:99, padding:"3px 10px", display:"inline-block" }}>
                    <span style={{ fontSize:10, fontWeight:700, color:jColor }}>最もおすすめ</span>
                  </div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 転職度 */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:tp.color }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>🔄 あなたの転職度</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
            <CircleChart value={tp.change} color={tp.color}/>
            <div style={{ flex:1, minWidth:160 }}>
              <p style={{ fontSize:15, fontWeight:900, color:C.navy, marginBottom:8, lineHeight:1.5 }}>
                {tp.change>=50
                  ? "今の職場とはそこまで相性が良くないようです。転職を検討しても良い時期かもしれません。"
                  : "今の職場でさらに力を伸ばせる可能性があります。スキルアップを意識して取り組んでみましょう。"}
              </p>
              <p style={{ fontSize:12, color:C.txt3, lineHeight:1.8 }}>
                {tp.change>=50
                  ? "新しい職場での機会も積極的に探ることで、より満足度の高いキャリアを築けるでしょう。"
                  : "焦らず着実にキャリアを積み上げ、適切なタイミングで次のステップへ進みましょう。"}
              </p>
            </div>
          </div>
        </div>

        {/* AI アドバイス */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:20, padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"rgba(167,139,250,0.2)", border:"1px solid rgba(167,139,250,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>🤖</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:"rgba(196,181,253,0.95)" }}>AI キャリアナビゲーター</div>
              <div style={{ fontSize:10, color:"rgba(167,139,250,0.45)" }}>Claude AI 搭載</div>
            </div>
          </div>
          {aiLoad
            ? <div style={{ color:"rgba(186,230,253,0.35)", fontSize:13, animation:"pulse 1.2s infinite" }}>✨ アドバイスを生成中...</div>
            : <p style={{ fontSize:14, color:"rgba(186,230,253,0.9)", lineHeight:2.1 }}>{aiText}</p>
          }
        </div>

        {/* CTA */}
        <div style={{ position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${C.navy} 0%,${C.navyMid} 50%,${C.navyLt} 100%)`, borderRadius:22, padding:"36px 28px", textAlign:"center", boxShadow:`0 16px 48px rgba(27,58,107,0.35)` }}>
          <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"rgba(186,230,253,0.4)", marginBottom:12 }}>次のステップ</div>
            <h3 style={{ fontSize:"clamp(1.1rem,4vw,1.6rem)", fontWeight:900, color:"#fff", marginBottom:10, lineHeight:1.4 }}>
              {form.name?`${form.name}さん、`:""}プロと一緒に<br/>天職を見つけよう
            </h3>
            <p style={{ fontSize:13, color:"rgba(186,230,253,0.6)", lineHeight:1.9, marginBottom:28 }}>
              ReWaveのキャリアアドバイザーが<br/>あなたの診断結果をもとに<br/>ぴったりの求人を無料で提案します。
            </p>
            <a href={TIMEREX_URL} target="_blank" rel="noopener noreferrer" style={{
              display:"block", maxWidth:320, margin:"0 auto 14px",
              background:`linear-gradient(135deg,${C.aqua},${C.ocean})`,
              color:"#fff", textDecoration:"none", borderRadius:99,
              padding:"18px 0", fontSize:15, fontWeight:900,
              boxShadow:`0 8px 32px rgba(6,182,212,0.4)`, transition:"all 0.18s"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 14px 40px rgba(6,182,212,0.5)`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 8px 32px rgba(6,182,212,0.4)`;}}
            >
              📅 無料キャリア相談を今すぐ予約する
            </a>
            <div style={{ display:"flex", justifyContent:"center", gap:20, fontSize:11, color:"rgba(186,230,253,0.35)", marginBottom:20, fontWeight:700 }}>
              <span>✓ 完全無料</span><span>✓ オンライン対応</span><span>✓ 20代専門</span>
            </div>
            {form.name && (
              <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"14px 16px", fontSize:12, color:"rgba(186,230,253,0.5)", lineHeight:1.8 }}>
                📋 <strong style={{color:"rgba(186,230,253,0.7)"}}>{form.name}</strong>さんの情報は予約時に自動反映されます<br/>
                希望地：{form.location} ／ 就業時期：{form.timing}
                {form.jobs.length>0 && <><br/>気になる職種：{form.jobs.join("・")}</>}
              </div>
            )}
          </div>
        </div>

        {/* 16タイプ一覧 */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:C.navy }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>🧬 16タイプ分類一覧</span>
          </div>
          <p style={{ fontSize:11, color:C.txt4, marginBottom:20, paddingLeft:12 }}>あなたのタイプは<strong style={{color:C.navy}}>{TYPES[myType]?.name}</strong>です</p>

          {[
            { system:"🤝 協調タイプ", color:"#F59E0B", bg:"#FEF3C7",
              types:[
                { key:"iI", name:"心の橋渡し役", sub:"共感者",  catch:"周りの気持ちを誰より理解できる" },
                { key:"iP", name:"縁の下の太陽", sub:"貢献者",  catch:"一緒にいて絶妙な安心感を与える" },
                { key:"iA", name:"頼れる守護者", sub:"支援者",  catch:"縁の下の力持ちとして組織を支える" },
                { key:"iD", name:"深海の哲人",   sub:"思索者",  catch:"じっくり深く考えて最善を導き出す" },
              ]},
            { system:"⚡ 行動タイプ", color:"#EC4899", bg:"#FDF2F8",
              types:[
                { key:"pI", name:"チームの火種",     sub:"協創者",  catch:"チームをまとめてみんなで前進する" },
                { key:"pP", name:"場を彩る太陽",     sub:"活力者",  catch:"いるだけで場を明るくするムードメーカー" },
                { key:"pA", name:"こだわりの芸人",   sub:"職人気質",catch:"大胆な性格と精密さを兼ね備えた職人" },
                { key:"pD", name:"道なき道を行く人", sub:"開拓者",  catch:"思いついたことをすぐ行動に移す" },
              ]},
            { system:"🧠 思考タイプ", color:"#0EA5E9", bg:"#EFF9FF",
              types:[
                { key:"aI", name:"積み上げの達人", sub:"勤勉者", catch:"コツコツと正確に積み上げることが得意" },
                { key:"aP", name:"頼れる仕事人",   sub:"実務者", catch:"正確でスピーディーな頼れる存在" },
                { key:"aA", name:"知の航海士",     sub:"探求者", catch:"高い調査能力で深い専門知識を持つ" },
                { key:"aD", name:"データの魔術師", sub:"分析者", catch:"高い分析力でデータから答えを出す" },
              ]},
            { system:"🚀 挑戦タイプ", color:"#10B981", bg:"#ECFDF5",
              types:[
                { key:"dI", name:"波を起こす人",   sub:"推進者", catch:"人を引きつけてプロジェクトを推進する" },
                { key:"dP", name:"旗手",           sub:"指揮者", catch:"強いリーダーシップで組織を牽引する" },
                { key:"dA", name:"広角の先導者",   sub:"調和者", catch:"広い視野と高い分析力で物事を解明する" },
                { key:"dD", name:"常識を壊す人",   sub:"革新者", catch:"自分の道を突き進む革新者" },
              ]},
          ].map((group, gi) => (
            <div key={gi} style={{ marginBottom: gi<3 ? 24 : 0 }}>
              {/* 系統ヘッダー */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, paddingBottom:10, borderBottom:`2px solid ${group.color}33` }}>
                <div style={{ width:5, height:22, borderRadius:3, background:group.color }}/>
                <span style={{ fontSize:14, fontWeight:900, color:group.color }}>{group.system}</span>
              </div>
              {/* タイプカードグリッド */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {group.types.map((t) => {
                  const isMe = myType === t.key;
                  return (
                    <div key={t.key} style={{
                      padding:"14px 12px",
                      background: isMe ? group.bg : C.bgMist,
                      border: `2px solid ${isMe ? group.color : C.border}`,
                      borderRadius:14,
                      position:"relative",
                      boxShadow: isMe ? `0 4px 16px ${group.color}22` : "none",
                      transition:"all 0.2s",
                    }}>
                      {/* あなたバッジ */}
                      {isMe && (
                        <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:group.color, color:"#fff", fontSize:9, fontWeight:900, padding:"3px 12px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 2px 8px ${group.color}44` }}>
                          ✓ あなたのタイプ
                        </div>
                      )}
                      {/* タイプ名 */}
                      <div style={{ fontSize:13, fontWeight:900, color: isMe ? group.color : C.navy, marginBottom:3, lineHeight:1.4 }}>
                        {t.name}
                      </div>
                      {/* サブ名 */}
                      <div style={{ fontSize:10, fontWeight:700, color: isMe ? group.color : C.txt4, marginBottom:6, background: isMe ? `${group.color}15` : C.border+"44", display:"inline-block", padding:"1px 8px", borderRadius:99 }}>
                        {t.sub}
                      </div>
                      {/* キャッチ */}
                      <p style={{ fontSize:11, color: isMe ? C.txt2 : C.txt3, lineHeight:1.6 }}>{t.catch}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* PDFダウンロード＋もう一度ボタン */}
        <div style={{ textAlign:"center", marginTop:24, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
          <button onClick={downloadPDF} disabled={pdfLoading} style={{
            background:`linear-gradient(135deg,${C.coral},#EF4444)`,
            color:"#fff", border:"none", borderRadius:99,
            padding:"14px 36px", fontSize:14, fontWeight:900,
            cursor:pdfLoading?"not-allowed":"pointer",
            boxShadow:"0 6px 20px rgba(249,115,22,0.35)",
            transition:"all 0.18s", opacity:pdfLoading?0.7:1,
            display:"flex", alignItems:"center", gap:8,
          }}
            onMouseEnter={e=>{if(!pdfLoading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(249,115,22,0.45)";}}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 6px 20px rgba(249,115,22,0.35)";}}
          >
            {pdfLoading ? "⏳ 生成中..." : "📄 結果をPDFで保存する"}
          </button>
          <button onClick={restart} style={{ background:"transparent", border:`1px solid ${C.borderMd}`, color:C.txt3, borderRadius:99, padding:"10px 26px", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.navyMid;e.currentTarget.style.color=C.navy;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.borderMd;e.currentTarget.style.color=C.txt3;}}
          >← もう一度診断する</button>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}
