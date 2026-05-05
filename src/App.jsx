import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Screens } from './components/Screens';
import { SlackIntegration } from './components/SlackIntegration';
import { Integrations } from './components/Integrations';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PageShell } from './components/PageShell';

function App() {
  return (
    <PageShell>
      <Navbar />
      <main>
        <Hero />
        <Screens />
        <SlackIntegration />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </PageShell>
  );
}

export default App;
