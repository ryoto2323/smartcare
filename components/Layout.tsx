import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Mail } from 'lucide-react';
import { Colors, InkLink } from './UIComponents';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Handwritten Style */}
        <a href="#" className="font-accent text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A4A] hover:opacity-70 transition-opacity">
          スマートケア
          <span className="text-[#A8C9A3] text-4xl leading-none">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-[#4A4A4A]">
          {['私たちについて', '働く環境', 'スタッフ', '募集要項'].map((item, i) => (
            <InkLink key={i} href={`#section-${i}`} className="py-2">
              {item}
            </InkLink>
          ))}
        </nav>

        {/* Mobile Menu Button - Sticker Style */}
        <button 
          className="md:hidden w-12 h-12 bg-[#F2E2A6] rounded-full flex items-center justify-center text-[#4A4A4A] shadow-md transform active:scale-95 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 bg-[#F9F9F4] z-40 flex flex-col justify-center items-center space-y-8 md:hidden"
          >
            <div className="absolute top-4 right-6 w-12 h-12" /> {/* Spacer for close button */}
            {['私たちについて', '働く環境', 'スタッフ', '募集要項'].map((item, i) => (
              <a 
                key={i} 
                href={`#section-${i}`} 
                onClick={() => setIsOpen(false)} 
                className="text-xl font-bold text-[#4A4A4A] relative inline-block"
              >
                {item}
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A8C9A3] opacity-30 -rotate-1 rounded-full -z-10" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const FloatingCTA: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <motion.a
        href="#flow"
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center bg-white text-[#4A4A4A] p-1 rounded-full shadow-lg border-2 border-[#E8B4A2]"
      >
        <div className="bg-[#E8B4A2] text-white w-12 h-12 rounded-full flex items-center justify-center">
            <Mail size={20} />
        </div>
        <div className="px-4 pr-6">
            <p className="text-[10px] text-[#A8C9A3] font-bold tracking-widest uppercase">お問い合わせ</p>
            <p className="text-sm font-bold">LINEで相談する？</p>
        </div>
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#A8C9A3] rounded-full border-2 border-white animate-bounce" />
      </motion.a>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#4A4A4A] py-16 px-6 border-t-4 border-[#A8C9A3] border-dashed relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center">
           <Heart className="text-[#E8B4A2] fill-[#E8B4A2]" size={32} />
        </div>
        <h2 className="font-accent text-2xl md:text-3xl mb-10 leading-relaxed">
          あなたの人生の主役は、<br/>あなた自身です。<br/>
          自分を犠牲にしない働き方を、ここから。
        </h2>
        
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center bg-[#A8C9A3] text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_4px_0_#86a684] hover:shadow-[0_2px_0_#86a684] hover:translate-y-[2px] transition-all"
        >
          LINEで友だち追加する
        </motion.a>
        
        <p className="mt-6 text-xs text-[#7FA1B5]">
          ※見学予約もこちらから<br/>
          電話もしつこい勧誘もしません。
        </p>
        
        <div className="mt-16 text-[10px] text-gray-400 tracking-widest">
          &copy; Smart Care.
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F2E2A6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E8B4A2] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
    </footer>
  );
};