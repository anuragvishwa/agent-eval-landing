import { useEffect } from 'react'
import BeforeAfter from './components/BeforeAfter.jsx'
import Capabilities from './components/Capabilities.jsx'
import DemoPreview from './components/DemoPreview.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Integrations from './components/Integrations.jsx'
import Nav from './components/Nav.jsx'
import Problem from './components/Problem.jsx'
import Security from './components/Security.jsx'
import UseCases from './components/UseCases.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

function App() {
  useScrollReveal()

  useEffect(() => {
    document.title = 'Lumniverse — FinOps + RCA for AI Agents'
    const desc =
      'Analyze production AI agent traces to detect wasted LLM calls, replace predictable steps with workflows, route tasks to cheaper models, and diagnose root causes when agents fail.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', desc)
  }, [])

  return (
    <div id="top" className="min-h-screen bg-white text-zinc-950">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <DemoPreview />
        <HowItWorks />
        <Capabilities />
        <UseCases />
        <BeforeAfter />
        <Integrations />
        <Security />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
