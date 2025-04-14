from langchain_core.messages import SystemMessage
from langgraph.graph import StateGraph
from typing import Dict, Any, AsyncIterator
import logging

from .classes.state import InputState
from .nodes import GroundingNode
from .nodes.researchers import (FinancialAnalyst, NewsScanner, 
                               IndustryAnalyzer, CompanyAnalyzer)
from .nodes.blockchain_analyzer import BlockchainAnalyzer
from .nodes.tokenomics_analyzer import TokenomicsAnalyzer
from .nodes.collector import Collector
from .nodes.curator import Curator
from .nodes.enricher import Enricher
from .nodes.briefing import Briefing
from .nodes.editor import Editor

logger = logging.getLogger(__name__)

class Graph:
    def __init__(self, company=None, url=None, hq_location=None, industry=None,
                 websocket_manager=None, job_id=None):
        self.websocket_manager = websocket_manager
        self.job_id = job_id
        
        # Initialize InputState
        self.input_state = InputState(
            company=company,
            protocol=company,
            company_url=url,
            hq_location=hq_location,
            industry=industry,
            websocket_manager=websocket_manager,
            job_id=job_id,
            messages=[
                SystemMessage(content="Expert blockchain and DeFi protocol analyst starting investigation")
            ]
        )

        # Initialize nodes with WebSocket manager and job ID
        self._init_nodes()
        self._build_workflow()

    def _init_nodes(self):
        """Initialize all workflow nodes"""
        self.ground = GroundingNode()
        self.financial_analyst = FinancialAnalyst()
        self.news_scanner = NewsScanner()
        self.industry_analyst = IndustryAnalyzer()
        self.company_analyst = CompanyAnalyzer()
        self.blockchain_analyst = BlockchainAnalyzer()
        self.tokenomics_analyst = TokenomicsAnalyzer()
        self.collector = Collector()
        self.curator = Curator()
        self.enricher = Enricher()
        self.briefing = Briefing()
        self.editor = Editor()

    def _build_workflow(self):
        """Configure the state graph workflow"""
        # Create a simple sequential workflow
        workflow = StateGraph(InputState)
        
        # Add all nodes
        workflow.add_node("grounding", self.ground.run)
        workflow.add_node("company_analyst", self.company_analyst.run)
        workflow.add_node("industry_analyst", self.industry_analyst.run)
        workflow.add_node("financial_analyst", self.financial_analyst.run)
        workflow.add_node("news_scanner", self.news_scanner.run)
        workflow.add_node("collector", self.collector.run)
        workflow.add_node("curator", self.curator.run)
        workflow.add_node("enricher", self.enricher.run)
        workflow.add_node("briefing", self.briefing.run)
        workflow.add_node("editor", self.editor.run)
        
        # Define conditional logic to determine when all analysis is complete
        def all_analysis_complete(state):
            # Check if company, industry, financial, and news analysis are all complete
            required_keys = ["company_data", "industry_data", "financial_data", "news_data"]
            return all(key in state for key in required_keys)
        
        # Set up the flow with parallel execution of analysis nodes
        workflow.set_entry_point("grounding")
        
        # From grounding, fan out to all analyst nodes
        workflow.add_edge("grounding", "company_analyst")
        workflow.add_edge("grounding", "industry_analyst")
        workflow.add_edge("grounding", "financial_analyst")
        workflow.add_edge("grounding", "news_scanner")
        
        # Each analyst node goes to collector
        workflow.add_edge("company_analyst", "collector")
        workflow.add_edge("industry_analyst", "collector")
        workflow.add_edge("financial_analyst", "collector")
        workflow.add_edge("news_scanner", "collector")
        
        # Continue the sequential flow
        workflow.add_edge("collector", "curator")
        workflow.add_edge("curator", "enricher")
        workflow.add_edge("enricher", "briefing")
        workflow.add_edge("briefing", "editor")
        
        workflow.set_finish_point("editor")
        
        self.workflow = workflow

    async def run(self, thread: Dict[str, Any]) -> AsyncIterator[Dict[str, Any]]:
        """Execute the research workflow"""
        compiled_graph = self.workflow.compile()
        
        async for state in compiled_graph.astream(
            self.input_state,
            thread
        ):
            if self.websocket_manager and self.job_id:
                await self._handle_ws_update(state)
            yield state

    async def _handle_ws_update(self, state: Dict[str, Any]):
        """Handle WebSocket updates based on state changes"""
        update = {
            "type": "state_update",
            "data": {
                "current_node": state.get("current_node", "unknown"),
                "progress": state.get("progress", 0),
                "keys": list(state.keys())
            }
        }
        await self.websocket_manager.broadcast_to_job(
            self.job_id,
            update
        )
    
    def compile(self):
        graph = self.workflow.compile()
        return graph