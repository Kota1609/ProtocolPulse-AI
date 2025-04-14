import React, { useState } from "react";
import { GlassStyle } from "../types";
import { Zap, Shuffle } from "lucide-react";
import { EXAMPLE_COMPANIES } from "./ExamplePopup";

interface ProtocolFormProps {
  onSubmit: (formData: {
    companyName: string; // Keep compatible prop names
    companyUrl: string; // for backward compatibility
    companyHq: string; // with existing code
    companyIndustry: string;
  }) => void;
  isResearching: boolean;
  glassStyle: GlassStyle;
  loaderColor: string;
}

const ProtocolForm: React.FC<ProtocolFormProps> = ({
  onSubmit,
  isResearching,
  glassStyle,
  loaderColor,
}) => {
  const [protocolName, setProtocolName] = useState("");
  const [protocolUrl, setProtocolUrl] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [category, setCategory] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      companyName: protocolName, // Keep compatible prop names
      companyUrl: protocolUrl, // for backward compatibility
      companyHq: blockchain, // with existing code
      companyIndustry: category,
    });
  };

  // Function to fill form with random example
  const fillRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_COMPANIES.length);
    const example = EXAMPLE_COMPANIES[randomIndex];
    fillWithExample(example);
  };

  // Function to fill form with specific example
  const fillWithExample = (example: (typeof EXAMPLE_COMPANIES)[0]) => {
    setProtocolName(example.name);
    setProtocolUrl(example.url);
    setBlockchain(example.hq);
    setCategory(example.industry);
  };

  // Find specific protocols
  const findProtocol = (name: string) => {
    return (
      EXAMPLE_COMPANIES.find((protocol) => protocol.name === name) ||
      EXAMPLE_COMPANIES[0]
    );
  };

  // List of common blockchains
  const blockchains = [
    "Ethereum",
    "Solana",
    "Binance Smart Chain",
    "Polygon",
    "Arbitrum",
    "Optimism",
    "Avalanche",
    "Cosmos",
    "Near",
    "Polkadot",
    "Multiple chains",
  ];

  // List of DeFi categories
  const categories = [
    "DEX",
    "Lending",
    "Yield Aggregator",
    "Derivatives",
    "Liquid Staking",
    "Insurance",
    "Asset Management",
    "Payments",
    "Bridge",
    "Privacy",
    "Oracle",
    "NFT",
    "Gaming",
    "DAO",
    "Other",
  ];

  // Popular protocols for quick access
  const popularProtocols = ["Uniswap", "Aave", "MakerDAO", "Curve"];

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Fill with example:
          </h3>
          <button
            type="button"
            onClick={fillRandomExample}
            disabled={isResearching}
            className="flex items-center px-3 py-1.5 rounded text-sm font-medium bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className="h-4 w-4 mr-1" />
            Random Protocol
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {popularProtocols.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => fillWithExample(findProtocol(name))}
              disabled={isResearching}
              className="px-3 py-2 rounded text-sm font-medium border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Protocol Name
          </label>
          <input
            type="text"
            value={protocolName}
            onChange={(e) => setProtocolName(e.target.value)}
            placeholder="e.g. Uniswap, Aave, MakerDAO"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Protocol Website
          </label>
          <input
            type="text"
            value={protocolUrl}
            onChange={(e) => setProtocolUrl(e.target.value)}
            placeholder="e.g. https://uniswap.org"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Blockchain
          </label>
          <select
            value={blockchain}
            onChange={(e) => setBlockchain(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select blockchain...</option>
            {blockchains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Protocol Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Token Contract Address (optional)
        </label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the token contract address for more detailed tokenomics analysis
        </p>
      </div>

      <button
        type="submit"
        disabled={isResearching || !protocolName}
        className={`w-full py-2 px-4 rounded font-medium text-white ${
          isResearching || !protocolName
            ? "bg-gray-400"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        } transition-colors duration-300`}
      >
        {isResearching ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing protocol...
          </span>
        ) : (
          "Analyze Protocol"
        )}
      </button>
    </form>
  );
};

export default ProtocolForm;
