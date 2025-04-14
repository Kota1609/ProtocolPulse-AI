import React, { useState } from "react";
import { Github, Info, X } from "lucide-react";

interface HeaderProps {
  glassStyle: string;
}

const Header: React.FC<HeaderProps> = ({ glassStyle }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("Failed to load Tavily logo");
    console.log("Image path:", e.currentTarget.src);
    e.currentTarget.style.display = "none";
  };

  return (
    <header className="mb-8 relative">
      <div className="absolute top-0 right-0">
        <button
          onClick={() => setShowAboutModal(true)}
          className="flex items-center px-3 py-1.5 rounded text-sm font-medium bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <Info className="h-4 w-4 mr-1" />
          About
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 inline-block">
          ProtocolPulse AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive research reports on blockchain protocols and DeFi
          platforms. AI-powered analysis of tokenomics, governance, and
          ecosystem dynamics.
        </p>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className={`${glassStyle} bg-white/95 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                About ProtocolPulse AI
              </h2>
              <button
                onClick={() => setShowAboutModal(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Page 1: Overview */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  What is ProtocolPulse AI?
                </h3>
                <p className="text-gray-800">
                  ProtocolPulse AI is an advanced research tool that generates
                  comprehensive, structured analysis reports on blockchain
                  protocols and DeFi platforms. By leveraging the power of large
                  language models and specialized research agents, it automates
                  the collection, curation, and synthesis of information from
                  multiple sources to produce detailed protocol reports.
                </p>
                <p className="text-gray-800">
                  The application is designed to save hours of research time by
                  automatically gathering relevant information about protocol
                  mechanics, tokenomics, market position, on-chain activity,
                  risk factors, and future outlook—all compiled into a
                  well-structured professional report format.
                </p>
              </div>

              {/* Page 2: How It Works */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600">
                  How It Works
                </h3>
                <p className="text-gray-800">
                  ProtocolPulse AI follows a sophisticated multi-stage research
                  and analysis pipeline:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-800">
                  <li>
                    <strong>Information Collection:</strong> The app collects
                    data from multiple sources including protocol websites,
                    documentation, on-chain data, and news articles.
                  </li>
                  <li>
                    <strong>Data Curation:</strong> Specialized AI agents filter
                    and prioritize the most relevant and reliable information
                    for each section of the report.
                  </li>
                  <li>
                    <strong>Content Enrichment:</strong> The system enhances the
                    collected information with additional context and insights.
                  </li>
                  <li>
                    <strong>Section Briefings:</strong> Each research category
                    (protocol overview, tokenomics, market position, etc.) is
                    analyzed separately by specialized agents.
                  </li>
                  <li>
                    <strong>Report Compilation:</strong> A final editor agent
                    combines all briefings into a cohesive, well-structured
                    report, eliminating redundancies and ensuring consistency.
                  </li>
                </ol>
              </div>

              {/* Page 3: Technology Stack */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600">
                  Technology Stack
                </h3>
                <p className="text-gray-800">
                  ProtocolPulse AI is built on a modern technology stack:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>
                    <strong>Frontend:</strong> React with TypeScript, Tailwind
                    CSS for responsive UI
                  </li>
                  <li>
                    <strong>Backend:</strong> Python with FastAPI for
                    high-performance API endpoints
                  </li>
                  <li>
                    <strong>AI/ML:</strong> Integration with OpenAI and Google
                    Gemini models for different research tasks
                  </li>
                  <li>
                    <strong>Workflow Orchestration:</strong> LangGraph for
                    managing the complex research pipeline
                  </li>
                  <li>
                    <strong>Data Processing:</strong> Custom-built extraction
                    and curation services
                  </li>
                  <li>
                    <strong>Real-time Communication:</strong> WebSockets for
                    streaming research updates
                  </li>
                  <li>
                    <strong>Document Generation:</strong> PDF export
                    functionality for sharing reports
                  </li>
                </ul>
              </div>

              {/* Page 4: Use Cases */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600">
                  Use Cases & Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      For Investors
                    </h4>
                    <ul className="list-disc pl-6 text-gray-800 text-sm">
                      <li>Rapid due diligence on DeFi protocols</li>
                      <li>
                        Comparison of tokenomics across different projects
                      </li>
                      <li>Risk assessment before capital allocation</li>
                      <li>Monitoring protocol developments</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      For Researchers
                    </h4>
                    <ul className="list-disc pl-6 text-gray-800 text-sm">
                      <li>Accelerated data gathering for protocol analysis</li>
                      <li>Structured information for deeper investigations</li>
                      <li>Automated background research</li>
                      <li>Monitoring ecosystem trends</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      For Developers
                    </h4>
                    <ul className="list-disc pl-6 text-gray-800 text-sm">
                      <li>Understanding protocol architecture</li>
                      <li>Technical exploration of DeFi mechanics</li>
                      <li>Integration planning with existing protocols</li>
                      <li>Competitor analysis for new projects</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      For Protocols
                    </h4>
                    <ul className="list-disc pl-6 text-gray-800 text-sm">
                      <li>Comprehensive analysis of their own protocol</li>
                      <li>Competitive landscape assessment</li>
                      <li>Educational resource for their community</li>
                      <li>Market positioning insights</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Page 5: Future Roadmap */}
              <div className="space-y-4 pt-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-600">
                  Future Roadmap
                </h3>
                <p className="text-gray-800">
                  Our vision extends beyond current capabilities to provide even
                  more strategic value for crypto companies, protocols, and
                  investors:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">1</span>
                      Real-Time On-Chain Analytics Dashboard
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      Live TVL tracking, volume trends, and smart contract
                      interactions with predictive insights based on historical
                      patterns. This would provide decision-makers with instant
                      visibility into protocol performance and market movements.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">2</span>
                      Competitive Intelligence Platform
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      Automated monitoring of competitor protocols with
                      side-by-side comparisons of key metrics, governance
                      changes, and market positioning. Alerts when competitors
                      launch new features or experience significant TVL changes.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">3</span>
                      Governance Optimization Engine
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      AI-powered analysis of governance proposals across the
                      DeFi ecosystem with recommendations for optimizing
                      tokenomics, fee structures, and incentive mechanisms based
                      on successful patterns in similar protocols.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">4</span>
                      Security Risk Scanner
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      Proactive monitoring of smart contract vulnerabilities,
                      exploit patterns, and security incidents across similar
                      protocols with actionable security recommendations and
                      risk assessments.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">5</span>
                      Regulatory Intelligence System
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      Global monitoring of crypto regulatory developments with
                      jurisdiction-specific compliance recommendations and
                      impact analysis for protocol operations, providing
                      strategic guidance for regulatory adaptation.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-blue-600 mr-2 text-lg">6</span>
                      Liquidity Optimization Toolkit
                    </h4>
                    <p className="text-gray-700 mt-2 text-sm">
                      Advanced simulations for optimizing liquidity pools,
                      incentive structures, and yield strategies based on
                      AI-driven market analysis and user behavior patterns
                      across multiple chains.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-blue-100/50 p-3 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium">
                    Strategic Differentiation
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    ProtocolPulse AI aims to become the essential intelligence
                    platform for crypto companies by combining deep protocol
                    analysis with actionable insights, giving leadership teams
                    the data-driven clarity needed to make strategic decisions
                    in a rapidly evolving market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
