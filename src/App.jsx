import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AccountabilityTrail } from './components/AccountabilityTrail';
import { Benchmarks } from './components/Benchmarks';
import { Capabilities } from './components/Capabilities';
import { FinOpsSection } from './components/FinOpsSection';
import { GraphSection } from './components/GraphSection';
import { FixesSection } from './components/FixesSection';
import { SandboxSection } from './components/SandboxSection';
import { IntegrationCode } from './components/IntegrationCode';
import { SlackIntegration } from './components/SlackIntegration';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PageShell } from './components/PageShell';

function App() {
  return (
    <PageShell>
      <Navbar />
      <main>
        <Hero />
        <AccountabilityTrail />
        <Benchmarks />
        <Capabilities />
        <FinOpsSection />
        <GraphSection />
        <FixesSection />
        <SandboxSection />
        <IntegrationCode />
        <SlackIntegration />
        <CTA />
      </main>
      <Footer />
    </PageShell>
  );
}

export default App;
