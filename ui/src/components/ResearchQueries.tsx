import React from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { ResearchQueriesProps } from "../types";

const ResearchQueries: React.FC<ResearchQueriesProps> = ({
  queries,
  streamingQueries,
  isExpanded,
  onToggleExpand,
  isResetting,
  glassStyle,
}) => {
  const glassCardStyle = `${glassStyle} rounded-2xl p-6`;
  const fadeInAnimation = "transition-all duration-300 ease-in-out";

  // Only show categories that have data
  const activeCategories = ["company", "industry", "financial", "news"].filter(
    (category) => {
      const hasStreamingQueries = Object.keys(streamingQueries).some((key) =>
        key.startsWith(category)
      );
      const hasCompletedQueries = queries.some((q) =>
        q.category.startsWith(category)
      );
      return hasStreamingQueries || hasCompletedQueries;
    }
  );

  // If no categories have data, don't render the component
  if (activeCategories.length === 0 && queries.length === 0) {
    return null;
  }

  return (
    <div
      className={`${glassCardStyle} ${fadeInAnimation} ${
        isResetting
          ? "opacity-0 transform -translate-y-4"
          : "opacity-100 transform translate-y-0"
      } font-['DM_Sans']`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Research Information Sources
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCategories.map((category) => {
            const streamingCategoryQueries = Object.entries(
              streamingQueries
            ).filter(([key]) => key.startsWith(category));

            const completedCategoryQueries = queries.filter((q) =>
              q.category.startsWith(category)
            );

            // If no queries in this category, don't render it
            if (
              streamingCategoryQueries.length === 0 &&
              completedCategoryQueries.length === 0
            ) {
              return null;
            }

            return (
              <div key={category} className={`${glassStyle} rounded-xl p-3`}>
                <h3 className="text-base font-medium text-gray-900 mb-3 capitalize">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Sources
                </h3>
                <div className="space-y-2">
                  {/* Show streaming queries first */}
                  {streamingCategoryQueries.map(([key, query]) => (
                    <div
                      key={key}
                      className="backdrop-filter backdrop-blur-lg bg-white/80 border border-[#468BFF]/30 rounded-lg p-2"
                    >
                      <span className="text-gray-600">{query.text}</span>
                      <span className="animate-pulse ml-1 text-[#8FBCFA]">
                        |
                      </span>
                    </div>
                  ))}
                  {/* Then show completed queries */}
                  {completedCategoryQueries.map((query, idx) => (
                    <div
                      key={idx}
                      className="backdrop-filter backdrop-blur-lg bg-white/80 border border-gray-200 rounded-lg p-2"
                    >
                      <span className="text-gray-600">{query.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isExpanded && (
        <div className="mt-2 text-sm text-gray-600">
          {queries.length > 0 ? (
            `${queries.length} information sources analyzed for this report`
          ) : (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-3 w-3 mr-2 text-[#468BFF]/60" />
              <span>Gathering research sources...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResearchQueries;
