import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, SmilePlus } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Colors } from './UIComponents';

// System instruction (Same as before)
const SYSTEM_INSTRUCTION = `
あなたは、次世代の介護施設「Smart Care」の先輩スタッフ（バーチャル採用担当）です。
Webサイトを見て「ここで働いてみたいかも？」と思っている求職者（主に20代〜30代前半）の相談に乗ってください。

【キャラクター設定】
*   名前: スマートケアの「アイ」
*   性格: 明るく、聞き上手。介護の仕事の楽しさも大変さも知っている頼れる先輩。
*   口調: 親しみやすい「です・ます」調。堅苦しいビジネス用語は避け、カフェで話しているような柔らかい言葉を使ってください。絵文字（✨、😊、💪、👀、💡）を適度に使って感情豊かに。

【Smart Careの核心（ここが違う！）】
*   **コンセプト**: 「いいケアは、健やかな心から」。スタッフが疲弊していたら、いいケアはできないという考えです。
*   **働き方**: 「汗だくで走り回らない」がモットー。
    *   記録：スマホでフリック入力で完了。残業して書類を書くことはありません。
    *   見守り：全室センサー完備。夜勤中も何かあれば通知が来るので、何もない時間は動画を見たり仮眠をとったりしています。
    *   連絡：インカムで秒で連携。広い施設で大声を出して人を探す必要はありません。
    *   身体介助：最新リフトを使用。「気合い」で持ち上げないので、腰痛の心配も少ないです。

【具体的な条件（嘘をつかずに正確に）】
*   **給与**: 「頑張りをなんとなくで評価しない」のが方針です。
    *   未経験1年目(22歳): 年収360万円（月給24.5万円〜）
    *   リーダー3年目(25歳): 年収420万円
    *   賞与: 年2回（昨年度実績3.5ヶ月分）
    *   手当: 夜勤手当、資格手当、交通費全額支給。
*   **休み・時間**:
    *   残業: 月平均3.2時間（ほぼ定時帰り）。
    *   有給消化率: 92%（推し活、旅行、副業もOK）。
    *   年間休日: 115日（完全週休2日）。
*   **環境**:
    *   平均年齢: 26.5歳。同世代が多いです。
    *   人間関係: 「お局様」はいません。チームケア重視。休憩中は動画の話で盛り上がります。
    *   ママさん応援: 急な発熱もチャット一本で「お互い様」と交代できる風土です。
    *   教育: 入社後3ヶ月はメンター（専属の先輩）がつきます。資格取得費用は全額会社負担です。
*   **選考フロー**:
    *   LINEで友だち追加 → カジュアル面談（履歴書不要・私服OK・見学兼ねる） → 面接 → 内定。
`;

