import { useState, useEffect } from "react";

/* ════════════════════════════════════════
   DESIGN TOKENS — Ocean Light × ReWave
════════════════════════════════════════ */
const C = {
  // Primary — ReWave Navy
  navy:    "#1B3A6B",
  navyMid: "#2952A3",
  navyLt:  "#3B6FD4",
  // Ocean accent
  ocean:   "#0EA5E9",
  aqua:    "#06B6D4",
  foam:    "#38BDF8",
  mist:    "#E0F2FE",
  // Warm
  coral:   "#F97316",
  mint:    "#10B981",
  violet:  "#8B5CF6",
  amber:   "#F59E0B",
  rose:    "#F43F5E",
  // Background
  bg:      "#F0F7FF",
  bgCard:  "#FFFFFF",
  bgMist:  "#EFF6FF",
  // Text
  txt1:    "#0F172A",
  txt2:    "#334155",
  txt3:    "#64748B",
  txt4:    "#94A3B8",
  // Border
  border:  "#DBEAFE",
  borderMd:"#BFDBFE",
};

const TIMEREX_URL = "https://timerex.net/s/jobagency_4d9c/0fb7dbf2";

/* ════════════════════════════════════════
   JOB DATA
════════════════════════════════════════ */
const ALL_JOBS = [
  { id:"jimu",     priority:true,  name:"事務職",     sub:"オフィス事務",        icon:"📋", color:C.aqua,   tag:["安定","チームワーク","サポート"],  profile:[2,2,2,2,4], desc:"データ管理・書類作成・スケジュール調整など組織を支える仕事。正確さとサポート力が活きる。", detail:"未経験からでも挑戦しやすく、スキルを積み上げてキャリアアップが狙える職種です。" },
  { id:"sekou",    priority:true,  name:"施工管理職",  sub:"建設・施工管理", icon:"🏗️", color:C.coral,  tag:["リーダー","やりがい","高収入"],    profile:[3,5,3,4,5], desc:"現場を束ねてプロジェクトを完成まで導く司令塔。責任感とコミュ力が武器になる。", detail:"工程・安全・品質・原価を管理。建物が完成する達成感は格別で、年収UP も狙いやすい職種。" },
  { id:"engineer", priority:true,  name:"エンジニア職", sub:"ITエンジニア",          icon:"💻", color:C.ocean,  tag:["スキル","成長","未来型"],         profile:[5,3,3,5,4], desc:"技術の力で課題を解決するITスペシャリスト。論理思考力が最大限活きる職種。", detail:"Web・アプリ・インフラなど領域も幅広い。未経験からキャリアチェンジする人も多数。" },
  { id:"eigyo",    priority:true,  name:"営業職",      sub:"営業・販売",                icon:"🤝", color:C.mint,   tag:["コミュ力","達成感","稼げる"],     profile:[4,5,4,5,4], desc:"人を動かし数字で語る最強のフロントランナー。成果がダイレクトに収入に反映される。", detail:"顧客との信頼構築から提案・クロージングまで全担当。20代で高収入を目指せる職種。" },
  { id:"hanbai",   priority:true,  name:"販売職",      sub:"販売・接客",         icon:"🛍️", color:C.violet, tag:["接客","笑顔","チーム"],          profile:[3,3,3,3,3], desc:"お客様の笑顔が報酬。接客のスペシャリストとして活躍できる。", detail:"店舗での接客・商品提案・在庫管理など幅広く担当。チームで目標達成できる職種。" },
  { id:"marketer", priority:false, name:"マーケター",  sub:"マーケティング",            icon:"📣", color:"#EC4899", tag:["クリエイティブ","SNS","戦略"],    profile:[4,4,4,4,3], desc:"ブランドを動かす戦略家。クリエイティブとデータ分析の両方を使いこなす。", detail:"SNS・広告・分析など幅広いスキルが身につく。クリエイティブ×数字が好きな人向け。" },
  { id:"designer", priority:false, name:"Webデザイナー",sub:"Webデザイン",         icon:"🎨", color:C.amber,  tag:["センス","制作","表現"],           profile:[2,3,5,5,3], desc:"ビジュアルで世界を変えるUIデザインのプロ。美意識と技術を融合させたい人向け。", detail:"Webサイト・アプリのUI設計から制作まで担当。ポートフォリオで実力を示せる。" },
  { id:"consul",   priority:false, name:"コンサル",    sub:"コンサルタント",           icon:"⚡", color:"#6366F1", tag:["戦略","論理","高収入"],           profile:[5,4,4,5,5], desc:"クライアントの経営課題を分析・解決するプロフェッショナル。", detail:"高い論理力と提案力が求められる。経験を積むほど市場価値が上がる職種。" },
  { id:"creator",  priority:false, name:"クリエイター", sub:"コンテンツ制作",     icon:"📱", color:"#D946EF", tag:["表現","自由","SNS"],             profile:[1,3,4,5,3], desc:"動画・写真・文章で世界を届けるコンテンツの作り手。自己表現が仕事になる。", detail:"TikTok・YouTube・InstagramなどSNSで活躍する道も。副業からのスタートも多い。" },
];

const AXES = [
  { id:"personality", label:"性格タイプ",     color:C.ocean,  lt:"#EFF9FF", icon:"🧠" },
  { id:"behavior",    label:"行動スタイル",    color:C.coral,  lt:"#FFF4EE", icon:"⚡" },
  { id:"values",      label:"価値観",         color:C.mint,   lt:"#EDFCF5", icon:"💎" },
  { id:"motivation",  label:"モチベーション",  color:C.violet, lt:"#F3EEFF", icon:"🔥" },
  { id:"mental",      label:"メンタル強度",    color:C.amber,  lt:"#FFFBEB", icon:"🛡️" },
];

