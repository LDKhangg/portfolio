import GlobalStyle from "./GlobalStyle";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import DarkVeil from "./components/DarkVeil";
import { AboutMe } from "./sections/AboutMe";
import { SkillsTech } from "./sections/SkillsTech";
import { Experience } from "./sections/Experience";
import { Project } from "./sections/Project";
import { CourseworkCertifications } from "./sections/CourseworkCertifications";
import { ContactFooter } from "./sections/ContactFooter";
import { useReducedMotion } from "./hooks/useReducedMotion";

function App() {
  const reduced = useReducedMotion();
  return (
    <>
      <GlobalStyle />
      {!reduced && (
        <DarkVeil
          className="veil"
          hueShift={20} // empirically tuned via screenshot sweep — 210 (spec's suggested value) renders amber/orange, 20 renders the intended navy/slate blue
          noiseIntensity={0.03}
          scanlineIntensity={0}
          warpAmount={0.08}
          speed={0.25}
        />
      )}
      <Navbar />
      <main>
        <HeroSection />
        <Project />
        <AboutMe />
        <SkillsTech />
        <Experience />
        <CourseworkCertifications />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
