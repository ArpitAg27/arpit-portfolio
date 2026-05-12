import { useEffect } from 'react';
import Topbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import CommandPalette from './components/ui/CommandPalette';

const RevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
      const inHero = el.closest('.masthead');
      if (inHero) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  return null;
};

function App() {
  return (
    <div className="page">
      <Topbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <RevealOnScroll />
    </div>
  );
}

export default App;