// 5軸 × 4問 = 全20問（選択肢は4択）
const QS = [
  // personality 4問
  {axis:"personality",q:"週末、どうやって過ごしたい？",opts:[{t:"友達と思いっきり盛り上がる",v:5},{t:"少人数でじっくり話す",v:4},{t:"ひとりで好きなことをする",v:2},{t:"特に決まってない、流れで",v:1}]},
  {axis:"personality",q:"仕事の進め方、どれが一番近い？",opts:[{t:"最初にしっかり計画を立てる",v:5},{t:"方向性だけ決めて柔軟に動く",v:4},{t:"まず全体を把握してから動く",v:2},{t:"その場その場で判断する",v:1}]},
  {axis:"personality",q:"意見が対立したとき、どうする？",opts:[{t:"データと事実で説得する",v:5},{t:"相手の気持ちを理解して歩み寄る",v:4},{t:"第三者の意見を聞く",v:2},{t:"できるだけ波風を立てない",v:1}]},
  {axis:"personality",q:"テンションが上がる瞬間は？",opts:[{t:"大勢の人と盛り上がるとき",v:5},{t:"目標を達成したとき",v:4},{t:"ひとりで集中できたとき",v:2},{t:"のんびりゆっくりできたとき",v:1}]},
  // behavior 4問
  {axis:"behavior",q:"大事な決断、どうやってする？",opts:[{t:"データと実績で判断する",v:5},{t:"直感と経験を組み合わせる",v:4},{t:"みんなで話し合って決める",v:2},{t:"なかなか決められない",v:1}]},
  {axis:"behavior",q:"新しいチャンス、どう動く？",opts:[{t:"可能性を信じてすぐ飛び込む！",v:5},{t:"リスク計算してから慎重に判断",v:4},{t:"専門家の意見を聞いてから動く",v:2},{t:"様子を見てから考える",v:1}]},
  {axis:"behavior",q:"チームでの自分の役割は？",opts:[{t:"リーダーとして引っ張る",v:5},{t:"専門スキルで貢献する",v:4},{t:"調整役・サポート役",v:2},{t:"特に決まっていない",v:1}]},
  {axis:"behavior",q:"締め切りが迫ってきたら？",opts:[{t:"早めに動いて余裕で終わらせる",v:5},{t:"適度なプレッシャーで集中できる",v:4},{t:"ギリギリになって本気を出す",v:2},{t:"焦ってパニックになりがち",v:1}]},
  // values 4問
  {axis:"values",q:"仕事で一番大切なこと？",opts:[{t:"社会への貢献・意義のある仕事",v:5},{t:"スキルアップと専門性の追求",v:4},{t:"安定した収入と生活の保障",v:2},{t:"人間関係がよい職場",v:1}]},
  {axis:"values",q:"あなたにとっての「成功」って？",opts:[{t:"社会的地位と周囲からの評価",v:5},{t:"自己実現と内なる充実感",v:4},{t:"お金と時間の自由",v:2},{t:"毎日楽しく過ごせること",v:1}]},
  {axis:"values",q:"どんな職場環境がいい？",opts:[{t:"革新的でダイナミックな環境",v:5},{t:"協力的で和やかなチーム",v:4},{t:"安定していて秩序ある環境",v:2},{t:"自分のペースで働ける環境",v:1}]},
  {axis:"values",q:"10年後の自分、どうなってたい？",opts:[{t:"業界で名前が知られる存在",v:5},{t:"特定分野のエキスパート",v:4},{t:"豊かな人間関係に囲まれた生活",v:2},{t:"まだあまり考えていない",v:1}]},
  // motivation 4問
  {axis:"motivation",q:"仕事で一番達成感を感じるのは？",opts:[{t:"難しい課題を乗り越えたとき",v:5},{t:"チームで目標を達成したとき",v:4},{t:"誰かに感謝されたとき",v:2},{t:"無事に一日が終わったとき",v:1}]},
  {axis:"motivation",q:"没頭できる作業ってどんな感じ？",opts:[{t:"頭をフル回転させる知的挑戦",v:5},{t:"自由に創造力を発揮できる作業",v:4},{t:"明確なゴールに向けた着実な作業",v:2},{t:"単純だけど集中できる作業",v:1}]},
  {axis:"motivation",q:"変化に対してどうアプローチする？",opts:[{t:"変化は大歓迎！率先して適応",v:5},{t:"メリットがあれば柔軟に対応",v:4},{t:"安定が好き、慎重に受け入れる",v:2},{t:"変化はできれば避けたい",v:1}]},
  {axis:"motivation",q:"モチベーションを長続きさせる方法は？",opts:[{t:"大きなビジョンを掲げて突き進む",v:5},{t:"小さな成功体験を積み重ねる",v:4},{t:"ルーティンと安定した環境に頼る",v:2},{t:"気分に任せて進む",v:1}]},
  // mental 4問
  {axis:"mental",q:"批判されたとき、どう受け止める？",opts:[{t:"客観的に受け止めて改善に活かす",v:5},{t:"一時落ち込むが素早く立ち直る",v:4},{t:"しばらく考え込んでしまう",v:2},{t:"かなり長引いてしまう",v:1}]},
  {axis:"mental",q:"プレッシャーがかかったとき？",opts:[{t:"冷静さを保ちパフォーマンスが上がる",v:5},{t:"適度な緊張感がプラスに働く",v:4},{t:"プレッシャーに弱く消耗しやすい",v:2},{t:"頭が真っ白になりがち",v:1}]},
  {axis:"mental",q:"失敗したとき、どうする？",opts:[{t:"原因分析して次に活かす",v:5},{t:"時間をかけて気持ちを整理する",v:4},{t:"長期間引きずってしまう",v:2},{t:"なかったことにしたい",v:1}]},
  {axis:"mental",q:"自分のメンタルの強みは？",opts:[{t:"逆境でも折れない強靭さ",v:5},{t:"感情に共感する豊かな感受性",v:4},{t:"慎重で安定した判断力",v:2},{t:"まだよくわからない",v:1}]},
];

const JOB_OPTIONS = ["事務職","施工管理職","エンジニア職","営業職","販売職","マーケティング","Webデザイン","コンサルタント","クリエイター","まだわからない"];
const TIMING_OPTIONS = ["今すぐ","1ヶ月〜3ヶ月以内","3ヶ月以上先","考えていない"];
const PREF_OPTIONS = ["東京","神奈川","埼玉","千葉","大阪","名古屋","福岡","その他（全国）","リモート希望"];

