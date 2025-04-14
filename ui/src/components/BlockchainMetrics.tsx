import React from "react";

interface BlockchainMetricsProps {
  protocolName: string;
  tvl?: {
    current_tvl: number;
    trend_30d?: {
      percent_change: number;
      direction: string;
    };
  };
  token?: {
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
  };
  governance?: {
    recent_proposals: number;
  };
}

const BlockchainMetrics: React.FC<BlockchainMetricsProps> = ({
  protocolName,
  tvl,
  token,
  governance,
}) => {
  // Format currency
  const formatCurrency = (value: number | undefined): string => {
    if (!value) return "$0";

    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {protocolName} Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TVL Card */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Total Value Locked
          </h3>
          <div className="text-3xl font-bold text-blue-900">
            {formatCurrency(tvl?.current_tvl)}
          </div>
          {tvl?.trend_30d && (
            <div
              className={`flex items-center mt-2 text-sm ${
                tvl.trend_30d.direction === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <span>
                {tvl.trend_30d.direction === "up" ? "↑" : "↓"}
                {Math.abs(tvl.trend_30d.percent_change).toFixed(2)}% (30d)
              </span>
            </div>
          )}
        </div>

        {/* Token Card */}
        {token && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              {token.symbol} Token
            </h3>
            <div className="flex flex-col">
              <div className="mb-1">
                <span className="text-sm text-purple-700">Price:</span>
                <span className="text-lg font-bold ml-2 text-purple-900">
                  ${token.current_price?.toFixed(2) || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm text-purple-700">Market Cap:</span>
                <span className="text-lg font-bold ml-2 text-purple-900">
                  {formatCurrency(token.market_cap)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Governance Card */}
        {governance && (
          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Governance
            </h3>
            <div className="text-3xl font-bold text-amber-900">
              {governance.recent_proposals || 0}
            </div>
            <div className="text-sm text-amber-700 mt-1">Recent proposals</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainMetrics;
