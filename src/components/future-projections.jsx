import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, COLORS } from "./utils";

export const FutureProjections = ({ data }) => {
  const futureTotalsData = Object.keys(data.futureTotals.base_rate).map(
    (year) => ({
      year,
      "Base Rate": data.futureTotals.base_rate[year],
      DAS: data.futureTotals.das[year],
      EDAS: data.futureTotals.edas[year],
      "Fuel Surcharge": data.futureTotals.fuel_surcharge[year],
      Discount: Math.abs(data.futureTotals.discount[year]),
    })
  );

  return (
    <>
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Future Totals Projection</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={futureTotalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />

              <XAxis dataKey="year" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "white",
                }}
              />

              <Legend />
              <Area
                type="monotone"
                dataKey="Base Rate"
                stackId="1"
                stroke={COLORS[3]}
                fill={COLORS[3]}
              />

              <Area
                type="monotone"
                dataKey="DAS"
                stackId="1"
                stroke={COLORS[4]}
                fill={COLORS[4]}
              />

              <Area
                type="monotone"
                dataKey="EDAS"
                stackId="1"
                stroke={COLORS[5]}
                fill={COLORS[5]}
              />

              <Area
                type="monotone"
                dataKey="Fuel Surcharge"
                stackId="1"
                stroke={COLORS[6]}
                fill={COLORS[6]}
              />

              <Area
                type="monotone"
                dataKey="Discount"
                stackId="1"
                stroke={COLORS[1]}
                fill={COLORS[1]}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(data.futureTotals)
          .filter(
            ([key]) =>
              key !== "discount" &&
              key !== "total_cost" &&
              key !== "delivery_and_returns"
          )
          .map(([key, values]) => (
            <Card key={key} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {key.replace(/_/g, " ").toUpperCase()}
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-500 text-white">
                  2028 Projection
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(values["2028"])}
                </div>
                <p className="text-xs text-muted-foreground">
                  {values["2028"] > data.totals[key] ? (
                    <span className="text-red-400 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      Increase from current
                    </span>
                  ) : (
                    <span className="text-green-400 flex items-center">
                      <TrendingDown className="mr-1 h-4 w-4" />
                      Decrease from current
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};