/* ════════════════════════════════════════
   SCORING
════════════════════════════════════════ */
function calcScores(answers) {
  const raw = {};
  AXES.forEach(a => { raw[a.id] = 0; });
  answers.forEach((ans, i) => {
    if (ans !== null) raw[QS[i].axis] += QS[i].opts[ans].v;
  });
  const s = {};
  // 4問×最大5点=20, 最小1点×4=4 → 0〜100に正規化
  AXES.forEach(a => { s[a.id] = Math.max(0, Math.min(100, Math.round(((raw[a.id]-4)/16)*100))); });
  return s;
}

function calcJobs(scores) {
  const sv = AXES.map(a => scores[a.id]/100);
  const scored = ALL_JOBS.map(job => {
    const pn = job.profile.map(p=>p/5);
    let sim = 0;
    sv.forEach((s,i)=>{ sim += 1-Math.abs(s-pn[i]); });
    const base = sim/5;
    const match = job.priority
      ? Math.min(97, Math.max(63, Math.round(base*34+63)))
      : Math.min(88, Math.max(52, Math.round(base*36+52)));
    return { ...job, match };
  });
  const prio  = scored.filter(j=>j.priority).sort((a,b)=>b.match-a.match);
  const other = scored.filter(j=>!j.priority).sort((a,b)=>b.match-a.match);
  return [...prio, ...other];
}

function getComment(id, s) {
  const m = {
    personality: s>=67?"論理×外向型。構造的に考えながら人を動かせる！":s>=34?"バランス型。状況に応じてスタイルを使い分けられる。":"内省×感情型。深い洞察力と共感力が強み。",
    behavior:    s>=67?"即断即決タイプ！リスクを取って主体的に動ける行動派。":s>=34?"場を読みながら最適なタイミングで動けるバランス派。":"慎重×協調タイプ。チームの安定を守る縁の下の力持ち。",
    values:      s>=67?"社会インパクト重視！意義ある仕事に全力を注げる。":s>=34?"仕事もプライベートも大切に着実に成長できる。":"安定×調和重視。長期的なキャリアを着実に築ける。",
    motivation:  s>=67?"内発的動機バリバリ！フロー状態で驚異の集中力を発揮。":s>=34?"外発・内発をバランスよく活用して持続的に力を出せる。":"明確なゴールとルーティンがあれば確実に結果を出せる。",
    mental:      s>=67?"鋼のメンタル！プレッシャー下でも最高パフォーマンス。":s>=34?"感情×論理バランス型。困難でも着実に前進できる。":"豊かな感受性の持ち主。深い共感力と繊細な判断力が強み。",
  };
  return m[id];
}

function getStrengths(scores) {
  const sorted = AXES.map(a=>({...a, score:scores[a.id]})).sort((a,b)=>b.score-a.score);
  const sm = { personality:"論理的な構造思考力", behavior:"即断即決の実行力", values:"強烈な目的意識と使命感", motivation:"尽きない内発的モチベ", mental:"折れないレジリエンス" };
  const cm = { personality:"感情面ももっと意識して", behavior:"時には慎重さも必要", values:"短期的な視点も忘れずに", motivation:"ペース配分を意識して", mental:"感情を表現する練習を" };
  return { strengths: sorted.slice(0,3).map(a=>sm[a.id]), cautions: sorted.slice(-2).map(a=>cm[a.id]) };
}

function getBestEnv(scores) {
  const top = AXES.reduce((a,b)=>scores[a.id]>scores[b.id]?a:b);
  const em = { personality:"論理的な議論が活発な知的刺激に満ちた環境", behavior:"自分でプロセスを設計できる裁量の大きな職場", values:"ミッションドリブンで社会への影響を感じられる組織", motivation:"常に新しい挑戦があり高速で成長できる環境", mental:"心理的安全性が高く長期的な信頼関係を築ける職場" };
  return em[top.id];
}

