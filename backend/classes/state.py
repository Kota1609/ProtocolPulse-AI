from typing import TypedDict, Dict, List, Any, Annotated
from typing_extensions import NotRequired, Required
from backend.services.websocket_manager import WebSocketManager

#Define the input state
class InputState(TypedDict, total=False):
    company: Annotated[str, "company_name"]
    company_url: NotRequired[str]
    hq_location: NotRequired[str]
    industry: NotRequired[str]
    websocket_manager: NotRequired[WebSocketManager]
    job_id: NotRequired[str]
    protocol: Annotated[str, "protocol_name"]

class ResearchState(InputState):
    site_scrape: Dict[str, Any]
    messages: List[Any]
    financial_data: Annotated[Dict[str, Any], "financial_data"]
    news_data: Annotated[Dict[str, Any], "news_data"]
    industry_data: Annotated[Dict[str, Any], "industry_data"]
    company_data: Annotated[Dict[str, Any], "company_data"]
    blockchain_data: Annotated[Dict[str, Any], "blockchain_data"]
    tokenomics_data: Annotated[Dict[str, Any], "tokenomics_data"]
    curated_financial_data: Dict[str, Any]
    curated_news_data: Dict[str, Any]
    curated_industry_data: Dict[str, Any]
    curated_company_data: Dict[str, Any]
    financial_briefing: str
    news_briefing: str
    industry_briefing: str
    company_briefing: str
    blockchain_briefing: str
    tokenomics_briefing: str
    references: List[str]
    briefings: Dict[str, Any]
    report: str