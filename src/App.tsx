import GlobalStyle from "./GlobalStyle";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { AboutMe } from "./sections/AboutMe";
import { ConfigSetup } from "./sections/ConfigSetup";
import { SkillsTech } from "./sections/SkillsTech";
import { CodingActivity } from "./sections/CodingActivity";
import { Experience } from "./sections/Experience";
import { Project } from "./sections/Project";
import { CourseworkCertifications } from "./sections/CourseworkCertifications";
import { ContactFooter } from "./sections/ContactFooter";

function App() {
  return (
    <>
      <GlobalStyle />
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <main id="content">
        <HeroSection />
        <Project />
        <AboutMe />
        <ConfigSetup />
        <SkillsTech />
        <CodingActivity />
        <Experience />
        <CourseworkCertifications />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
