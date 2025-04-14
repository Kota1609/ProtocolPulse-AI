import logging
from typing import Dict, Any, Optional, List
import json

from ..services.blockchain_service import BlockchainService

logger = logging.getLogger(__name__)

class BlockchainAnalyzer:
    """
    Agent node responsible for analyzing blockchain and DeFi protocol data.
    """
    
    def __init__(self):
        self.blockchain_service = BlockchainService()
        logger.info("Initialized BlockchainAnalyzer")
    
    async def run(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Process the state and perform blockchain analysis"""
        logger.info("Running BlockchainAnalyzer")
        
        # Extract protocol name from state
        protocol_name = state.get("protocol") or state.get("company")
        if not protocol_name:
            logger.warning("No protocol name found in state")
            return {
                **state,
                "blockchain_data": {},
                "error": "No protocol name provided for blockchain analysis"
            }
        
        # Send status update if websocket_manager is available
        websocket_manager = state.get("websocket_manager")
        job_id = state.get("job_id")
        
        if websocket_manager and job_id:
            await websocket_manager.send_status_update(
                job_id=job_id,
                status="processing",
                message=f"Analyzing blockchain data for {protocol_name}",
                result={
                    "step": "BlockchainAnalyzer",
                    "protocol": protocol_name
                }
            )
        
        # Get DeFi metrics
        try:
            defi_metrics = await self.blockchain_service.get_defi_metrics(protocol_name)
            
            # Extract relevant blockchain data for the report
            blockchain_data = {
                "protocol_name": protocol_name,
                "defi_metrics": defi_metrics
            }
            
            # Extract token info if available
            if token_info := defi_metrics.get("token_info"):
                blockchain_data["token"] = {
                    "name": token_info.get("name"),
                    "symbol": token_info.get("symbol"),
                    "total_supply": token_info.get("total_supply"),
                    "market_data": token_info.get("market_data")
                }
            
            # Extract TVL data if available
            if tvl_data := defi_metrics.get("tvl_data"):
                blockchain_data["tvl"] = {
                    "current_tvl": tvl_data.get("tvl"),
                    "chains": tvl_data.get("chains")
                }
                
                # Calculate TVL trend if history is available
                tvl_history = tvl_data.get("tvl_history", [])
                if len(tvl_history) >= 2:
                    first_value = tvl_history[0].get("totalLiquidityUSD", 0)
                    last_value = tvl_history[-1].get("totalLiquidityUSD", 0)
                    
                    if first_value > 0:
                        percent_change = ((last_value - first_value) / first_value) * 100
                        blockchain_data["tvl"]["trend_30d"] = {
                            "percent_change": round(percent_change, 2),
                            "direction": "up" if percent_change > 0 else "down"
                        }
            
            # Extract governance data if available
            if governance_data := defi_metrics.get("governance_data"):
                blockchain_data["governance"] = {
                    "recent_proposals": len(governance_data),
                    "proposals": governance_data[:5]  # Limit to 5 most recent proposals
                }
            
            # Get insights about the protocol
            blockchain_data["insights"] = self._generate_insights(defi_metrics)
            
            # Add blockchain data to state
            return {
                **state,
                "blockchain_data": blockchain_data
            }
            
        except Exception as e:
            logger.error(f"Error in BlockchainAnalyzer: {e}")
            return {
                **state,
                "blockchain_data": {},
                "error": f"Failed to analyze blockchain data: {str(e)}"
            }
    
    def _generate_insights(self, defi_metrics: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate insights from the DeFi metrics data"""
        insights = []
        
        # Check if we have protocol info
        protocol_info = defi_metrics.get("protocol_info", {})
        if protocol_info:
            # Add insight about protocol category
            if category := protocol_info.get("category"):
                insights.append({
                    "type": "category",
                    "insight": f"Protocol operates in the {category} category of DeFi."
                })
            
            # Add insight about supported chains
            if chains := protocol_info.get("chains", []):
                chain_str = ", ".join(chains[:5])
                if len(chains) > 5:
                    chain_str += f", and {len(chains) - 5} more"
                insights.append({
                    "type": "multichain",
                    "insight": f"Protocol operates on multiple chains: {chain_str}."
                })
        
        # Add TVL insights
        tvl_data = defi_metrics.get("tvl_data", {})
        if tvl := tvl_data.get("tvl"):
            # Format TVL in billions/millions/thousands for readability
            formatted_tvl = self._format_currency(tvl)
            insights.append({
                "type": "tvl",
                "insight": f"Current Total Value Locked (TVL): {formatted_tvl}."
            })
        
        # Add token insights
        token_info = defi_metrics.get("token_info", {})
        if token_info:
            # Add insight about market cap if available
            market_data = token_info.get("market_data", {})
            if market_cap := market_data.get("market_cap", {}).get("usd"):
                formatted_mcap = self._format_currency(market_cap)
                insights.append({
                    "type": "market_cap",
                    "insight": f"Token market capitalization: {formatted_mcap}."
                })
        
        # Add governance insights
        governance_data = defi_metrics.get("governance_data", [])
        if governance_data:
            # Count active proposals
            active_proposals = sum(1 for p in governance_data if p.get("state") == "active")
            if active_proposals > 0:
                insights.append({
                    "type": "governance",
                    "insight": f"Protocol has {active_proposals} active governance proposals."
                })
        
        return insights
    
    def _format_currency(self, value: float) -> str:
        """Format a currency value in a human-readable format"""
        if value >= 1_000_000_000:
            return f"${value / 1_000_000_000:.2f}B"
        elif value >= 1_000_000:
            return f"${value / 1_000_000:.2f}M"
        elif value >= 1_000:
            return f"${value / 1_000:.2f}K"
        else:
            return f"${value:.2f}" 