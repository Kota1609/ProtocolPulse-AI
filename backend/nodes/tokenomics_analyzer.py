import logging
from typing import Dict, Any, Optional, List
import requests
import json

logger = logging.getLogger(__name__)

class TokenomicsAnalyzer:
    """
    Agent node responsible for analyzing tokenomics data for a protocol.
    """
    
    def __init__(self):
        logger.info("Initialized TokenomicsAnalyzer")
    
    async def run(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Process the state and perform tokenomics analysis"""
        logger.info("Running TokenomicsAnalyzer")
        
        # Extract protocol name from state
        protocol_name = state.get("protocol") or state.get("company")
        if not protocol_name:
            logger.warning("No protocol name found in state")
            return {
                **state,
                "tokenomics_data": {},
                "error": "No protocol name provided for tokenomics analysis"
            }
        
        # Send status update if websocket_manager is available
        websocket_manager = state.get("websocket_manager")
        job_id = state.get("job_id")
        
        if websocket_manager and job_id:
            await websocket_manager.send_status_update(
                job_id=job_id,
                status="processing",
                message=f"Analyzing tokenomics for {protocol_name}",
                result={
                    "step": "TokenomicsAnalyzer",
                    "protocol": protocol_name
                }
            )
        
        try:
            # Get token data from CoinGecko
            token_data = await self._get_token_data(protocol_name)
            
            # Get token distribution from various sources
            token_distribution = await self._get_token_distribution(protocol_name)
            
            # Get token utility information
            token_utility = await self._get_token_utility(protocol_name)
            
            # Combine all tokenomics data
            tokenomics_data = {
                "protocol_name": protocol_name,
                "token_data": token_data,
                "token_distribution": token_distribution,
                "token_utility": token_utility,
                "risk_assessment": self._assess_tokenomics_risks(token_data, token_distribution)
            }
            
            return {
                **state,
                "tokenomics_data": tokenomics_data
            }
            
        except Exception as e:
            logger.error(f"Error in TokenomicsAnalyzer: {e}")
            return {
                **state,
                "tokenomics_data": {},
                "error": f"Failed to analyze tokenomics data: {str(e)}"
            }
    
    async def _get_token_data(self, protocol_name: str) -> Dict[str, Any]:
        """Get basic token data from CoinGecko"""
        try:
            # Search for token on CoinGecko
            search_url = f"https://api.coingecko.com/api/v3/search?query={protocol_name}"
            search_response = requests.get(search_url)
            
            if search_response.status_code != 200:
                logger.warning(f"Failed to search for token: {search_response.status_code}")
                return {}
            
            search_data = search_response.json()
            coins = search_data.get("coins", [])
            
            if not coins:
                logger.warning(f"No coins found for {protocol_name}")
                return {}
            
            # Get the first matching coin
            coin_id = coins[0].get("id")
            
            # Get detailed coin data
            coin_url = f"https://api.coingecko.com/api/v3/coins/{coin_id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false"
            coin_response = requests.get(coin_url)
            
            if coin_response.status_code != 200:
                logger.warning(f"Failed to get coin data: {coin_response.status_code}")
                return {}
            
            coin_data = coin_response.json()
            
            # Extract relevant token data
            market_data = coin_data.get("market_data", {})
            community_data = coin_data.get("community_data", {})
            
            return {
                "name": coin_data.get("name", ""),
                "symbol": coin_data.get("symbol", "").upper(),
                "current_price": market_data.get("current_price", {}).get("usd", 0),
                "market_cap": market_data.get("market_cap", {}).get("usd", 0),
                "fully_diluted_valuation": market_data.get("fully_diluted_valuation", {}).get("usd", 0),
                "circulating_supply": market_data.get("circulating_supply", 0),
                "total_supply": market_data.get("total_supply", 0),
                "max_supply": market_data.get("max_supply", 0),
                "price_change_24h_percent": market_data.get("price_change_percentage_24h", 0),
                "price_change_7d_percent": market_data.get("price_change_percentage_7d", 0),
                "price_change_30d_percent": market_data.get("price_change_percentage_30d", 0),
                "community_score": community_data.get("community_score", 0),
                "liquidity_score": community_data.get("liquidity_score", 0),
                "sentiment_votes_up_percentage": community_data.get("sentiment_votes_up_percentage", 0),
                "description": coin_data.get("description", {}).get("en", "")
            }
        except Exception as e:
            logger.error(f"Error getting token data: {e}")
            return {}
    
    async def _get_token_distribution(self, protocol_name: str) -> Dict[str, Any]:
        """Get token distribution data"""
        # Note: This would ideally come from on-chain analysis or a specialized API
        # For demonstration, we'll return a placeholder with common distribution categories
        return {
            "team_allocation": {
                "percentage": None,  # Would be populated from real data
                "vesting_period": None,
                "cliff_period": None
            },
            "investors": {
                "percentage": None,
                "vesting_period": None
            },
            "community": {
                "percentage": None
            },
            "ecosystem_growth": {
                "percentage": None
            },
            "liquidity_mining": {
                "percentage": None
            },
            "treasury": {
                "percentage": None
            }
        }
    
    async def _get_token_utility(self, protocol_name: str) -> List[Dict[str, str]]:
        """Get token utility information"""
        # This would typically involve analysis of protocol documentation
        # For demonstration, we'll return common utility categories for DeFi tokens
        return [
            {
                "type": "governance",
                "description": "Voting rights on protocol governance proposals"
            },
            {
                "type": "staking",
                "description": "Ability to stake tokens for protocol security and rewards"
            },
            {
                "type": "fees",
                "description": "Token holders may receive a portion of protocol fees"
            },
            {
                "type": "access",
                "description": "Tokens may provide access to specific protocol features"
            }
        ]
    
    def _assess_tokenomics_risks(self, token_data: Dict[str, Any], distribution: Dict[str, Any]) -> List[Dict[str, str]]:
        """Assess risks based on tokenomics data"""
        risks = []
        
        # Check for supply concentration risks
        circulating_supply = token_data.get("circulating_supply", 0)
        total_supply = token_data.get("total_supply", 0)
        
        if total_supply and circulating_supply:
            circulating_ratio = (circulating_supply / total_supply) * 100
            
            if circulating_ratio < 30:
                risks.append({
                    "type": "supply_concentration",
                    "description": f"Only {circulating_ratio:.1f}% of total supply is in circulation, which may indicate high concentration with team/investors"
                })
        
        # Check for inflation risks
        max_supply = token_data.get("max_supply")
        if max_supply is None or max_supply == 0:
            risks.append({
                "type": "inflation",
                "description": "No maximum supply is defined, which may lead to inflationary token economics"
            })
        
        # Add more sophisticated risk analysis as needed
        
        return risks 