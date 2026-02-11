import React from 'react';
import { Header, FloatingCTA, Footer } from './components/Layout';
import { 
  Hero, 
  Intro, 
  Numbers, 
  RealWork, 
  Staff, 
  QandA, 
  Salary, 
  Requirements, 
  Flow 
} from './components/Sections';
import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Global Noise Overlay for Texture */}
      <div className="noise-overlay" />
      
      <Header />
      
      <main>
        <Hero />
        <Intro />
        <Numbers />
        <RealWork />
        <Staff />
        <QandA />
        <Salary />
        <Requirements />
        <Flow />
      </main>

      <Footer />
      <FloatingCTA />
      <ChatBot />
    </div>
  );
};

export default App;