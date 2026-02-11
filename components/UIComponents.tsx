import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';

// --- Colors (Updated for "Life & Warmth") ---
export const Colors = {
  Ecru: '#F9F9F4',
  Charcoal: '#4A4A4A',
  Pistachio: '#A8C9A3',
  Terracotta: '#E8B4A2',
  Cream: '#F2E2A6',
  Paper: '#FFFFFF',
};

// --- Animations ---
export const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger for text
      delayChildren: 0.2,
    }
  }
};

const charVariants = {
    hidden: { opacity: 0, y: 15, rotate: 3 },
    visible: { 
        opacity: 1, 
        y: 0, 
        rotate: 0,
        transition: { 
            type: "spring", 
            damping: 12, 
            stiffness: 100 
        } 
    }
};

// --- New Components for "Good Design" Polish ---

// 1. StaggerText: Animates text character by character like water surfacing
export const StaggerText: React.FC<{ text: string | React.ReactNode; className?: string }> = ({ text, className = "" }) => {
    // If text is a string, split it. If it's ReactNode, we might need to wrap it differently.
    // For simplicity, this component handles simple strings or assumes children are manually handled if passed as nodes.
    // Here we focus on string splitting for the "Jump Rate" headers.
    
    if (typeof text !== 'string') {
        return <span className={className}>{text}</span>;
    }

    return (
        <motion.span 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className={`inline-block ${className}`}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={charVariants} className="inline-block origin-bottom">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// 2. InkLink: Navigation link with ink bleed effect
export const InkLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ href, children, className = "" }) => {
    return (
        <a href={href} className={`hover-ink-bleed relative group ${className}`}>
            {children}
            <span className="absolute bottom-0 left-0 w-full h-px bg-[#E8B4A2] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full opacity-70"></span>
        </a>
    );
};

// 3. Scroll Marker: Highlights text like a fluorescent marker when scrolled into view (with jitter)
export const ScrollMarker: React.FC<{ children: React.ReactNode; color?: string; delay?: number }> = ({ 
    children, 
    color = "#F2E2A6", // Default Cream
    delay = 0.2 
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className="relative inline-block mx-1 font-bold z-0">
            <span className="relative z-10">{children}</span>
            <motion.span 
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: delay, ease: "circOut" }}
                className="absolute bottom-1 left-0 h-3 -z-10 opacity-70 rounded-sm mix-blend-multiply marker-jitter"
                style={{ backgroundColor: color }}
            />
        </span>
    );
};

// 4. Parallax Item
export const ParallaxItem: React.FC<{ 
    children: React.ReactNode; 
    offset?: number; 
    className?: string 
}> = ({ children, offset = 50, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};

// --- Existing Components (Refined) ---

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`py-24 md:py-40 px-6 md:px-8 max-w-6xl mx-auto relative ${className}`}>
      {children}
    </section>
  );
};

export const SectionTitle: React.FC<{ 
    title: string; 
    subtitle?: string; 
    englishDecor?: string; // New: English Handwritten Decor
    align?: 'left' | 'center' 
}> = ({ 
  title, 
  subtitle,
  englishDecor,
  align = 'center' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref} 
      className={`mb-24 ${align === 'center' ? 'text-center' : 'text-left'} relative z-10`}
    >
      <div className="relative inline-block">
          {/* English Accents (Scrapbook Style) */}
          {englishDecor && (
            <motion.div 
                initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
                animate={isInView ? { opacity: 1, rotate: -10, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
                className={`absolute -top-12 md:-top-16 ${align === 'center' ? 'right-0 md:-right-32' : '-right-4'} font-script text-2xl md:text-3xl text-[#E8B4A2] z-0 whitespace-nowrap transform`}
            >
                {englishDecor}
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#E8B4A2] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 50 10 100 5" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
            </motion.div>
          )}

          {subtitle && (
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="inline-block relative mb-4"
            >
                {/* Tag Design */}
                <span className="relative z-10 block px-4 py-1 text-xs font-bold tracking-[0.2em] text-[#A8C9A3] bg-white border border-[#A8C9A3] rounded-full uppercase">
                    {subtitle}
                </span>
                <span className="absolute top-1 left-1 w-full h-full bg-[#A8C9A3] rounded-full -z-0 opacity-20"></span>
            </motion.div>
          )}
          
          <motion.h2 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-normal tracking-wide text-[#4A4A4A] font-accent relative z-10"
          >
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h2>
      </div>

       {/* Organic Underline (Animated) */}
       <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 100, opacity: 0.6 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`mt-6 h-2 bg-[#E8B4A2] rounded-full transform -rotate-1 ${align === 'center' ? 'mx-auto' : 'ml-0'}`} 
       />
    </div>
  );
};