/* ════════════════════════════════════════
   ANIMATED BAR
════════════════════════════════════════ */
function Bar({ score, color, delay=0 }) {
  const [w, setW] = useState(0);
  useEffect(()=>{ const t=setTimeout(()=>setW(score),400+delay); return()=>clearTimeout(t); },[score,delay]);
  return (
    <div style={{ height:10, background:"#E2EBF6", borderRadius:99, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${w}%`, background:`linear-gradient(90deg,${color}99,${color})`, borderRadius:99, transition:"width 1.1s cubic-bezier(0.16,1,0.3,1)", boxShadow:`0 0 8px ${color}44` }} />
    </div>
  );
}

/* ════════════════════════════════════════
   FORM FIELD COMPONENTS
════════════════════════════════════════ */
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

function Input({ value, onChange, placeholder, type="text", ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{ width:"100%", padding:"12px 14px", fontSize:14, color:C.txt1, background:C.bgCard, border:`1.5px solid ${focus?C.ocean:C.border}`, borderRadius:10, outline:"none", transition:"border-color 0.15s", fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}
      {...rest}
    />
  );
}

/* ════════════════════════════════════════
   WAVE HEADER
════════════════════════════════════════ */
function WaveHeader({ children, compact=false }) {
  return (
    <div style={{ position:"relative", background:`linear-gradient(135deg,${C.navy} 0%,${C.navyMid} 60%,${C.navyLt} 100%)`, paddingBottom:compact?48:64, overflow:"hidden" }}>
      {/* Bokeh */}
      <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(59,111,212,0.08)", pointerEvents:"none" }} />
      {/* Bubbles */}
      {[...Array(8)].map((_,i)=>(
        <div key={i} style={{ position:"absolute", width:`${4+(i%3)*3}px`, height:`${4+(i%3)*3}px`, borderRadius:"50%", background:`rgba(56,189,248,${0.15+(i%3)*0.08})`, left:`${10+(i*18)%78}%`, top:`${8+(i*27)%65}%`, animation:`floatB ${3+i%3}s ease-in-out ${i*0.5}s infinite alternate` }} />
      ))}
      <div style={{ position:"relative", zIndex:1 }}>
        {children}
      </div>
      {/* Wave bottom */}
      <svg style={{ position:"absolute", bottom:-1, width:"100%", zIndex:1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60Z" fill={C.bg} />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   CSS
════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
button,a,input,select,textarea{font-family:'Noto Sans JP','Hiragino Sans',sans-serif;}
body{background:${C.bg};}
@keyframes waveSweep1{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes waveSweep2{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
@keyframes waveSweep3{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes quizFloat{0%{transform:translateY(0) scale(1);opacity:.5}100%{transform:translateY(-12px) scale(1.1);opacity:1}}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.15);opacity:.7}}
@keyframes floatB{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.fu{animation:fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;}
.fu1{animation:fadeUp 0.55s 0.07s cubic-bezier(0.16,1,0.3,1) both;}
.fu2{animation:fadeUp 0.55s 0.14s cubic-bezier(0.16,1,0.3,1) both;}
.fu3{animation:fadeUp 0.55s 0.21s cubic-bezier(0.16,1,0.3,1) both;}
`;

/* ════════════════════════════════════════
   MAIN APP
════════════════════════════════════════ */
export default function App() {
  /* Phase: intro | form | quiz | loading | result */
  const [phase, setPhase]   = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [animIn, setAnimIn]   = useState(true);
  const [scores, setScores]   = useState(null);
  const [jobs, setJobs]       = useState([]);
  const [axRes, setAxRes]     = useState(null);
  const [aiText, setAiText]   = useState(null);
  const [aiLoad, setAiLoad]   = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [showOther, setShowOther] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [errors, setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* Form state */
  const [form, setForm] = useState({
    name:"", birth:"", phone:"", email:"",
    location:"", timing:"", jobs:[], memo:""
  });

  const q  = QS[current];
  const ax = AXES.find(a=>a.id===q?.axis);
  const prog = Math.round((current/20)*100);

  /* ── Form field update ── */
  function setF(key, val) { setForm(f=>({...f,[key]:val})); }
  function toggleJob(j) {
    setForm(f=>({ ...f, jobs: f.jobs.includes(j) ? f.jobs.filter(x=>x!==j) : [...f.jobs,j] }));
  }

  /* ── Form validation ── */
  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.birth) e.birth = "生年月日を入力してください";
    if (!form.phone.trim()) e.phone = "電話番号を入力してください";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "正しいメールアドレスを入力してください";
    if (!form.location) e.location = "希望勤務地を選択してください";
    if (!form.timing) e.timing = "就業開始時期を選択してください";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── Google スプレッドシートに送信 ── */
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyuWyb2LtCDP9dMRUS1i_S6VxZEyCpHGz8xcbxuLvztehM3cpOK_Id5IG8sTLAHXUer/exec";

  async function sendToSheet(formData) {
    try {
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.error("スプレッドシート送信エラー:", e);
    }
  }

  /* ── Quiz ── */
  function choose(idx) {
    if (selected !== null) return;
    setSelected(idx);
    const na = [...answers]; na[current] = idx; setAnswers(na);
    setTimeout(() => {
      if (current < 19) {
        setAnimIn(false);
        setTimeout(() => { setCurrent(c=>c+1); setSelected(null); setHovered(null); setAnimIn(true); }, 240);
      } else finish(na);
    }, 480);
  }

  function finish(ans) {
    setPhase("loading");
    const s = calcScores(ans);
    const j = calcJobs(s);
    setScores(s); setJobs(j);
    setAxRes({ str: getStrengths(s), env: getBestEnv(s) });
    let step = 0;
    const iv = setInterval(() => {
      step++; setLoadStep(step);
      if (step >= 5) { clearInterval(iv); setTimeout(()=>{ setPhase("result"); fetchAi(s,j); },400); }
    }, 420);
  }

  async function fetchAi(s, j) {
    setAiLoad(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:`20代前半の求職者の適職診断結果です。友達に話しかけるようなフレンドリーな口調で、前向きで背中を押してくれるキャリアアドバイスを200字以内で書いてください。絵文字も適度に。\n\nスコア: 性格${s.personality}/行動${s.behavior}/価値観${s.values}/モチベ${s.motivation}/メンタル${s.mental}\n適職TOP3: ${j.slice(0,3).map(x=>x.name).join("、")}`}]
        })
      });
      const d = await r.json();
      setAiText(d.content?.map(b=>b.text||"").join("")||"");
    } catch { setAiText("あなたの強み、しっかり見えてきたよ！🌊 自信を持って一歩踏み出してみて。海みたいに広い可能性が待ってる！"); }
    setAiLoad(false);
  }

  function restart() {
    setPhase("intro"); setCurrent(0); setAnswers(Array(20).fill(null));
    setSelected(null); setHovered(null); setScores(null); setJobs([]);
    setAxRes(null); setAiText(null); setAiLoad(false); setLoadStep(0);
    setShowOther(false); setExpanded(null); setErrors({}); setSubmitting(false);
    setForm({ name:"", birth:"", phone:"", email:"", location:"", timing:"", jobs:[], memo:"" });
  }

  const top5  = jobs.slice(0,5);
  const other = jobs.slice(5);
  const rankColors = [C.amber, C.ocean, C.aqua, C.violet, C.mint];

  /* ──────────────────────────────────────
     INTRO
  ────────────────────────────────────── */
  if (phase==="intro") return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      <WaveHeader>
        <div style={{ padding:"52px 24px 20px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:24 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:C.foam, boxShadow:`0 0 8px ${C.foam}` }}/>
            <span style={{ color:"rgba(186,230,253,0.7)", fontSize:12, fontWeight:700, letterSpacing:"0.15em" }}>リウェーブ キャリア</span>
          </div>
          <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,0.15)", border:"1px solid rgba(249,115,22,0.4)", color:"#FED7AA", padding:"7px 18px", borderRadius:99, fontSize:12, fontWeight:700, marginBottom:22 }}>
            🔥 SNSで話題！20代に超人気の診断
          </div>
          <h1 className="fu1" style={{ color:"#fff", fontSize:"clamp(2rem,8vw,3.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:16 }}>
            あなたの<span style={{ color:C.foam }}>天職</span>、<br/>もう迷わない。
          </h1>
          <p className="fu2" style={{ color:"rgba(186,230,253,0.75)", fontSize:"clamp(13px,3vw,16px)", lineHeight:1.9, marginBottom:40 }}>
            5軸×20問の本格診断で<strong style={{color:C.foam}}>あなただけのキャリア</strong>が見えてくる🌊
          </p>
          <div className="fu3" style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:44 }}>
            {["⭐ 20代に超人気","✨ 約5分で完了","🆓 完全無料","📊 5軸本格分析"].map((t,i)=>(
              <span key={i} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:99, padding:"7px 16px", fontSize:11, fontWeight:700, color:"rgba(186,230,253,0.85)" }}>{t}</span>
            ))}
          </div>
          <button onClick={()=>setPhase("form")} style={{
            background:`linear-gradient(135deg,${C.aqua},${C.navyLt})`,
            color:"#fff", border:"none", borderRadius:99, padding:"18px 52px",
            fontSize:16, fontWeight:900, cursor:"pointer", letterSpacing:"0.03em",
            boxShadow:`0 8px 36px rgba(6,182,212,0.4)`, transition:"all 0.18s"
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px) scale(1.03)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
          >🚀 今すぐ診断スタート</button>
          <p style={{ color:"rgba(186,230,253,0.35)", fontSize:11, marginTop:12 }}>登録不要・無料・全20問</p>
        </div>
      </WaveHeader>

      {/* Feature cards */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 20px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:40 }}>
          {[
            {icon:"🧠", t:"5軸パーソナリティ分析", d:"心理学ベースの多次元診断", c:C.ocean},
            {icon:"🤖", t:"AIキャリアアドバイス",  d:"あなただけの提言を生成",   c:C.violet},
            {icon:"💼", t:"適職ランキングTOP5",    d:"10職種から最適を算出",     c:C.mint},
          ].map((f,i)=>(
            <div key={i} style={{ background:C.bgCard, borderRadius:16, boxShadow:"0 2px 16px rgba(27,43,94,0.07)", padding:"22px 18px", textAlign:"center" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:`${f.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 12px" }}>{f.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:C.navy, marginBottom:6 }}>{f.t}</div>
              <div style={{ fontSize:12, color:C.txt3, lineHeight:1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>

        {/* Job preview */}
        <div style={{ background:C.bgCard, borderRadius:18, boxShadow:"0 2px 16px rgba(27,43,94,0.07)", padding:"24px" }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.txt3, letterSpacing:"0.1em", marginBottom:16, textAlign:"center" }}>あなたの適職がわかる！</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
            {top5.length ? top5.map((j,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, background:`${j.color}10`, border:`1.5px solid ${j.color}33`, borderRadius:10, padding:"8px 14px" }}>
                <span>{j.icon}</span><span style={{ fontSize:12, fontWeight:700, color:j.color }}>{j.name}</span>
              </div>
            )) : [
              {icon:"📋",name:"事務職",color:C.aqua},{icon:"🏗️",name:"施工管理",color:C.coral},
              {icon:"💻",name:"エンジニア",color:C.ocean},{icon:"🤝",name:"営業職",color:C.mint},{icon:"🛍️",name:"販売職",color:C.violet}
            ].map((j,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, background:`${j.color}10`, border:`1.5px solid ${j.color}33`, borderRadius:10, padding:"8px 14px" }}>
                <span>{j.icon}</span><span style={{ fontSize:12, fontWeight:700, color:j.color }}>{j.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ──────────────────────────────────────
     FORM
  ────────────────────────────────────── */
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

          {/* 名前 */}
          <Field label="お名前" required>
            <Input value={form.name} onChange={e=>setF("name",e.target.value)} placeholder="山田 太郎" />
            {errors.name && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.name}</p>}
          </Field>

          {/* 生年月日 */}
          <Field label="生年月日" required>
            <Input type="date" value={form.birth} onChange={e=>setF("birth",e.target.value)} />
            {errors.birth && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.birth}</p>}
          </Field>

          {/* 電話番号 */}
          <Field label="電話番号" required>
            <Input type="tel" value={form.phone} onChange={e=>setF("phone",e.target.value)} placeholder="09012345678" />
            {errors.phone && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.phone}</p>}
          </Field>

          {/* メールアドレス */}
          <Field label="メールアドレス" required>
            <Input type="email" value={form.email} onChange={e=>setF("email",e.target.value)} placeholder="example@mail.com" />
            {errors.email && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.email}</p>}
          </Field>

          {/* 希望勤務地 */}
          <Field label="希望勤務地" required>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {PREF_OPTIONS.map(p=>(
                <button key={p} onClick={()=>setF("location",p)} style={{
                  padding:"8px 14px", borderRadius:99, fontSize:12, fontWeight:700,
                  background: form.location===p ? C.ocean : C.bgMist,
                  color: form.location===p ? "#fff" : C.txt2,
                  border: `1.5px solid ${form.location===p ? C.ocean : C.border}`,
                  cursor:"pointer", transition:"all 0.15s"
                }}>{p}</button>
              ))}
            </div>
            {errors.location && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.location}</p>}
          </Field>

          {/* 就業開始時期 */}
          <Field label="いつから就業したい？" required>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {TIMING_OPTIONS.map(t=>(
                <button key={t} onClick={()=>setF("timing",t)} style={{
                  padding:"9px 16px", borderRadius:99, fontSize:12, fontWeight:700,
                  background: form.timing===t ? C.navyMid : C.bgMist,
                  color: form.timing===t ? "#fff" : C.txt2,
                  border: `1.5px solid ${form.timing===t ? C.navyMid : C.border}`,
                  cursor:"pointer", transition:"all 0.15s"
                }}>{t}</button>
              ))}
            </div>
            {errors.timing && <p style={{ color:C.rose, fontSize:11, marginTop:5 }}>⚠ {errors.timing}</p>}
          </Field>

          {/* 気になる職種 */}
          <Field label="気になる職種（複数選択OK）">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {JOB_OPTIONS.map(j=>(
                <button key={j} onClick={()=>toggleJob(j)} style={{
                  padding:"8px 14px", borderRadius:99, fontSize:12, fontWeight:700,
                  background: form.jobs.includes(j) ? C.mint : C.bgMist,
                  color: form.jobs.includes(j) ? "#fff" : C.txt2,
                  border: `1.5px solid ${form.jobs.includes(j) ? C.mint : C.border}`,
                  cursor:"pointer", transition:"all 0.15s"
                }}>{form.jobs.includes(j)?"✓ ":""}{j}</button>
              ))}
            </div>
          </Field>

          {/* Submit */}
          <button onClick={async ()=>{ if(submitting) return; if(validateForm()){ setSubmitting(true); await sendToSheet(form); setSubmitting(false); setPhase("quiz"); } }} style={{
            width:"100%", background:`linear-gradient(135deg,${C.navy},${C.navyLt})`,
            color:"#fff", border:"none", borderRadius:12, padding:"16px",
            fontSize:15, fontWeight:900, cursor:"pointer",
            boxShadow:`0 6px 24px rgba(27,58,107,0.3)`, transition:"all 0.18s", marginTop:4
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
          >
            ✨ 診断に進む →
          </button>
          <p style={{ textAlign:"center", fontSize:11, color:C.txt4, marginTop:12 }}>入力情報は適職診断・キャリア相談のみに使用します</p>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ──────────────────────────────────────
     LOADING
  ────────────────────────────────────── */
  if (phase==="loading") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(180deg,${C.navy},${C.navyMid})`, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ fontSize:60, marginBottom:16, animation:"spin 3s linear infinite", display:"inline-block" }}>🌊</div>
        <h2 style={{ color:"#fff", fontSize:22, fontWeight:900, marginBottom:8 }}>あなたの天職を分析中...</h2>
        <p style={{ color:"rgba(186,230,253,0.5)", fontSize:13 }}>20問の回答を解析しています</p>
      </div>
      <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:28, width:"min(90vw,380px)" }}>
        {AXES.map((a,i)=>(
          <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<4?"1px solid rgba(255,255,255,0.06)":"none", opacity:loadStep>i?1:0.2, transition:"opacity 0.4s" }}>
            <div style={{ width:34, height:34, borderRadius:9, background:loadStep>i?`${a.color}22`:"transparent", border:`1px solid ${loadStep>i?a.color+"55":"rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, transition:"all 0.3s" }}>
              {loadStep>i?"✅":a.icon}
            </div>
            <span style={{ fontSize:13, color:loadStep>i?"rgba(186,230,253,0.9)":"rgba(186,230,253,0.2)", fontWeight:500 }}>
              {["性格タイプを分析中...","行動スタイルを解析中...","価値観マトリクスを計算中...","モチベ源泉を特定中...","最適キャリアを算出中..."][i]}
            </span>
          </div>
        ))}
        <div style={{ marginTop:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"rgba(186,230,253,0.4)", fontWeight:700 }}>分析中</span>
            <span style={{ fontSize:13, fontWeight:900, color:C.foam }}>{Math.round((loadStep/5)*100)}%</span>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:99 }}>
            <div style={{ height:"100%", borderRadius:99, width:`${(loadStep/5)*100}%`, background:`linear-gradient(90deg,${C.aqua},${C.foam})`, transition:"width 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );

  /* ──────────────────────────────────────
     QUIZ
  ────────────────────────────────────── */
  if (phase==="quiz") return (
    <div style={{ minHeight:"100vh", fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>

      {/* ── Ocean Wave Animated Background ── */}
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
        <svg style={{ position:"absolute", bottom:0, left:0, width:"200%", animation:"waveSweep3 17s linear infinite reverse", willChange:"transform" }} viewBox="0 0 1440 140" preserveAspectRatio="none" height="70">
          <path d="M0,55 C300,100 600,20 900,65 C1100,95 1300,28 1440,55 L1440,140 L0,140Z" fill="rgba(6,182,212,0.07)"/>
        </svg>
      </div>

      {/* Progress header */}
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
            <div style={{ height:"100%", borderRadius:99, width:`${prog}%`, background:`linear-gradient(90deg,${C.navyLt},${C.ocean},${C.foam})`, transition:"width 0.45s cubic-bezier(0.16,1,0.3,1)", boxShadow:`0 0 10px ${C.aqua}66` }} />
          </div>
          <div style={{ display:"flex", gap:3, marginTop:5 }}>
            {AXES.map((a,i)=>(
              <div key={a.id} style={{ flex:1, height:3, borderRadius:99, background:Math.floor(current/4)>=i?a.color:"rgba(255,255,255,0.1)", transition:"background 0.3s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div style={{ flex:1, position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 20px 44px", maxWidth:560, margin:"0 auto", width:"100%" }}>
        <div style={{ width:"100%", opacity:animIn?1:0, transform:animIn?"none":"translateY(14px)", transition:"opacity 0.24s, transform 0.24s" }}>
          <div style={{ textAlign:"center", marginBottom:22 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(6,20,40,0.65)", backdropFilter:"blur(10px)", border:`1.5px solid ${ax?.color}44`, borderRadius:14, padding:"10px 24px" }}>
              <span style={{ fontSize:16 }}>{ax?.icon}</span>
              <span style={{ fontSize:13, fontWeight:700, color:ax?.color }}>Q{current+1} — {ax?.label}</span>
            </div>
          </div>
          <h2 style={{ fontSize:"clamp(1.15rem,4.5vw,1.55rem)", fontWeight:900, color:"#fff", textAlign:"center", lineHeight:1.65, marginBottom:28, letterSpacing:"-0.01em", textShadow:"0 2px 16px rgba(0,0,0,0.6)" }}>
            {q?.q}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
            {q?.opts.map((opt,i)=>{
              const isSel=selected===i, isHov=hovered===i&&selected===null;
              return (
                <button key={i} onClick={()=>choose(i)}
                  onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
                  style={{
                    background: isSel?"rgba(6,20,40,0.88)":isHov?"rgba(6,20,40,0.75)":"rgba(6,20,40,0.55)",
                    backdropFilter:"blur(18px)",
                    border:`2px solid ${isSel?ax?.color:isHov?ax?.color+"66":"rgba(56,189,248,0.22)"}`,
                    borderRadius:16, padding:"17px 20px",
                    display:"flex", alignItems:"center", gap:14,
                    cursor:selected!==null?"default":"pointer",
                    transition:"all 0.17s",
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

  /* ──────────────────────────────────────
     RESULT
  ────────────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      {/* Hero */}
      <WaveHeader>
        <div style={{ padding:"48px 24px 20px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:16 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.foam }}/>
            <span style={{ color:"rgba(186,230,253,0.5)", fontSize:11, fontWeight:700, letterSpacing:"0.15em" }}>リウェーブ キャリアコンパス</span>
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(34,211,238,0.15)", border:"1px solid rgba(34,211,238,0.3)", color:"#BAE6FD", padding:"7px 20px", borderRadius:99, fontSize:12, fontWeight:700, marginBottom:16 }}>
            🎉 {form.name || "あなた"}さんの診断完了！
          </div>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.6rem,5.5vw,2.8rem)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:10 }}>
            あなたの<span style={{ color:C.foam }}>キャリアコンパス</span>
          </h1>
          <p style={{ color:"rgba(186,230,253,0.55)", fontSize:13 }}>📸 スクショしてSNSでシェアしよう！</p>
        </div>
      </WaveHeader>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"0 16px 80px" }}>

        {/* ── 5軸スコア ── */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"26px 24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:C.ocean }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>📊 5軸パーソナリティスコア</span>
          </div>
          {AXES.map((axis,i)=>(
            <div key={axis.id} style={{ marginBottom:i<4?20:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:axis.lt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{axis.icon}</div>
                  <span style={{ fontSize:13, fontWeight:700, color:C.txt2 }}>{axis.label}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
                  <span style={{ fontSize:26, fontWeight:900, color:axis.color }}>{scores[axis.id]}</span>
                  <span style={{ fontSize:11, color:C.txt4 }}>/100</span>
                </div>
              </div>
              <Bar score={scores[axis.id]} color={axis.color} delay={i*110} />
            </div>
          ))}
        </div>

        {/* ── 軸別コメント ── */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"26px 24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <div style={{ width:4, height:20, borderRadius:2, background:C.violet }}/>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>🔍 軸別詳細分析</span>
          </div>
          {AXES.map((axis,i)=>(
            <div key={axis.id} style={{ display:"flex", gap:12, paddingBottom:16, marginBottom:16, borderBottom:i<4?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:axis.lt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{axis.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:13, fontWeight:800, color:C.navy }}>{axis.label}</span>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:99, background:axis.lt, color:axis.color }}>{scores[axis.id]}%</span>
                </div>
                <p style={{ fontSize:13, color:C.txt3, lineHeight:1.85 }}>{getComment(axis.id,scores[axis.id])}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 強み・注意点 ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <div style={{ background:C.bgCard, borderRadius:18, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"20px" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.txt4, marginBottom:14 }}>💪 あなたの強み</div>
            {axRes?.str.strengths.map((s,i)=>(
              <div key={i} style={{ display:"flex", gap:9, marginBottom:9, padding:"9px 11px", background:C.bgMist, borderRadius:10 }}>
                <span style={{ color:C.ocean, fontSize:13, flexShrink:0 }}>★</span>
                <span style={{ fontSize:12, color:C.navy, fontWeight:600, lineHeight:1.65 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.bgCard, borderRadius:18, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"20px" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.txt4, marginBottom:14 }}>⚠️ 意識したい点</div>
            {axRes?.str.cautions.map((c,i)=>(
              <div key={i} style={{ display:"flex", gap:9, marginBottom:9, padding:"9px 11px", background:"#FFF4EE", borderRadius:10 }}>
                <span style={{ color:C.coral, fontSize:13, flexShrink:0 }}>!</span>
                <span style={{ fontSize:12, color:"#9A3412", fontWeight:600, lineHeight:1.65 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 最適環境 ── */}
        <div style={{ background:`linear-gradient(135deg,${C.bgMist},#ECFDF5)`, border:`1.5px solid ${C.borderMd}`, borderRadius:18, padding:"20px 22px", marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:C.txt4, marginBottom:10 }}>🌿 最も力を発揮できる環境</div>
          <p style={{ fontSize:15, color:C.navy, fontWeight:700, lineHeight:1.85 }}>{axRes?.env}</p>
        </div>

        {/* ── 適職 TOP5 ── */}
        <div style={{ background:C.bgCard, borderRadius:20, boxShadow:"0 3px 20px rgba(27,43,94,0.09)", padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:4, height:20, borderRadius:2, background:C.amber }}/>
              <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:C.txt3 }}>⚓ 適職ランキング TOP 5</span>
            </div>
          </div>
          <p style={{ fontSize:11, color:C.txt4, marginBottom:18, paddingLeft:12 }}>タップして詳細を確認できます</p>

          {top5.map((job,i)=>{
            const isExp = expanded===job.id;
            return (
              <div key={job.id} style={{ marginBottom:i<4?10:0 }}>
                <button onClick={()=>setExpanded(isExp?null:job.id)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:13,
                  padding:"14px 14px",
                  background: isExp?`${job.color}0A`:i===0?"#FFFBEB":"transparent",
                  border:`1.5px solid ${isExp?job.color+"55":i===0?"#FDE68A":C.border}`,
                  borderRadius:isExp?"14px 14px 0 0":14,
                  cursor:"pointer", transition:"all 0.18s",
                  fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif",
                }}
                  onMouseEnter={e=>{if(!isExp){e.currentTarget.style.borderColor=`${job.color}55`;e.currentTarget.style.background=`${job.color}06`;}}}
                  onMouseLeave={e=>{if(!isExp){e.currentTarget.style.borderColor=i===0?"#FDE68A":C.border;e.currentTarget.style.background=i===0?"#FFFBEB":"transparent";}}}
                >
                  <span style={{ fontSize:i<3?18:11, fontWeight:900, color:i<3?"inherit":C.txt4, width:24, textAlign:"center", flexShrink:0 }}>
                    {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                  </span>
                  <div style={{ width:46, height:46, borderRadius:13, flexShrink:0, background:`${job.color}15`, border:`1.5px solid ${job.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{job.icon}</div>
                  <div style={{ flex:1, textAlign:"left", minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:900, color:C.navy, marginBottom:3 }}>{job.name}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {job.tag.map((t,ti)=>(
                        <span key={ti} style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:99, background:`${job.color}15`, color:job.color }}>#{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:22, fontWeight:900, color:rankColors[i] }}>{job.match}%</div>
                    <div style={{ height:3, background:C.mist, borderRadius:99, marginTop:4, width:56, marginLeft:"auto" }}>
                      <div style={{ height:"100%", borderRadius:99, width:`${job.match}%`, background:rankColors[i] }}/>
                    </div>
                  </div>
                  <span style={{ color:C.txt4, fontSize:11, flexShrink:0 }}>{isExp?"▲":"▼"}</span>
                </button>

                {isExp && (
                  <div style={{ padding:"18px 18px 18px 22px", background:`${job.color}06`, border:`1.5px solid ${job.color}33`, borderTop:"none", borderRadius:"0 0 14px 14px" }}>
                    <p style={{ fontSize:13, color:C.txt3, lineHeight:1.9, marginBottom:10 }}>{job.desc}</p>
                    <p style={{ fontSize:13, color:C.txt2, lineHeight:1.9, marginBottom:16 }}>{job.detail}</p>
                    <a href={TIMEREX_URL} target="_blank" rel="noopener noreferrer" style={{
                      display:"inline-flex", alignItems:"center", gap:6,
                      background:`linear-gradient(135deg,${job.color},${job.color}cc)`,
                      color:"#fff", textDecoration:"none", borderRadius:99,
                      padding:"10px 22px", fontSize:12, fontWeight:800,
                      boxShadow:`0 4px 14px ${job.color}33`
                    }}>
                      📅 この職種でキャリア相談を予約する →
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          {/* その他職種 */}
          {other.length>0 && (
            <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${C.border}` }}>
              <button onClick={()=>setShowOther(v=>!v)} style={{ width:"100%", background:C.bgMist, border:`1px solid ${C.border}`, borderRadius:10, padding:"11px", display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", color:C.txt3, fontSize:12, fontWeight:700, transition:"all 0.15s", fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}>
                {showOther?`▲ その他の職種を隠す`:`▼ その他の職種も見る（${other.length}件）`}
              </button>
              {showOther && (
                <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:8 }}>
                  {other.map(job=>(
                    <div key={job.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 12px", background:C.bgMist, border:`1px solid ${C.border}`, borderRadius:12 }}>
                      <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:`${job.color}15`, border:`1px solid ${job.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{job.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{job.name}</div>
                        <div style={{ fontSize:11, color:C.txt4 }}>{job.sub}</div>
                      </div>
                      <span style={{ fontSize:16, fontWeight:900, color:job.color }}>{job.match}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── AI アドバイス ── */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:20, padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"rgba(167,139,250,0.2)", border:"1px solid rgba(167,139,250,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>🤖</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:"rgba(196,181,253,0.95)" }}>AI キャリアナビゲーター</div>
              <div style={{ fontSize:10, color:"rgba(167,139,250,0.45)", letterSpacing:"0.05em" }}>Claude AI 搭載</div>
            </div>
          </div>
          {aiLoad
            ? <div style={{ color:"rgba(186,230,253,0.35)", fontSize:13, animation:"pulse 1.2s infinite" }}>✨ アドバイスを生成中...</div>
            : <p style={{ fontSize:14, color:"rgba(186,230,253,0.9)", lineHeight:2.1 }}>{aiText}</p>
          }
        </div>

        {/* ── CTA ── */}
        <div style={{ position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${C.navy} 0%,${C.navyMid} 50%,${C.navyLt} 100%)`, borderRadius:22, padding:"36px 28px", textAlign:"center", boxShadow:`0 16px 48px rgba(27,58,107,0.35)` }}>
          <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"rgba(186,230,253,0.4)", marginBottom:12 }}>次のステップ</div>
            <h3 style={{ fontSize:"clamp(1.1rem,4vw,1.6rem)", fontWeight:900, color:"#fff", marginBottom:10, lineHeight:1.4 }}>
              {form.name ? `${form.name}さん、` : ""}プロと一緒に<br/>天職を見つけよう
            </h3>
            <p style={{ fontSize:13, color:"rgba(186,230,253,0.6)", lineHeight:1.9, marginBottom:28 }}>
              ReWaveのキャリアアドバイザーが<br/>
              あなたの診断結果をもとに<br/>
              ぴったりの求人を無料で提案します。
            </p>
            {/* Primary CTA — Timerex */}
            <a href={TIMEREX_URL} target="_blank" rel="noopener noreferrer" style={{
              display:"block", maxWidth:320, margin:"0 auto 14px",
              background:`linear-gradient(135deg,${C.aqua},${C.ocean})`,
              color:"#fff", textDecoration:"none", borderRadius:99,
              padding:"18px 0", fontSize:15, fontWeight:900, letterSpacing:"0.02em",
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
            {/* User info summary */}
            {form.name && (
              <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"14px 16px", fontSize:12, color:"rgba(186,230,253,0.5)", lineHeight:1.8 }}>
                📋 <strong style={{ color:"rgba(186,230,253,0.7)" }}>{form.name}</strong>さんの情報は予約時に自動反映されます<br/>
                希望地：{form.location} ／ 就業時期：{form.timing}
                {form.jobs.length>0 && <><br/>気になる職種：{form.jobs.join("・")}</>}
              </div>
            )}
          </div>
        </div>

        {/* Restart */}
        <div style={{ textAlign:"center", marginTop:24, display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
          <button onClick={restart} style={{ background:"transparent", border:`1px solid ${C.borderMd}`, color:C.txt3, borderRadius:99, padding:"10px 26px", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s", fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.navyMid;e.currentTarget.style.color=C.navy;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.borderMd;e.currentTarget.style.color=C.txt3;}}
          >← もう一度診断する</button>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}
