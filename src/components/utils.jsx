export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const data = {
  totals: {
    base_rate: 822464,
    total_cost: 1431505,
    das: 100771,
    edas: 94806,
    delivery_and_returns: 0,
    fuel_surcharge: 298766,
    discount: -357876,
  },
  rateOfIncrease: {
    base_rate: { "2025": 4.2, "2026": 3.8, "2027": 2.9, "2028": 3.5 },
    total_cost: { "2025": 3.9, "2026": 3.1, "2027": 3.7, "2028": 2.8 },
    das: { "2025": 2.7, "2026": 4.5, "2027": 3.3, "2028": 2.1 },
    edas: { "2025": 3.6, "2026": 2.8, "2027": 4.1, "2028": 3.4 },
    delivery_and_returns: {
      "2025": 1.8,
      "2026": 2.2,
      "2027": 1.5,
      "2028": 2.6,
    },
    fuel_surcharge: { "2025": 4.7, "2026": 3.9, "2027": 2.6, "2028": 4.3 },
    discount: { "2025": 3.2, "2026": 3.7, "2027": 2.5, "2028": 3.9 },
  },
  futureTotals: {
    base_rate: {
      "2025": 857007,
      "2026": 889573,
      "2027": 915571,
      "2028": 947616,
    },
    total_cost: {
      "2025": 1487334,
      "2026": 1533441,
      "2027": 1590178,
      "2028": 1634703,
    },
    das: {
      "2025": 103492,
      "2026": 108149,
      "2027": 111718,
      "2028": 114065,
    },
    edas: {
      "2025": 98219,
      "2026": 100969,
      "2027": 105109,
      "2028": 108683,
    },
    delivery_and_returns: { "2025": 0, "2026": 0, "2027": 0, "2028": 0 },
    fuel_surcharge: {
      "2025": 312808,
      "2026": 325207,
      "2027": 333662,
      "2028": 348010,
    },
    discount: {
      "2025": -369328,
      "2026": -382993,
      "2027": -392568,
      "2028": -407878,
    },
  },
};

export const COLORS = [
  "#60A5FA", // Bright Blue
  "#34D399", // Bright Green (for discount)
  "#FBBF24", // Bright Yellow (for total cost)
  "#F87171", // Bright Red (for base rate and other costs)
  "#A78BFA", // Bright Purple
  "#F472B6", // Bright Pink
  "#38BDF8", // Sky Blue
];
