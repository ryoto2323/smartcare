import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Heart, Coffee, Sun, Smile, ArrowRight, Check, Users, GraduationCap, TrendingUp, Sparkles } from 'lucide-react';
import { SectionWrapper, SectionTitle, ScrollMarker, ParallaxItem, fadeUp, staggerContainer, Colors, StaggerText } from './UIComponents';

// --- Hero Section (Collage & Vlog Style) ---
export const Hero: React.FC = () => {
  const carouselPhotos = [
    { id: 1, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop", rotate: "rotate-2", aspect: "aspect-[3/4]", alt: "チームミーティング" },
    { id: 2, src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=400&auto=format&fit=crop", rotate: "-rotate-1", aspect: "aspect-square", alt: "手を取り合うケア" },
    { id: 3, src: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=400&auto=format&fit=crop", rotate: "rotate-3", aspect: "aspect-[4/5]", alt: "寄り添う時間" },
    { id: 4, src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop", rotate: "-rotate-2", aspect: "aspect-[3/4]", alt: "タブレットでの記録" },
    { id: 5, src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop", rotate: "rotate-1", aspect: "aspect-square", alt: "スタッフの笑顔" }
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center pt-32 pb-20 overflow-hidden bg-[#F9F9F4]">
      
      {/* CSS for Infinite Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite; /* Slower for more elegance */
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Breathing animation for images */
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
        }
        .breathe-anim {
            animation: breathe 8s ease-in-out infinite;
        }
        /* Particle Text for Jump Rate */
        .particle-text {
            font-size: 0.6em;
            vertical-align: middle;
            margin: 0 0.1em;
            opacity: 0.85;
            font-weight: 400;
        }
      `}</style>

      {/* Parallax Background Decorations */}
      <ParallaxItem offset={-30} className="absolute top-[5%] right-[5%] z-0">
          <div className="w-96 h-96 bg-[#F2E2A6] rounded-full mix-blend-multiply opacity-40 blur-3xl" />
      </ParallaxItem>
      <ParallaxItem offset={40} className="absolute bottom-[10%] left-[-10%] z-0">
          <div className="w-[500px] h-[500px] bg-[#A8C9A3] rounded-full mix-blend-multiply opacity-30 blur-3xl" />
      </ParallaxItem>

      {/* Text Area */}
      <div className="w-full max-w-5xl text-center z-20 relative px-6 flex flex-col items-center mb-16">
        
        {/* Recruitment Sticker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative inline-block mb-12 z-30"
        >
           <div className="relative bg-white border border-[#E8B4A2] text-[#E8B4A2] px-8 py-4 rounded-lg shadow-[4px_4px_0px_rgba(232,180,162,0.5)] transform hover:scale-105 transition-transform cursor-default">
               {/* Masking Tape Visual */}
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#A8C9A3]/30 rotate-1 backdrop-blur-sm z-10" 
                    style={{ maskImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGklEQVQIW2NkYGD4D8SMYHwBdCYjAyOAJgAAda4F/hPZ8h4AAAAASUVORK5CYII=)', maskRepeat: 'repeat' }} />
               <p className="font-bold text-xl md:text-2xl font-hand tracking-widest whitespace-nowrap">介護スタッフ募集中</p>
               {/* English Deco - Adjusted Position */}
               <div className="absolute -top-8 -right-6 md:-right-10 font-script text-[#4A4A4A] text-xl transform rotate-12">Recruiting!</div>
           </div>
        </motion.div>
        
        {/* H1 with Extreme Jump Rate & Stagger Animation */}
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#4A4A4A] mb-12 tracking-tight"
        >
          {/* Line 1 */}
          <div className="block mb-2 md:mb-4">
              <StaggerText text="いいケア" />
              <motion.span variants={fadeUp} className="particle-text">は、</motion.span>
          </div>
          
          {/* Line 2 */}
          <div className="block">
              <span className="relative inline-block">
                  <StaggerText text="健やかな心" />
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-[#A8C9A3]/30 -z-10 -rotate-1 rounded-sm"></span>
              </span>
              <motion.span variants={fadeUp} className="particle-text">から。</motion.span>
          </div>
        </motion.h1>

        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible" 
          transition={{ delay: 0.5 }} 
          className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[40px] organic-border inline-block border border-white shadow-xl text-center max-w-3xl mx-auto relative z-20"
        >
          <p className="text-xl md:text-2xl font-bold text-[#4A4A4A] mb-4">私たちは<span className="particle-text">、</span>ITで現場<span className="particle-text">を</span>変えました。</p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
            記録は<ScrollMarker color="#F2E2A6">スマホで完結</ScrollMarker>。見守りは<ScrollMarker color="#F2E2A6">センサーにお任せ</ScrollMarker>。<br className="hidden md:inline"/>
            あなたの『時間』と『心』を守る、新しい介護の働き方。
          </p>
        </motion.div>
      </div>

      {/* Filmstrip Carousel Area */}
      <div className="w-full relative overflow-hidden z-10 py-10">
         <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-[#F9F9F4] to-transparent z-20 pointer-events-none" />
         <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-[#F9F9F4] to-transparent z-20 pointer-events-none" />

         <div className="animate-marquee flex gap-10 px-4">
            {[...carouselPhotos, ...carouselPhotos].map((photo, i) => (
               <div 
                 key={i} 
                 className={`relative shrink-0 w-64 md:w-80 bg-white p-4 pb-16 shadow-lg rounded-sm transform transition-transform ${photo.rotate}`}
               >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#E8B4A2]/40 rotate-1 backdrop-blur-sm z-10 shadow-sm" />
                  
                  <div className={`w-full ${photo.aspect} overflow-hidden rounded-sm bg-gray-100`}>
                    <img src={photo.src} className="w-full h-full object-cover filter contrast-[0.95] breathe-anim" style={{ animationDelay: `${i * 1.5}s` }} alt={photo.alt} />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
};

// --- Intro Section (Vertical Writing & Atmosphere) ---
export const Intro: React.FC = () => {
  return (
    <SectionWrapper id="section-0" className="bg-[#F9F9F4]">
      {/* Decorative Wavy Line */}
      <ParallaxItem offset={20} className="absolute top-0 left-0 w-full opacity-50 text-[#E8B4A2] overflow-hidden">
         <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 100 10">
            <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="1" fill="none" />
         </svg>
      </ParallaxItem>

      <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        
        {/* Vertical Writing Headline for Japanese Aesthetic */}
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 'auto' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hidden md:block writing-vertical text-3xl md:text-4xl font-bold text-[#4A4A4A] leading-loose tracking-widest border-r-2 border-[#E8B4A2]/50 pr-8 h-96"
        >
            正直、<br/>
            「介護って<br/>
            ブラックそう」<br/>
            と思っていました。
        </motion.div>

        {/* Mobile Headline */}
        <h2 className="md:hidden text-2xl font-bold text-center text-[#4A4A4A] leading-relaxed mb-6">
            正直、<br/>「介護ってブラックそう」<br/>と思っていました。
        </h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex-1 max-w-lg"
        >
          <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 rounded-[30px] shadow-sm relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            
            <div className="space-y-4 mb-10 text-gray-500 font-medium relative z-10">
                <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E8B4A2]"></span> 休みが取れなさそう</p>
                <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E8B4A2]"></span> 人間関係が面倒そう</p>
                <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E8B4A2]"></span> 給料と労働が見合っていない</p>
            </div>

            <p className="mb-10 font-bold text-lg text-[#4A4A4A] leading-loose relative z-10">
              もし、あなたがそう思って応募を迷っているなら、私たちの施設を見てほしいと思います。
            </p>
            
            <div className="bg-[#F9F9F4] p-6 rounded-xl border border-[#E8B4A2]/30 relative z-10">
               <p className="text-[#4A4A4A] font-medium leading-loose text-sm">
                 私たちは、<ScrollMarker color="#E8B4A2">やりがい</ScrollMarker> だけでスタッフを縛ることをやめました。
                 徹底的に業務を効率化し、プライベートとの両立をお約束します。
               </p>
            </div>
            
             {/* English Note */}
             <div className="absolute bottom-4 right-8 font-script text-gray-300 text-xl transform -rotate-6 opacity-60">
                No more overwork...
             </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

// --- Numbers Section (Notebook Style) ---
export const Numbers: React.FC = () => {
  return (
    <SectionWrapper id="section-1">
      <SectionTitle title="数字で見るホワイト環境" subtitle="データ" englishDecor="Our Data" />
      
      {/* Notebook Look */}
      <div className="bg-white p-8 md:p-14 rounded-[40px] shadow-lg relative overflow-hidden max-w-5xl mx-auto">
        {/* Notebook Lines Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'linear-gradient(transparent 95%, #A8C9A3 95%)', backgroundSize: '100% 40px' }}></div>
        {/* Spiral Binding Visual */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-[#F2E2A6] border-r border-black/5 flex flex-col justify-evenly items-center py-4 z-10">
             {[...Array(10)].map((_, i) => (
                 <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-[#4A4A4A] rounded-full opacity-20"></div>
             ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 pl-6 md:pl-0">
          {[
            { label: "残業時間", val: "3.2", unit: "時間", sub: "定時退社が当たり前", icon: <Sun size={28}/>, col: "text-[#E8B4A2]" },
            { label: "有給消化率", val: "92", unit: "%", sub: "推し活、旅行OK", icon: <Smile size={28}/>, col: "text-[#A8C9A3]" },
            { label: "IT導入率", val: "100", unit: "%", sub: "全室見守りセンサー", icon: <Smartphone size={28}/>, col: "text-[#7FA1B5]" },
            { label: "平均年齢", val: "26.5", unit: "歳", sub: "同世代が多い", icon: <Coffee size={28}/>, col: "text-[#C9A83A]" },
          ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="text-center group">
                 <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gray-50 group-hover:bg-opacity-50 transition-all ${item.col}`}>
                    {item.icon}
                 </div>
                 <p className="text-xs font-bold text-gray-400 mb-1">{item.label}</p>
                 <p className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-2 font-accent">{item.val}<span className="text-sm ml-1">{item.unit}</span></p>
                 <div className="h-px w-10 bg-gray-200 mx-auto mb-3" />
                 <p className="text-xs text-[#A8C9A3] font-bold leading-relaxed">{item.sub}</p>
              </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

// --- Real Work (Parallax Cards) ---
export const RealWork: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle title="汗だくで走り回るは&#10;もう過去の話。" subtitle="スマートに働ける理由" englishDecor="Smart Style" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { title: "記録はフリック入力。", desc: "紙の書類とはサヨナラ。事務作業のために残る必要はありません。", img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=600&auto=format&fit=crop" },
           { title: "持ち上げない介護。", desc: "最新リフト完備。「気合い」で体を壊させません。", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" },
           { title: "インカムで秒連携。", desc: "広い施設内で大声を出して人を探す必要なし。", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop" }
         ].map((item, i) => (
           <ParallaxItem key={i} offset={i % 2 === 0 ? 30 : -30} className="h-full">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="bg-white rounded-[40px] overflow-hidden shadow-lg border border-[#F9F9F4] flex flex-col h-full"
               >
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-900/10 z-10" />
                    <img src={item.img} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center font-bold text-[#A8C9A3] shadow-md z-20 font-accent text-lg">{i+1}</div>
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-xl font-bold text-[#4A4A4A] mb-4 font-accent">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-loose">{item.desc}</p>
                  </div>
               </motion.div>
           </ParallaxItem>
         ))}
      </div>
    </SectionWrapper>
  );
};

// --- Staff Section (Polaroid / Photo Album) ---
export const Staff: React.FC = () => {
  const staff = [
    {
      role: "入社2年目 / 23歳",
      text: "前職は残業ばかりで推しのライブに行けなくて辞めました。今はシフト希望がほぼ通るので、遠征も余裕です。",
      tags: ["#推し活充実", "#残業なし", "#未経験"],
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
      rotation: -3
    },
    {
      role: "入社5年目 / 26歳 / リーダー",
      text: "リーダーでも定時で帰れます。給料は上がったけど、帰る時間は変わってません。メリハリつけて働けるのが最高です。",
      tags: ["#年収420万", "#ゲーム好き", "#キャリア"],
      img: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=600&auto=format&fit=crop",
      rotation: 2
    },
    {
      role: "入社3年目 / 34歳 / ママ",
      text: "子供の急な発熱でも、チャット一本で『お互い様！』と代わってくれる。ママさんスタッフが多いので、気兼ねなく働けています。",
      tags: ["#子育て応援", "#有給とりやすい"],
      img: "https://images.unsplash.com/photo-1558565736-d7607593c727?q=80&w=600&auto=format&fit=crop",
      rotation: -1
    }
  ];

  return (
    <SectionWrapper id="section-2" className="bg-[#E8B4A2]/5 rounded-[60px] my-12 py-32">
      <SectionTitle title="『介護士』である前に&#10;『自分』を楽しむ人たち。" subtitle="スタッフの声" englishDecor="Enjoy Life" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
        {staff.map((s, i) => (
          <motion.div 
            key={i}
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ delay: i * 0.2 }}
            className="relative"
            style={{ transform: `rotate(${s.rotation}deg)` }}
          >
            {/* Masking Tape */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#F2E2A6]/90 rotate-1 shadow-sm z-20 backdrop-blur-sm opacity-90" />
            
            <div className="bg-white p-5 pb-10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col transform hover:scale-105">
               <div className="aspect-square bg-gray-100 mb-6 overflow-hidden rounded-sm border border-gray-100">
                 <img src={s.img} alt={s.role} className="w-full h-full object-cover filter saturate-[0.8] hover:saturate-100 transition-all duration-700" />
               </div>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2 justify-center mb-4">
                 {s.tags.map((tag, tIndex) => (
                   <span key={tIndex} className="text-[10px] bg-[#F9F9F4] text-[#A8C9A3] px-3 py-1 rounded-full font-bold tracking-wide">
                     {tag}
                   </span>
                 ))}
               </div>

               <p className="font-accent text-lg font-bold text-center mb-4 text-[#4A4A4A]">{s.role}</p>
               <div className="flex-grow">
                 <p className="text-sm text-gray-500 leading-loose font-sans text-justify">{s.text}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// --- Q&A (Chat Style) ---
export const QandA: React.FC = () => {
    return (
        <SectionWrapper id="qa">
            <SectionTitle title="気になること&#10;こっそり教えます。" subtitle="よくある質問" englishDecor="FAQ" />
            <div className="max-w-3xl mx-auto space-y-8">
                {[
                    { q: "お局様（怖い先輩）っていますか？", a: "昔ながらの厳しい人はゼロではないですが、今は『チームケア』なので一人に理不尽に怒られることはありません。" },
                    { q: "夜勤中、本当に寝れてますか？", a: "寝てます（笑）。見守りセンサーがあるので、何もない時間は動画見たり仮眠したり。2時間は確実に休憩取れますよ。" },
                    { q: "有給って本当に希望日に取れる？", a: "先着順ですが、ほぼ通ります。『私用』って書いて出すだけでOKです。" }
                ].map((item, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex flex-col gap-3"
                    >
                         {/* Question */}
                         <div className="flex gap-4 items-end">
                            <div className="w-10 h-10 rounded-full bg-[#E8B4A2] flex items-center justify-center text-white font-bold shrink-0 shadow-sm">Q</div>
                            <div className="bg-white px-6 py-4 rounded-[20px] rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] relative">
                                <p className="text-base font-bold text-[#4A4A4A]">{item.q}</p>
                            </div>
                         </div>
                         {/* Answer */}
                         <div className="flex gap-4 items-end flex-row-reverse">
                             <div className="w-10 h-10 rounded-full bg-[#A8C9A3] flex items-center justify-center text-white font-bold shrink-0 shadow-sm">A</div>
                             <div className="bg-[#F9F9F4] px-6 py-4 rounded-[20px] rounded-br-none max-w-[85%] border border-[#A8C9A3]/20">
                                 <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                             </div>
                         </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    )
}

// --- Salary Section ---
export const Salary: React.FC = () => {
  return (
    <SectionWrapper id="salary">
      <SectionTitle title="頑張りをなんとなくで&#10;評価しません。" subtitle="給与・キャリア" englishDecor="Career Path" />
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Salary Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Year 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-[#F9F9F4] relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="bg-[#A8C9A3]/10 text-[#5f7a5c] px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest">
              入社1年目 / 22歳
            </div>
            <div className="mb-2 text-sm text-gray-400 font-bold">未経験スタート</div>
            <div className="text-4xl font-bold text-[#4A4A4A] mb-2 font-accent">
              <span className="particle-text">年収</span> 360<span className="particle-text">万円</span>
            </div>
            <p className="text-xs text-gray-400">月給 24.5万円 〜 + 賞与</p>
          </motion.div>

          {/* Year 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[40px] shadow-lg border-2 border-[#E8B4A2]/30 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute top-4 right-4 text-[#E8B4A2] animate-bounce">
                <Sparkles size={24} />
            </div>
            <div className="bg-[#E8B4A2]/10 text-[#b57f6d] px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest">
              入社3年目 / 25歳
            </div>
            <div className="mb-2 text-sm text-gray-400 font-bold">リーダー職</div>
            <div className="text-5xl font-bold text-[#E8B4A2] mb-2 font-accent">
              <span className="text-lg text-[#4A4A4A] particle-text">年収</span> 420<span className="text-lg text-[#4A4A4A] particle-text">万円</span>
            </div>
            <p className="text-xs text-gray-400">月給 28万円 〜 + 賞与 + 役職手当</p>
          </motion.div>
        </div>

        {/* Career Path */}
        <div className="bg-[#F9F9F4] rounded-[40px] p-8 md:p-12 border border-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8C9A3] opacity-10 rounded-full blur-3xl" />
           
           <h3 className="text-center text-xl font-bold text-[#4A4A4A] mb-8 font-accent">
             安心して成長できる環境
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mentor */}
              <div className="flex gap-5 items-start bg-white p-6 rounded-3xl shadow-sm">
                  <div className="bg-[#A8C9A3]/20 p-4 rounded-2xl text-[#5f7a5c]">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A4A4A] mb-2">メンター制度</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">入社後3ヶ月は専属の先輩がサポート。一人で悩ませません。</p>
                  </div>
              </div>

              {/* Qualification */}
              <div className="flex gap-5 items-start bg-white p-6 rounded-3xl shadow-sm">
                  <div className="bg-[#E8B4A2]/20 p-4 rounded-2xl text-[#b57f6d]">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A4A4A] mb-2">資格取得支援</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">費用は全額会社負担。働きながらスキルアップできます。</p>
                  </div>
              </div>
           </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

// --- Requirements (Clean Table) ---
export const Requirements: React.FC = () => {
  return (
    <SectionWrapper id="section-3">
       <SectionTitle title="募集要項" subtitle="募集要項" englishDecor="Check it out!" />
       <div className="max-w-4xl mx-auto bg-white rounded-[30px] overflow-hidden shadow-sm border border-[#F9F9F4]">
          {[
              { l: "職種", v: "介護職員（正社員）" },
              { l: "応募資格", v: "【無資格・未経験OK】人柄重視です" },
              { l: "勤務地", v: "〇〇県〇〇市（車通勤OK）" },
              { l: "給与", v: "月給 245,000円 〜 320,000円" },
              { l: "勤務時間", v: "シフト制（残業月3h程度）" },
              { l: "休日", v: "年間休日115日（完全週休2日）" },
          ].map((row, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-[#F9F9F4] last:border-0 hover:bg-[#F9F9F4]/30 transition-colors group">
                  <div className="w-full md:w-1/3 p-5 md:p-8 font-bold text-[#A8C9A3] flex items-center gap-3 bg-[#F9F9F4]/30 group-hover:bg-[#F9F9F4]/60 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#A8C9A3]" />
                      {row.l}
                  </div>
                  <div className="w-full md:w-2/3 p-5 md:p-8 text-[#4A4A4A] font-medium leading-relaxed">
                      {row.v}
                  </div>
              </div>
          ))}
       </div>
    </SectionWrapper>
  );
};

// --- Flow (Sugoroku Style) ---
export const Flow: React.FC = () => {
  return (
    <SectionWrapper id="flow" className="bg-white">
      <SectionTitle title="LINEひとつで&#10;見学からスタート。" subtitle="選考フロー" englishDecor="Easy Step" />
      
      <div className="max-w-4xl mx-auto relative py-12">
        {/* Curved Path (SVG) */}
        <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full hidden md:block pointer-events-none opacity-20" viewBox="0 0 400 600" fill="none">
             <path d="M200 50 Q 350 150 200 250 Q 50 350 200 450" stroke="#A8C9A3" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
        </svg>

        <div className="space-y-16 relative z-10">
           {[
               { t: "LINE友だち追加", d: "3秒で完了！", icon: <Smartphone /> },
               { t: "カジュアル面談・見学", d: "履歴書不要・私服でOK", icon: <Coffee /> },
               { t: "面接", d: "条件すり合わせ", icon: <Smile /> },
               { t: "内定", d: "一緒にお仕事しましょう！", icon: <Heart /> },
           ].map((step, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
               >
                   <div className="w-20 h-20 rounded-full bg-white border-4 border-[#A8C9A3] flex items-center justify-center text-[#A8C9A3] z-10 shadow-lg font-bold text-2xl relative">
                       {i+1}
                       {/* Connection Dot */}
                       {i < 3 && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-6 bg-[#A8C9A3] md:hidden opacity-30"></div>}
                   </div>
                   <div className="bg-white p-8 rounded-[30px] shadow-xl border border-[#F9F9F4] w-72 text-center relative group hover:-translate-y-2 transition-transform duration-300">
                       <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#E8B4A2] bg-white p-2 rounded-full shadow-sm">
                           {step.icon}
                       </div>
                       <h3 className="font-bold text-[#4A4A4A] mb-2 mt-4 text-lg">{step.t}</h3>
                       <p className="text-xs text-gray-500 font-bold">{step.d}</p>
                   </div>
               </motion.div>
           ))}
        </div>
      </div>
    </SectionWrapper>
  );
};