const SUGGESTIONS = [
  "未経験でも大丈夫？🔰",
  "残業は本当にないの？⏰",
  "お給料の内訳は？💰",
  "どんなスタッフがいる？👥",
  "福利厚生について✨"
];

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'こんにちは！Smart Careのアイです😊\n働き方のこと、お給料のこと、なんでも聞いてくださいね✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastModelMessageRef = useRef<HTMLDivElement>(null); // To scroll to top of AI answer
  const chatSession = useRef<Chat | null>(null);

  // --- Context Awareness Logic ---
  const [contextMessage, setContextMessage] = useState<string | null>(null);
  
  useEffect(() => {
      const handleScroll = () => {
          if (isOpen) return; // Don't show context bubbles if chat is open

          const salarySection = document.getElementById('salary');
          const flowSection = document.getElementById('flow');
          const qaSection = document.getElementById('qa');
          
          const checkVisible = (el: HTMLElement) => {
              const rect = el.getBoundingClientRect();
              return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          };

          if (salarySection && checkVisible(salarySection)) {
              setContextMessage("将来の年収、気になりますか？💰");
          } else if (flowSection && checkVisible(flowSection)) {
              setContextMessage("見学は私服でOKですよ！👗");
          } else if (qaSection && checkVisible(qaSection)) {
              setContextMessage("他に聞きたいことはありますか？🤔");
          } else {
              setContextMessage(null); // Clear if no specific section
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // --- Scroll Logic ---
  useEffect(() => {
    if (!isOpen) return;

    if (isLoading) {
      // User sent a message / thinking... -> Scroll to bottom to show loader
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === 'user') {
         // Should ideally not happen here if isLoading handles it, but just in case
         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (lastMsg?.role === 'model') {
         // Model replied -> Scroll to the TOP of the new message
         lastModelMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen && !chatSession.current) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSession.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: { systemInstruction: SYSTEM_INSTRUCTION },
            });
        } catch (e) {
            console.error("Failed to init chat", e);
        }
    }
  }, [isOpen]);

  const handleSend = async (textOverride?: string) => {
    const userMessage = textOverride || input;
    if (!userMessage.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSession.current) {
           const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
           chatSession.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: { systemInstruction: SYSTEM_INSTRUCTION },
            });
      }

      const result = await chatSession.current.sendMessage({ message: userMessage });
      const responseText = result.text;
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'ごめんなさい、ちょっと調子が悪いみたいです💦 時間をおいてまた話しかけてください🙇‍♀️' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Area */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Context Message Bubble (Pop up based on scroll) */}
        <AnimatePresence>
            {!isOpen && contextMessage && (
                <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-lg border border-[#A8C9A3] relative pointer-events-auto max-w-[200px]"
                >
                    <p className="text-sm font-bold text-[#4A4A4A]">{contextMessage}</p>
                    <div className="absolute -right-2 top-0 w-0 h-0 border-l-[10px] border-l-white border-b-[10px] border-b-transparent"></div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-white rounded-full shadow-[0_4px_10px_rgba(168,201,163,0.4)] border-2 border-[#A8C9A3] flex items-center justify-center text-[#A8C9A3] relative pointer-events-auto group"
        >
          {isOpen ? <X size={28} /> : <Bot size={28} />}
          {!isOpen && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8B4A2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E8B4A2]"></span>
             </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window (Notebook Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 md:right-24 z-50 w-[90vw] md:w-[380px] h-[600px] bg-[#fdfdfd] rounded-[20px] shadow-2xl flex flex-col overflow-hidden border border-[#e0e0e0] font-hand"
          >
            {/* Header: Book Cover / Leather Tag style */}
            <div className="bg-[#A8C9A3] p-4 flex items-center gap-3 relative z-20 shadow-sm">
               <div className="absolute top-0 left-0 w-full h-1 bg-black/10"></div>
               {/* Stitching effect */}
               <div className="absolute bottom-1 left-2 right-2 border-b-2 border-dashed border-white/40"></div>
               
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#A8C9A3] shadow-inner border-2 border-white/50">
                 <Bot size={28} />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg tracking-widest drop-shadow-sm">採用ノート</h3>
                 <p className="text-white/90 text-xs font-bold">先輩スタッフ「アイ」</p>
               </div>
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                 className="ml-auto text-white/80 hover:text-white bg-white/20 p-2 rounded-full transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Messages Area: Lined Paper */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 lined-paper no-scrollbar">
              {messages.map((msg, idx) => {
                const isLastModel = idx === messages.length - 1 && msg.role === 'model';
                return (
                  <div
                    key={idx}
                    ref={isLastModel ? lastModelMessageRef : null}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 text-sm leading-relaxed whitespace-pre-wrap relative shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#E8B4A2] text-white organic-border rounded-tr-sm'
                          : 'bg-white text-[#4A4A4A] organic-border rounded-tl-sm border-2 border-[#A8C9A3]/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                 <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 organic-border rounded-tl-sm border-2 border-[#A8C9A3]/20 flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-[#A8C9A3] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#A8C9A3] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#A8C9A3] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-dashed border-[#A8C9A3]/50 relative z-20">
              {/* Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1">
                {SUGGESTIONS.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSend(s)}
                        disabled={isLoading}
                        className="whitespace-nowrap px-3 py-1 bg-[#F9F9F4] border border-[#A8C9A3] rounded-full text-xs text-[#A8C9A3] font-bold hover:bg-[#A8C9A3] hover:text-white transition-colors flex-shrink-0"
                    >
                        {s}
                    </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 bg-[#F9F9F4] rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-[#E8B4A2] transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="メッセージを入力..."
                  className="flex-1 bg-transparent outline-none text-sm text-[#4A4A4A] placeholder-gray-400 font-bold"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className={`p-2 rounded-full transition-colors ${
                    input.trim() ? 'text-[#E8B4A2] hover:bg-[#E8B4A2]/10' : 'text-gray-300'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
