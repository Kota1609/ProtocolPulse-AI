import React from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

type EnrichmentCounts = {
  company: { total: number; enriched: number };
  industry: { total: number; enriched: number };
  financial: { total: number; enriched: number };
  news: { total: number; enriched: number };
};

interface CurationExtractionProps {
  enrichmentCounts: EnrichmentCounts | undefined;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isResetting: boolean;
  loaderColor: string;
}

const CurationExtraction: React.FC<CurationExtractionProps> = ({
  enrichmentCounts,
  isExpanded,
  onToggleExpand,
  isResetting,
  loaderColor,
}) => {
  const glassStyle =
    "backdrop-filter backdrop-blur-lg bg-white/80 border border-gray-200 shadow-xl";
  const glassCardStyle = `${glassStyle} rounded-2xl p-6`;

  return (
    <div
      className={`${glassCardStyle} transition-all duration-300 ease-in-out ${
        isResetting
          ? "opacity-0 transform -translate-y-4"
          : "opacity-100 transform translate-y-0"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Data Collection Progress
        </h2>
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isExpanded ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-4 gap-4">
          {["company", "industry", "financial", "news"].map((category) => {
            const counts =
              enrichmentCounts?.[category as keyof EnrichmentCounts];
            const isLoading = !counts;

            return (
              <div
                key={category}
                className={`backdrop-blur-2xl bg-white/95 border ${
                  isLoading ? "border-gray-200/30" : "border-gray-200/50"
                } rounded-xl p-3 shadow-none ${
                  isLoading ? "animate-pulse" : ""
                }`}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                  {category}
                </h3>
                <div className="text-gray-900">
                  <div className="text-2xl font-bold mb-1">
                    {counts ? (
                      <span className="text-[#468BFF]">{counts.enriched}</span>
                    ) : (
                      <div className="h-6 flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 text-[#468BFF]/40" />
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {counts ? (
                      `selected from ${counts.total}`
                    ) : (
                      <div className="h-4 w-16 bg-gray-200/50 rounded"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isExpanded && (
        <div className="mt-2 text-sm text-gray-600">
          {enrichmentCounts ? (
            `${Object.values(enrichmentCounts).reduce(
              (acc, curr) => acc + curr.enriched,
              0
            )} documents processed from ${Object.values(
              enrichmentCounts
            ).reduce((acc, curr) => acc + curr.total, 0)} total`
          ) : (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-3 w-3 mr-2 text-[#468BFF]/60" />
              <span>Processing data sources...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurationExtraction;
